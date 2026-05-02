const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
const QRCode = require("qrcode")

dotenv.config()

// =========================
// 🚀 TRANSPORTER
// =========================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// =========================
// 🎨 COMMON WRAPPER (UI)
// =========================
const baseTemplate = (content) => `
<div style="margin:0;padding:0;background:#0f0f1a;font-family:Segoe UI,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        
        <table width="500" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.6);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#ec4899);padding:20px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:22px;">🎟 LiveEvent</h1>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:30px;text-align:center;color:#e5e7eb;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:15px;text-align:center;background:#020617;color:#6b7280;font-size:12px;">
              © ${new Date().getFullYear()} LiveEvent. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</div>
`

// =========================
// 🔐 OTP EMAIL
// =========================
exports.sendOtpMail = async (receiverEmail, otp, purpose) => {
  try {
    const html = baseTemplate(`
      <h2 style="color:#fff;">🔐 Verify it's you</h2>

      <p style="font-size:14px;color:#9ca3af;">
        Complete your <b>${purpose.replace("_"," ")}</b>
      </p>

      <div style="margin:30px 0;">
        <span style="
          font-size:30px;
          letter-spacing:10px;
          font-weight:bold;
          color:#fff;
          background:linear-gradient(135deg,#7c3aed,#ec4899);
          padding:15px 30px;
          border-radius:10px;
          display:inline-block;
          box-shadow:0 0 20px rgba(236,72,153,0.4);
        ">
          ${otp}
        </span>
      </div>

      <p style="font-size:13px;color:#9ca3af;">
        ⏳ Valid for 5 minutes
      </p>

      <p style="font-size:12px;color:#6b7280;">
        Do not share this code
      </p>
    `)

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      subject: `OTP for ${purpose}`,
      html
    })

    console.log("✅ OTP Email Sent")

  } catch (error) {
    console.error("❌ OTP Mail error:", error.message)
    throw error
  }
}

// =========================
// 🎟 BOOKING CONFIRMATION EMAIL
// =========================
exports.sendBookingMail = async (email, event, userName) => {
  try {
    // 🔥 Generate QR Code
    const qrData = await QRCode.toDataURL(
      `Event: ${event.title} | ID: ${event._id}`
    )

    const html = baseTemplate(`
      <h2 style="color:#22c55e;">🎉 Booking Confirmed</h2>

      <p>Hello <b>${userName}</b>,</p>

      <p>You successfully booked:</p>

      <h3 style="margin:10px 0;">${event.title}</h3>

      <p>📍 ${event.location}</p>
      <p>📅 ${new Date(event.date).toDateString()}</p>

      <div style="margin:20px 0;">
        <img src="${qrData}" width="150" />
      </div>

      <p style="font-size:12px;color:#9ca3af;">
        Show this QR at entry
      </p>
    `)

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `🎟 Booking Confirmed - ${event.title}`,
      html
    })

    console.log("✅ Booking Email Sent")

  } catch (error) {
    console.error("❌ Booking Mail error:", error.message)
  }
}

// =========================
// ❌ CANCEL EMAIL
// =========================
exports.sendCancelMail = async (email, event, userName) => {
  try {
    const html = baseTemplate(`
      <h2 style="color:#ef4444;">❌ Booking Cancelled</h2>

      <p>Hello <b>${userName}</b>,</p>

      <p>Your booking for <b>${event.title}</b> has been cancelled.</p>

      <p style="font-size:12px;color:#9ca3af;">
        If this was not you, contact support
      </p>
    `)

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Booking Cancelled`,
      html
    })

    console.log("✅ Cancel Email Sent")

  } catch (error) {
    console.error("❌ Cancel Mail error:", error.message)
  }
}