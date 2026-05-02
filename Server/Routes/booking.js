const express = require('express');

const Router = express.Router();
const { bookEvent, submitPayment, sendBookingOtp, myBookings, confirmBooking, cancelBooking} = require('../Controllers/bookingController');
const { protect, admin } = require('../Middleware/auth');

Router.post('/sendotp', protect, sendBookingOtp)
Router.post('/:id', protect, bookEvent);
Router.put('/:id/submit-payment', protect, submitPayment) // ✅ NEW


Router.get('/my', protect, myBookings);

Router.delete('/:id/cancel', protect, cancelBooking);

Router.put('/:id/confirm', protect, admin, confirmBooking);


module.exports = Router;