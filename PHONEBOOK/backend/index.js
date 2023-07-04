const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { GraphQLError } = require("graphql");
mongoose.set("strictQuery", false);
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("connected to DB"))
  .catch((e) => {
    console.log(`error connecting to DB ${e}`);
  });

const typeDefs = `
    type User {
        username: String!
        id: ID!
    }
    type Token{
        value: String
    }

    type Query{
        me: User
    }

    type Mutation {
        register (username: String!): User
        login (username: String!, password: String!): Token
    }
`;

const resolvers = {
  Query: {
    me: async (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    register: async (root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
        console.log("user created");
      } catch (error) {
        throw new GraphQLError("User not created", {
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
        throw new GraphQLError("Invalid credentials", {
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
