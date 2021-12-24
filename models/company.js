const mongoose = require("mongoose")
const Schema = mongoose.Schema

const companySchema = new Schema({
    name: String,
    description: String,
    headquarter: String,
    market: String
})

module.exports = mongoose.model("Company", companySchema)