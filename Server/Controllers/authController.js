const userModel = require('../Models/user')
const otpModel = require('../Models/otp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Add sendPasswordResetMail here!
const { sendOtpMail, sendPasswordResetMail } = require('../Utils/mail')
const generateToken = (user_id, accountType) => {
  return jwt.sign({ user_id, accountType }, process.env.PRIVATE_KEY, {
    expiresIn: '7d'
  })
}
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    const isUserExist = await userModel.findOne({ email })
    if (isUserExist) {
      return res.json({ message: 'User Already have an account with us kindly login.' })
    }

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      phone
    })
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    await otpModel.deleteMany({ email, action: 'Account_verification' })
    await otpModel.create({
      email,
      otp,
      action: 'Account_verification'
    })
    await sendOtpMail(email, otp, 'Liveventkt Account verification')

    res.json({ message: 'Registeration successfull Kindly verify your account using OTP'})
  } catch (error) {
    res.json({ error: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials !' })
    }

    const ifCorrectPass = await bcrypt.compare(password, user.password)

    if (!ifCorrectPass) {
      return res.status(400).json({ message: 'Invalid credentials !' })
    }

    if (user.isVerified === false && user.accountType === 'user') {
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      await otpModel.deleteMany({ email, action: 'Account_verification' })
      await otpModel.create({
        email,
        otp,
        action: 'Account_verification'
      })
      await sendOtpMail(email, otp, 'Liveventkt Account verification')
      return res.json({
        message:
          'Account is not OTP verified, Kindly verify using OTP sent on your email.' +
          email
      })
    }
const userResponse = {
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  accountType: user.accountType,
  isVerified: user.isVerified
}
    return res.json({
      user: userResponse,
      token: generateToken(user._id, user.accountType)
    })
  } catch (error) {
    res.json({ error: error.message })
  }
}

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body
    const otpmatch = await otpModel.findOne({
      email,
      otp,
      action: 'Account_verification'
    })
    await otpModel.deleteMany({ email, action: 'Account_verification' })
    if (!otpmatch) {
      return res.json({ message: 'OTP does not match...' })
    }

    const user = await userModel.findOneAndUpdate(
      { email },
      { isVerified: true },
      {new: true}
    )

    const userResponse = {
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  accountType: user.accountType,
  isVerified: user.isVerified
}
    return res.json({
      user: userResponse,
      token: generateToken(user._id, user.accountType)
    })
  } catch (error) {
    res.json({ error: error.message })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = `${req.body.firstName} ${req.body.lastName}`;
    user.phone = req.body.phone || user.phone;

    await user.save();

    res.json({
      message: "Profile updated",
      user,
    });

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

exports.sendChangeEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await otpModel.deleteMany({ email, action: "change_email" });

    await otpModel.create({
      email,
      otp,
      action: "change_email",
    });

    await sendOtpMail(email, otp, "Change Email");

    res.json({ message: "OTP sent" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpMatch = await otpModel.findOne({
      email,
      otp,
      action: "change_email",
    });

    if (!otpMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await otpModel.deleteMany({ email, action: "change_email" });

    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { email },
      { new: true }
    );

    res.json({
      message: "Email updated",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ======================================
// 1. REQUEST PASSWORD RESET (SEND OTP)
// ======================================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 🔒 Security Check: Does user exist?
    const user = await userModel.findOne({ email });
    if (!user) {
      // Throw exact error requested
      return res.status(404).json({ message: 'User is not registered with us' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Clear any old reset OTPs for this email, then create a new one
    await otpModel.deleteMany({ email, action: 'reset_password' });
    await otpModel.create({
      email,
      otp,
      action: 'reset_password'
    });

    // Send the email
    await sendPasswordResetMail(email, otp, user.name);

    res.json({ message: 'Password reset OTP sent to your email.' });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================================
// 2. VERIFY OTP AND SAVE NEW PASSWORD
// ======================================
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // 1. Check if the OTP matches and is for the 'reset_password' action
    const otpMatch = await otpModel.findOne({
      email,
      otp,
      action: 'reset_password'
    });

    if (!otpMatch) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // 2. Hash the new password (matching your registration salt rounds)
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    // 3. Update the user's password in the database
    await userModel.findOneAndUpdate(
      { email },
      { password: hashPassword }
    );

    // 4. Delete the OTP so it cannot be used again
    await otpModel.deleteMany({ email, action: 'reset_password' });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: error.message });
  }
};