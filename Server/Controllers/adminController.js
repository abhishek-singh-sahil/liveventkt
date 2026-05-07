const User = require('../Models/user'); 
const Event = require('../Models/event');
const Booking = require('../Models/booking'); 

const getDashboardStats = async (req, res) => {
  try {
    // 1. Fetch Basic Counts
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();

    // 2. Fetch Recent Bookings
    // 🔥 FIXED: Changed 'user' to 'userId' to match your schema
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email'); 

    // 3. Calculate Revenue & Tickets Sold
    const bookingStats = await Booking.aggregate([
      // 🔥 FIXED: Changed 'status' to 'Bookingstatus'
      { $match: { Bookingstatus: { $regex: /confirmed/i } } }, 
      {
        $group: {
          _id: null,
          // 🔥 FIXED: Changed "$totalAmount" to "$amount"
          totalRevenue: { $sum: "$amount" }, 
          // 🔥 FIXED: Changed "$numberOfTickets" to "$ticketCount"
          totalTickets: { $sum: "$ticketCount" } 
        }
      }
    ]);

    const revenueData = bookingStats.length > 0 ? bookingStats[0] : { totalRevenue: 0, totalTickets: 0 };

    return res.status(200).json({
      totalUsers,
      totalEvents,
      recentBookings,
      totalRevenue: revenueData.totalRevenue,
      totalTickets: revenueData.totalTickets
    });

  } catch (error) {
    console.error("🔥 ADMIN DASHBOARD ERROR:", error); 
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboardStats
};