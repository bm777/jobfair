const mongoose = require("mongoose")
const express = require("express")
const schema = require("./schema/schema")
const graphqlHTTP = require("express-graphql")

// models here
const Skill = require("./models/skill")
const Job = require("./models/job")
const Contract = require("./models/contract")
const Company = require("./models/company")



// connect tp mblab db
mongoose.connect("mongodb+srv://bm777:Passw0rd777@gql-db.8svk1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
mongoose.connection.once("open", () => {
    console.log("connected to db")
})

const app = express()

app.use("/graphql", graphqlHTTP.graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3000, function(){
    console.log("Server running...")
})