const mongoose = require("mongoose")
const Schema = mongoose.Schema

const contractSchema = new Schema({
    name: String,
    // jobId: Number
})

module.exports = mongoose.model("Contract", contractSchema)