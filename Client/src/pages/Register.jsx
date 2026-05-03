import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Info } from "lucide-react";

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
    const hue = (strength / 5) * 120;
    return `hsl(${hue}, 90%, 45%)`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (name === "password") {
      setStrength(getPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (strength < 4) {
      setError("Password is too weak");
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
      if (data?.message?.includes("verify")) {
        setAuthEmail(form.email);   // 🔥 STORE EMAIL GLOBALLY
        setAuthView("otp");         // 🔥 SWITCH TO OTP
      } else {
        setError(data?.message || "Registration failed");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-center mb-5">
        Create Account 🚀
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center mb-3">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500"
          required
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500"
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

          {form.password && (
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

        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500"
          required
        />

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg text-white font-medium bg-gray-900 hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <span
          onClick={() => setAuthView("login")}   // 🔥 FIXED
          className="text-purple-600 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;