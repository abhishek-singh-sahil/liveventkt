const mongoose = require('mongoose')

const attendeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
})

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event',
      required: true
    },

    // 🔥 Contact person (OTP + communication)
    contact: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String
    },

    // 🔥 All ticket holders
    attendees: [attendeeSchema],

    ticketCount: {
      type: Number,
      default: 1
    },

    amount: {
      type: Number,
      required: true
    },

    // 🔥 Payment
    utr: {
      type: String,
      default: null
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'submitted', 'paid', 'rejected'],
      default: 'pending'
    },

    Bookingstatus: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true } // ✅ FIXED (important)
)

module.exports = mongoose.model('booking', bookingSchema)
