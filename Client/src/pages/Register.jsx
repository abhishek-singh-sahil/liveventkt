import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Info, User, Mail, Phone, Lock, Loader2, AlertCircle, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const {
    register,
    setAuthView,
    setAuthEmail
  } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [strength, setStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Password strength logic
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
    if (strength === 0) return "transparent";
    const hue = (strength / 5) * 120;
    return `hsl(${hue}, 90%, 45%)`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (error) setError("");

    if (name === "password") {
      setStrength(getPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (strength < 4) {
      setError("Please use a stronger password to protect your account.");
      return;
    }

    setLoading(true);

    try {
      const data = await register(
        form.name,
        form.email,
        form.password,
        form.phone
      );

      // ✅ OTP FLOW
      if (data?.message?.toLowerCase().includes("verify") || data?.message?.toLowerCase().includes("otp")) {
        setAuthEmail(form.email);
        setAuthView("otp");
      } else {
        setError(data?.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err?.message || "Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      
      {/* HEADER */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-100">
          <UserPlus size={24} className="text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Join us and start booking unforgettable experiences.
        </p>
      </div>

      {/* 🔥 INLINE ERROR BANNER */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* FULL NAME */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900 font-medium"
            required
          />
        </div>

        {/* EMAIL */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900 font-medium"
            required
          />
        </div>

        {/* PHONE */}
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900 font-medium"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-11 pr-11 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900 font-medium"
              required
            />
            
            <div className="absolute right-3 top-1/2 -translate-y-1/2 group cursor-help">
              <Info size={18} className="text-gray-400 hover:text-purple-500 transition-colors" />
              <div className="absolute right-0 bottom-full mb-2 w-56 p-3 bg-gray-900 text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-xl">
                <p className="font-bold mb-1">Must Include:</p>
                <ul className="space-y-1 text-gray-300">
                  <li className={form.password.length >= 8 ? "text-emerald-400" : ""}>• 8+ characters</li>
                  <li className={/[A-Z]/.test(form.password) && /[a-z]/.test(form.password) ? "text-emerald-400" : ""}>• Upper & lower case</li>
                  <li className={/[0-9]/.test(form.password) ? "text-emerald-400" : ""}>• At least one number</li>
                  <li className={/[!@#$%^&*]/.test(form.password) ? "text-emerald-400" : ""}>• Special character</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strength Bar */}
          <div className="mt-2.5 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(strength / 5) * 100}%`,
                backgroundColor: getStrengthColor(),
              }}
              style={{ boxShadow: strength > 0 ? `0 0 8px ${getStrengthColor()}` : "none" }}
              transition={{ duration: 0.4 }}
            />
          </div>
          {form.password && (
            <p className="text-[10px] font-bold uppercase tracking-wider mt-1.5 transition-colors" style={{ color: getStrengthColor() }}>
              Strength: {strength <= 2 ? "Weak" : strength === 3 ? "Medium" : "Strong"}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-70 mt-2"
        >
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Creating Account...</>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="my-8 flex items-center gap-3">
        <div className="flex-1 h-[1px] bg-gray-100"></div>
        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Already a member?</span>
        <div className="flex-1 h-[1px] bg-gray-100"></div>
      </div>

      <p className="text-sm text-center text-gray-500 font-medium">
        Back to{" "}
        <button
          onClick={() => setAuthView("login")}
          className="text-purple-600 font-bold hover:text-purple-700 hover:underline transition-colors"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;