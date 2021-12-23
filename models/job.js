const mongoose = require("mongoose")
const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: String,
    description: String,
    location: String,
    skillId, Number,
    contractId, Number
})

module.exports = mongoose.model("Job", jobSchema)