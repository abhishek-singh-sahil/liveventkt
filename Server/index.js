const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoute = require('./Routes/auth');
const bookingRoute = require('./Routes/booking');
const eventRoute = require('./Routes/event');
const connectDB = require('./Config/db');

dotenv.config();

const app = express();

// 🔥 CONNECT DB
connectDB();

// 🔥 CORS FIX (VERY IMPORTANT)
const allowedOrigins = [
  "http://localhost:5173",
  "https://liveventkt-esrt.vercel.app" // ❗ NO trailing slash
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// 🔥 EXTRA HEADERS SAFETY (OPTIONAL BUT SAFE)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://liveventkt-esrt.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// 🔥 BODY PARSER
app.use(express.json());

// 🔥 ROUTES
app.use('/api/auth', authRoute);
app.use('/api/events', eventRoute);
app.use('/api/booking', bookingRoute);

// 🔥 TEST ROUTE (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 SERVER START
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});