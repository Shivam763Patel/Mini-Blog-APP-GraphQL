const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")
const typeDefs = require ("./graphql/typeDefs")
const resolvers = require('./graphql/resolvers')


const server = new ApolloServer({

    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

//DB configration
const db = require("./config/key").MongoURI;

mongoose.set('strictQuery', true);
mongoose.connect(db).then(() => {
    console.log("Database connection is successfull") 

}).catch(() => {
    console.log(" Someting went wrong !")
})


server.listen( { port: 5000 })
    .then(res => {

        console.log(`Server running at ${res.url}`);
    });
