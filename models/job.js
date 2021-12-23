const mongoose = require("mongoose")
const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: String,
    description: String,
    location: String,
    contractId: String,
    skillId: String
})

module.exports = mongoose.model("Job", jobSchema)