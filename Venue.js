const mongoose = require('mongoose')

const VenueSchema = new mongoose.Schema({
    event: String,
    name: String,
    where: String,
    start_time: Date,
    end_time: Date
})

const VenueModel = mongoose.model ("venue", VenueSchema)

module.exports = VenueModel;