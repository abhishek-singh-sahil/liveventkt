# LiveEventkt

LiveEventkt is a full stack event booking web application where users can explore events, book tickets, and manage their bookings easily.

---

## Live Links

* Frontend: https://liveventkt-esrt.vercel.app/
* Repository: https://github.com/abhishek-singh-sahil/liveventkt/

---

## Features

* User registration and login with OTP verification
* Browse different events
* Book tickets for events
* Add multiple attendees while booking
* Payment flow with UPI QR and UTR input
* Booking status (pending, confirmed, cancelled)
* Admin can verify payments manually
* User profile with edit options
* Email update with OTP verification
* My Bookings page with proper UI

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Nodemailer (for OTP emails)

---

## Folder Structure

```
Liveventkt/
│
├── Client/        # Frontend (React)
│
├── Server/        # Backend (Node + Express)
│
└── README.md
```

---

## Installation (Run Locally)

### 1. Clone the project

```
git clone https://github.com/abhishek-singh-sahil/liveventkt.git
cd liveventkt
```

---

### 2. Setup Backend

```
cd Server
npm install
```

Create `.env` file inside **Server** folder:

```
PORT=3000
PRIVATE_KEY=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
MONGO_URI=your_mongodb_connection
```

Run backend:

```
npm run dev
```

---

### 3. Setup Frontend

```
cd Client
npm install
npm run dev
```

---

## Deployment

* Frontend deployed on Vercel
* Backend deployed on Render

---

## Important Notes

* Use Gmail App Password for email service
* Backend may take some time to start (Render free tier)
* CORS is enabled for frontend and localhost

---

## Future Improvements

* Online payment gateway integration
* Real-time booking confirmation
* Better admin dashboard
* Notification system

---

## Author

Abhishek Singh Sahil

---

This project is made for learning and building real-world full stack experience.
