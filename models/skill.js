const mongoose = require("mongoose")
const Schema = mongoose.Schema

const skillSchema = new Schema({
    name: String,
    // jobId: Number
})

module.exports = mongoose.model("Skill", skillSchema)