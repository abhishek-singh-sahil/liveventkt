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
});

exports.transporter = transporter; // 👈 ADD THIS LINE

// =========================
// 🎨 PROFESSIONAL TEMPLATE
// =========================
const baseTemplate = (content) => `
<div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">

        <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
          
          <!-- HEADER -->
          <tr>
            <td style="padding:20px 30px;border-bottom:1px solid #e5e7eb;">
              <h2 style="margin:0;color:#111;font-size:18px;">
                Live<span style="color:#7c3aed;">Eventkt</span>
              </h2>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:30px;color:#374151;font-size:14px;line-height:1.6;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 30px;background:#f9fafb;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#6b7280;">
                Regards,<br/>
                <strong>LiveEventkt Team</strong>
              </p>

              <p style="margin-top:10px;font-size:11px;color:#9ca3af;">
                This is an automated email. Please do not reply directly.<br/>
                © ${new Date().getFullYear()} LiveEventkt. All rights reserved.
              </p>
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
  const html = baseTemplate(`
    <p>Hello,</p>

    <p>Please use the verification code below to complete your <b>${purpose.replace("_"," ")}</b> process.</p>

    <div style="text-align:center;margin:30px 0;">
      <span style="
        font-size:26px;
        letter-spacing:6px;
        font-weight:bold;
        color:#111;
        padding:12px 20px;
        border:1px solid #e5e7eb;
        border-radius:6px;
        display:inline-block;
      ">
        ${otp}
      </span>
    </div>

    <p style="font-size:13px;color:#6b7280;">
      This code is valid for 5 minutes.
    </p>

    <p style="font-size:12px;color:#9ca3af;">
      If you did not request this, please ignore this email.
    </p>
  `)

  await transporter.sendMail({
    from: `"LiveEventkt" <${process.env.EMAIL_USER}>`,
    to: receiverEmail,
    subject: `Verification Code`,
    html
  })
}

// =========================
// 🎟 BOOKING CONFIRMATION
// =========================
exports.sendBookingMail = async (email, event, userName) => {
  const qrData = await QRCode.toDataURL(
    `Event: ${event.title} | ID: ${event._id}`
  )

  const html = baseTemplate(`
    <p>Hello <b>${userName}</b>,</p>

    <p>Your booking has been successfully confirmed.</p>

    <div style="margin:20px 0;">
      <strong>${event.title}</strong><br/>
      📍 ${event.location}<br/>
      📅 ${new Date(event.date).toDateString()}
    </div>

    <div style="text-align:center;margin:20px 0;">
      <img src="${qrData}" width="140" style="border:1px solid #e5e7eb;padding:10px;border-radius:6px;" />
    </div>

    <p style="font-size:13px;color:#6b7280;">
      Please present this QR code at the venue.
    </p>
  `)

  await transporter.sendMail({
    from: `"LiveEventkt" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Booking Confirmation - ${event.title}`,
    html
  })
}

// =========================
// ❌ CANCEL EMAIL
// =========================
exports.sendCancelMail = async (email, event, userName) => {
  const html = baseTemplate(`
    <p>Hello <b>${userName}</b>,</p>

    <p>Your booking for <b>${event.title}</b> has been successfully cancelled.</p>

    <p style="font-size:13px;color:#6b7280;">
      If this was not initiated by you, please contact support immediately.
    </p>
  `)

  await transporter.sendMail({
    from: `"LiveEventkt" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Booking Cancelled`,
    html
  })
}

// =========================
// 📩 CONTACT FORM AUTO-REPLY (NEW FEATURE)
// =========================
exports.sendContactAutoReply = async (email, name) => {
  const html = baseTemplate(`
    <p>Hello ${name || "there"},</p>

    <p>Thank you for reaching out to LiveEventkt.</p>

    <p>We have received your message and our team will get back to you shortly.</p>

    <p style="font-size:13px;color:#6b7280;">
      We appreciate your patience.
    </p>
  `)

  await transporter.sendMail({
    from: `"LiveEventkt" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `We’ve received your message`,
    html
  })
}

// ... (keep all your existing transporter and template code) ...

// =========================
// 📩 ALERT ADMIN OF NEW CONTACT
// =========================
exports.sendAdminNotification = async (firstName, lastName, email, phone, website, message) => {
  const html = baseTemplate(`
    <p>You have received a new message from the contact form.</p>
    
    <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; margin-top: 15px;">
      <p style="margin: 5px 0;"><b>Name:</b> ${firstName || ""} ${lastName || ""}</p>
      <p style="margin: 5px 0;"><b>Email:</b> <a href="mailto:${email}" style="color: #7c3aed;">${email}</a></p>
      <p style="margin: 5px 0;"><b>Phone:</b> ${phone || "N/A"}</p>
      <p style="margin: 5px 0;"><b>Website:</b> ${website || "N/A"}</p>
    </div>

    <h3 style="margin-top: 20px; color: #111; font-size: 16px;">Message:</h3>
    <div style="background-color: #f9fafb; border-left: 4px solid #7c3aed; padding: 15px; border-radius: 4px; color: #374151; white-space: pre-wrap;">
      ${message}
    </div>
  `);

  await transporter.sendMail({
    from: `"LiveEventkt System" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Sends the email to yourself
    subject: `New Contact Form Submission from ${firstName || "a user"}`,
    html
  });
};

// =========================
// 🔑 PASSWORD RESET OTP
// =========================
exports.sendPasswordResetMail = async (email, otp, name) => {
  const html = baseTemplate(`
    <p>Hello ${name || ""},</p>

    <p>We received a request to reset your password. Please use the verification code below to securely set a new password.</p>

    <div style="text-align:center;margin:30px 0;">
      <span style="
        font-size:26px;
        letter-spacing:6px;
        font-weight:bold;
        color:#111;
        padding:12px 20px;
        border:1px solid #e5e7eb;
        border-radius:6px;
        display:inline-block;
      ">
        ${otp}
      </span>
    </div>

    <p style="font-size:13px;color:#6b7280;">
      This code will expire in 10 minutes.
    </p>

    <p style="font-size:12px;color:#9ca3af;">
      If you did not request a password reset, please ignore this email or contact support if you have concerns.
    </p>
  `);

  await transporter.sendMail({
    from: `"LiveEventkt Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Password Reset Verification Code`,
    html
  });
};