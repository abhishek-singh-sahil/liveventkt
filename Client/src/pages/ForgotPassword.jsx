import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Info } from "lucide-react"; // 🔥 Imported Info icon

const ForgotPassword = () => {
  const { forgotPassword, resetPassword, setAuthView } = useContext(AuthContext);

  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // 🔥 Password strength state
  const [strength, setStrength] = useState(0);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ==============================
  // 🔥 PASSWORD STRENGTH LOGIC
  // ==============================
  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*]/.test(password)) score += 1;
    return score;
  };

  const getStrengthColor = () => {
    const hue = (strength / 5) * 120;
    return `hsl(${hue}, 90%, 45%)`;
  };

  // STEP 1: Handle Email Submission
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccess("OTP sent to your email!");
      setStep(2); // Move to OTP verification step
    } catch (err) {
      setError(err.message || "User is not registered with us.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Handle Password Reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    // 🔥 PREVENT SUBMISSION IF PASSWORD IS WEAK
    if (strength < 4) {
      setError("Password is too weak");
      return;
    }

    setSuccess("");
    setLoading(true);

    try {
      await resetPassword(email, otp, newPassword);
      setSuccess("Password reset successfully! Redirecting...");
      
      // Auto-redirect back to login after 2 seconds
      setTimeout(() => {
        setAuthView("login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-black text-center mb-2">
        Reset Password
      </h2>
      
      <p className="text-sm text-center text-gray-500 mb-5">
        {step === 1 ? "Enter your email to receive a secure code." : "Enter the code and your new password."}
      </p>

      {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
      {success && <p className="text-green-500 text-sm text-center mb-3">{success}</p>}

      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full py-2.5 rounded-lg text-white font-medium bg-gray-900 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          {/* 🔥 UPDATED PASSWORD INPUT WITH STRENGTH METER */}
          <div className="relative">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setStrength(getPasswordStrength(e.target.value)); // Update strength on type
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <div className="absolute right-3 top-3 group cursor-pointer">
              <Info size={18} className="text-gray-400" />

              <div className="absolute right-0 mt-2 w-56 p-3 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
                Password must include:
                <ul className="mt-1 space-y-1">
                  <li>• At least 8 characters</li>
                  <li>• Uppercase & lowercase</li>
                  <li>• A number</li>
                  <li>• A special character</li>
                </ul>
              </div>
            </div>

            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${(strength / 5) * 100}%`,
                  background: getStrengthColor(),
                  boxShadow: `0 0 10px ${getStrengthColor()}`,
                }}
              />
            </div>

            {newPassword && (
              <p className="text-xs mt-1 text-gray-500">
                Strength:{" "}
                <span style={{ color: getStrengthColor() }}>
                  {strength <= 2
                    ? "Weak"
                    : strength === 3
                    ? "Medium"
                    : "Strong"}
                </span>
              </p>
            )}
          </div>
          {/* 🔥 END PASSWORD BLOCK */}

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full py-2.5 rounded-lg text-white font-medium bg-gray-900 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      <div className="my-4 flex items-center gap-2">
        <div className="flex-1 h-[1px] bg-gray-200"></div>
      </div>

      <p className="text-sm text-center text-gray-600">
        Remember your password?{" "}
        <span
          onClick={() => setAuthView("login")}
          className="text-purple-600 font-medium cursor-pointer hover:underline"
        >
          Back to Login
        </span>
      </p>
    </div>
  );
};

export default ForgotPassword;