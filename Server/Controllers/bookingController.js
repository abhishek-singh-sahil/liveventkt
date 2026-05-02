const bookingModel = require('../Models/booking');
const { sendOtpMail, sendBookingMail, sendCancelMail } = require('../Utils/mail');
const eventModel = require('../Models/event');
const otpModel = require('../Models/otp');

// =========================
// 🔐 GENERATE OTP
// =========================
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// =========================
// 🔐 BOOK EVENT (WITH OTP)
// =========================
const bookEvent = async (req, res) => {
  try {
    const { eventId, otp, contact, attendees } = req.body;
    const userId = req.user._id;

    // 🔒 VALIDATION
    if (!eventId || !otp || !contact?.email || !attendees?.length) {
      return res.status(400).json({ message: 'Invalid booking data' });
    }

    const email = contact.email;

    // 🔴 VERIFY OTP
    const verifyotp = await otpModel.findOne({
      email,
      otp,
      action: 'Event_booking'
    });

    if (!verifyotp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // ⏳ EXPIRY CHECK (5 min)
    const now = Date.now();
    const createdTime = new Date(verifyotp.createdAt).getTime();

    if (now - createdTime > 5 * 60 * 1000) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // 🔍 FIND EVENT
    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableSeats < attendees.length) {
      return res.status(400).json({ message: 'Not enough seats' });
    }

    const amount = event.price * attendees.length;

    // 🎟 CREATE BOOKING
    const booking = await bookingModel.create({
      userId,
      eventId,
      contact,
      attendees,
      ticketCount: attendees.length,
      amount,
      Bookingstatus: 'pending',
      paymentStatus: 'pending'
    });

    // 🔥 REDUCE SEATS
    await eventModel.findByIdAndUpdate(eventId, {
      $inc: { availableSeats: -attendees.length }
    });

    // 🧹 DELETE OTP
    await otpModel.deleteMany({ email, action: 'Event_booking' });

    return res.status(200).json({
      message: 'OTP verified. Proceed to payment.',
      booking
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Booking failed',
      error: error.message
    });
  }
};

// =========================
// 📩 SEND OTP FOR BOOKING
// =========================
const sendBookingOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOtp();

    await otpModel.deleteMany({ email, action: 'Event_booking' });

    await otpModel.create({
      email,
      otp,
      action: 'Event_booking'
    });

    await sendOtpMail(email, otp, "Event Booking OTP");

    return res.status(200).json({
      message: 'OTP sent successfully'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'OTP sending failed',
      error: error.message
    });
  }
};

// =========================
// 💳 SUBMIT PAYMENT (UTR)
// =========================
const submitPayment = async (req, res) => {
  try {
    const { utr } = req.body;
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 🔒 SECURITY CHECK
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // ❌ PREVENT DOUBLE UTR
    if (booking.utr) {
      return res.status(400).json({ message: "UTR already submitted" });
    }

    // 🔒 VALIDATE UTR
    if (!/^[A-Za-z0-9]{12,16}$/.test(utr)) {
      return res.status(400).json({ message: "Invalid UTR format" });
    }

    booking.utr = utr;
    booking.paymentStatus = "submitted"; // 🔥 IMPORTANT

    await booking.save();

    return res.status(200).json({
      message: "Payment submitted. Awaiting admin verification.",
      booking
    });

  } catch (error) {
    return res.status(500).json({
      message: "Payment submission failed",
      error: error.message
    });
  }
};

// =========================
// 📋 MY BOOKINGS
// =========================
const myBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const mybooking = await bookingModel
      .find({ userId })
      .populate('eventId');

    return res.status(200).json({bookings: mybooking });

  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// =========================
// ❌ CANCEL BOOKING
// =========================
const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingModel
      .findById(req.params.id)
      .populate('eventId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (booking.Bookingstatus === 'cancelled') {
      return res.status(400).json({ message: 'Already cancelled' });
    }

    const wasConfirmed = booking.Bookingstatus === 'confirmed';

    booking.Bookingstatus = 'cancelled';
    await booking.save();

    // 🔁 RETURN SEATS
    if (wasConfirmed) {
      await eventModel.findByIdAndUpdate(
        booking.eventId._id,
        { $inc: { availableSeats: booking.ticketCount } }
      );
    }

    await sendCancelMail(
      req.user.email,
      booking.eventId,
      req.user.name
    );

    return res.status(200).json({
      message: 'Booking cancelled successfully',
      booking
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error cancelling booking',
      error: error.message
    });
  }
};

// =========================
// ✅ ADMIN CONFIRM BOOKING
// =========================
const confirmBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.paymentStatus = "paid";
    booking.Bookingstatus = "confirmed";

    await booking.save();

    // 📩 SEND CONFIRMATION MAIL
    const event = await eventModel.findById(booking.eventId);

    await sendBookingMail(
      booking.contact.email,
      event,
      booking.contact.firstName
    );

    return res.status(200).json({
      message: 'Booking confirmed',
      booking
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error confirming booking',
      error: error.message
    });
  }
};

module.exports = {
  bookEvent,
  sendBookingOtp,
  myBookings,
  cancelBooking,
  confirmBooking,
  submitPayment
};