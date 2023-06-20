const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer} = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const User = require('./models/user')
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI).then(()=>{
    console.log('connectedto DB');
}).catch((e)=>{
    console.log('error connecting to DB: ', e.message);
})


const typeDefs = `
    type User{
        username: String!
        id: ID!
    }

    type Token{
        value: String!
    }

    type Query {
        me: User
    }

    type Mutation{
        createUser(username: String!):User
        login(
            username: String! 
            password: String!
            ): Token
    }
`

const resolvers ={
    Query: {
        me: (root,args,{currentUser}) => currentUser
    },
    Mutation: {
        createUser: async(root, args) =>{
            const user = new User({username: args.username})

            try {
                user.save()
            } catch (error) {
                throw new GraphQLError('Registering user failed',{
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invaligArgs: args.name,
                        error
                    }
                })
            }
        },

        login: async (root, args) => {
            const user = await User.findOne({username: args.username})

            if(!user || args.password !== 'secret'){
                throw new GraphQLError('Invalid Credentials',{
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invaligArgs: args.name,
                    }
                })
            }
            const userToken = {
                username: user.username,
                id: user._id
            }
            return {value: jwt.sign(userToken,process.env.JWT_SECRET)}
        
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

startStandaloneServer(server,{
    listen: {port: 4000},
    context: async ({req, res})=>{
        const auth = req ? req.headers.authorization : null
        if(auth && auth.startsWith('Bearer ')){
            const decodeToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodeToken.id)
            return {currentUser}
        }
    }
}).then(({url})=>console.log(`server ready at ${url}`))