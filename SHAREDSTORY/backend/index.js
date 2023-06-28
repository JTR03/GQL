const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Story = require("./models/story");
const User = require("./models/user");
const Topic = require("./models/topics");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
console.log("connecting to DB...");

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((error) => {
    console.log("error connecting to DB", error.message);
  });

const typeDefs = `
    type User{
        username: String!
        stories: [Story!]!
        id: ID!
    }

    type Token{
        value: String!
    }

    type Topic{
        topic: String!
        id: ID!
        stories: [Story!]!
    }

    type Story{
        topic: String!
        plot: String!
        id: ID!
    }

    type Query{
        allStories: [Story!]!
        allTopics: [Topic!]!
        findByTopic(topic: String!):Topic
        storiesByTopic(topic: String!): [Story]
        me: User
    }

    type Mutation {
        createUser(
            username: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token

        addStory(
            plot: String!
            topic: String!
        ): Story

        editStory(
            plot: String!
            id: String!
        ): Story

        removeStory(
            id: String!
        ): Story

        addTopic(
            topic: String!
        ):Topic
    }
`;

const resolvers = {
  Query: {
    allStories: async () => Story.find({}),
    allTopics: async () => Topic.find({}),
    findByTopic: async (root, args) => Topic.findOne({ topic: args.topic }),
    storiesByTopic: async (root,args) => Story.find({topic: args.topic}),
    me: async (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        user.save();
        console.log("succesfully saved user");
      } catch (error) {
        throw new GraphQLError("failed to save user", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("invalid credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userToken, process.env.JWT_SECRET) };
    },
    addStory: async (root, args, { currentUser }) => {
      const mypart = new Story({ ...args });

      if (!currentUser) {
        throw new GraphQLError("please login", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        await mypart.save();
        currentUser.stories = currentUser.stories.concat(mypart);
        await currentUser.save();
        console.log("saved story");
      } catch (error) {
        console.log("backend error");
        throw new GraphQLError("failed to upload your pat of the story", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return mypart;
    },
    editStory: async (root, args, { currentUser }) => {
      const editStory = await Story.findById(args.id);

      if (!currentUser) {
        throw new GraphQLError("Invalid request", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      editStory.plot = args.plot;
      try {
        await editStory.save();
        console.log("story edited");
      } catch (error) {
        console.log("failed to edit");
        throw new GraphQLError(`Could not edit story ${error}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return editStory;
    },
    removeStory: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("Cannot delete story you did not create", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        await Story.findByIdAndRemove(args.id);
        console.log("deleted successfully");
      } catch (error) {
        throw new GraphQLError("Could not delete story", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    addTopic: async (root, args, { currentUser }) => {
      const topic = new Topic({ ...args });
      if (!currentUser) {
        throw new GraphQLError("Please login to add a topic", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        await topic.save();
        console.log("topic saved");
      } catch (error) {
        console.log("topic not saved");
        throw new GraphQLError("Could not save topic", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return topic
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 5005 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id).populate(
        "stories"
      );
      return { currentUser };
    }
  },
}).then(({ url }) => console.log(`server ready at ${url}`));
