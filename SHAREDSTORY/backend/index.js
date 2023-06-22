const {ApolloServer} = require('@apollo/server')
const { startStandaloneServer} = require('@apollo/server/standalone')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Story = require('./models/story')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI
console.log('connecting to DB...');

mongoose.connect(MONGO_URI).then(
    ()=>console.log('Connected to DB')
).catch((error)=>{
    console.log('error connecting to DB', error.message);
})


const typeDefs = `
    type User{
        username: String!
        stories: [Story!]!
        id: ID!
    }

    type Token{
        value: String!
    }

    type Story{
        plot: String!
        character: String!
        id: ID!
    }

    type Query{
        allStories: [Story!]!
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
            character: String!
        ): Story
    }
`

const resolvers = {
    Query: {
        allStories: async () => Story.find({}),
        me: async (root, args,{currentUser})=> currentUser
    },
    Mutation :{
        createUser: async (root, args) => {
            const user = new User({...args})

            try {
                user.save()
                console.log('succesfully saved user');
            } catch (error) {
                throw new GraphQLError('failed to save user',{
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            return user
        },
        login:async(root,args)=>{
            const user = await User.findOne({username: args.username})

            if(!user || args.password !== 'secret'){
                throw new GraphQLError('invalid credentials',{
                    extensions:{
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userToken = {
                username: user.username,
                id: user._id
            }

            return {value: jwt.sign(userToken, process.env.JWT_SECRET)}
        },
        addStory: async (root, args,{currentUser}) => {
            const mypart = new Story({...args}) 

            if(!currentUser){
                throw new GraphQLError('please login',{
                    extensions:{
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            try {
                await mypart.save()
                currentUser.stories = currentUser.stories.concat(mypart)
                await currentUser.save()
                console.log('saved story');
            } catch (error) {
                console.log('backend error');
                throw new GraphQLError('failed to upload your pat of the story',
                    {
                        extensions:{
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error
                        }
                    }
                )
            }
            return mypart
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

startStandaloneServer(server,{
    listen: {port: 5005},
    context: async ({req, res})=>{
        const auth = req ? req.headers.authorization : null
        if(auth && auth.startsWith("Bearer ")){
            const decodedToken = jwt.verify(
                auth.substring(7),process.env.JWT_SECRET
            )
            const currentUser = await User.findById(
                decodedToken.id
            ).populate('stories')
            return {currentUser}
        }

    }
}).then(({url})=>console.log(`server ready at ${url}`))