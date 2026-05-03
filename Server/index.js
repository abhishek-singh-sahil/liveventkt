const express = require('express');
const dotenv = require('dotenv');
const authRoute = require('./Routes/auth')
const bookingRoute = require('./Routes/booking.js')
const connectDB = require('./Config/db')
const eventRoute = require('./Routes/event.js')
dotenv.config();

const app = express();
const cors = require("cors")

app.use(cors({
  origin: ["http://localhost:5173", "https://liveventkt-esrt.vercel.app/"],
  credentials: true
}));

connectDB()
app.use(express.json())

app.use('/api/auth', authRoute);
app.use('/api/events', eventRoute)
app.use('/api/booking', bookingRoute)

const PORT = process.env.PORT || 3001
app.listen(PORT)