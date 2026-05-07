import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogIn, Loader2, AlertCircle, Mail, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const {
    login,
    setOpenAuth,
    setAuthView,
    setAuthEmail
  } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(form.email, form.password);

      // ✅ SUCCESS LOGIN
      if (data.token) {
        setOpenAuth(false);
        return;
      }

      // ❗ NOT VERIFIED → OTP FLOW
      if (data.message?.toLowerCase().includes("otp")) {
        setAuthEmail(form.email);
        setAuthView("otp");
        return;
      }

      setError(data.message || "Invalid credentials. Please try again.");

    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      
      {/* HEADER */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-100">
          <LogIn size={24} className="text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Login to manage your bookings and events.
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

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* EMAIL INPUT */}
        <div className="relative">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1 block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900 font-medium"
              required
            />
          </div>
        </div>

        {/* PASSWORD INPUT */}
        <div className="relative">
          <div className="flex justify-between items-center mb-1.5 ml-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
              Password
            </label>
            <button 
              type="button"
              onClick={() => setAuthView("forgot-password")}
              className="text-[11px] text-purple-600 font-bold uppercase tracking-wider hover:text-purple-700 transition"
            >
              Forgot?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900 font-medium"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Logging in...
            </>
          ) : (
            "Login to Account"
          )}
        </button>
      </form>

      {/* DIVIDER */}
      <div className="my-8 flex items-center gap-3">
        <div className="flex-1 h-[1px] bg-gray-100"></div>
        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">New here?</span>
        <div className="flex-1 h-[1px] bg-gray-100"></div>
      </div>

      <p className="text-sm text-center text-gray-500 font-medium">
        Don’t have an account?{" "}
        <button
          onClick={() => setAuthView("register")}
          className="text-purple-600 font-bold hover:text-purple-700 hover:underline transition-colors"
        >
          Create one now
        </button>
      </p>
    </div>
  );
};

export default Login;