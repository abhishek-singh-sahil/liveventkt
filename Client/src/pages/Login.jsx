import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(form.email, form.password);

      // ✅ SUCCESS LOGIN
      if (data.token) {
        setOpenAuth(false);   // 🔥 CLOSE MODAL
        return;
      }

      // ❗ NOT VERIFIED → OTP FLOW
      if (data.message?.includes("not OTP verified")) {
        setAuthEmail(form.email);   // 🔥 SAVE EMAIL GLOBALLY
        setAuthView("otp");         // 🔥 SWITCH TO OTP VIEW
        return;
      }

      setError(data.message || "Login failed");

    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-black text-center mb-5">
        Login
      </h2>

      <h2 className="text-xl font-semibold text-center mb-5">
        Welcome Back 👋
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center mb-3">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg text-white font-medium
                     bg-gray-900 hover:opacity-90 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-2">
        <div className="flex-1 h-[1px] bg-gray-200"></div>
        <span className="text-xs text-gray-400">OR</span>
        <div className="flex-1 h-[1px] bg-gray-200"></div>
      </div>

      <p className="text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <span
          onClick={() => setAuthView("register")}   // 🔥 FIXED
          className="text-purple-600 font-medium cursor-pointer hover:underline"
        >
          Create one
        </span>
      </p>
    </div>
  );
};

export default Login;