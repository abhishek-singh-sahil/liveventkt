const mongoose = require('mongoose')
const user = require('./user')

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    eventImg: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    totalSeats: {
      type: Number,
      required: true
    },
    availableSeats: {
      type: Number,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('event', eventSchema)
