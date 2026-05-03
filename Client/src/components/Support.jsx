import React, { useState } from "react";
import api from "../utils/axios";
import { motion, AnimatePresence } from "framer-motion";

const Support = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null); // success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.email || !form.message) {
      setPopup({ type: "error", text: "Email & Message are required 😅" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      await api.post("/support/contact", form);

      setPopup({ type: "success", text: "Message sent successfully 🎉" });

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        website: "",
        message: "",
      });
    } catch (err) {
      setPopup({ type: "error", text: "Something went wrong 😢" });
    } finally {
      setLoading(false);
      setTimeout(() => setPopup(null), 3000);
    }
  };

  return (
    <div className="bg-[#eef1f5] min-h-screen px-4 md:px-10 py-10">

      {/* 🔥 POPUP */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ y: -80, opacity: 0, scale: 0.8 }}
            animate={{ y: 20, opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white z-50
              ${popup.type === "success" ? "bg-green-500" : "bg-red-500"}`}
          >
            {popup.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* LEFT */}
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            How can we help?
          </h1>

          <p className="text-gray-600 mb-6">
            Reach out for queries, onboarding help, or product support.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>✔ Request a demo</li>
            <li>✔ Get onboarding help</li>
            <li>✔ Ask anything about features</li>
          </ul>

          <div className="flex gap-4 mt-8 flex-wrap">
            <div className="bg-white p-4 rounded-xl shadow-sm border w-[220px] hover:shadow-md transition">
              <h3 className="font-medium">General communication</h3>
              <p className="text-sm text-gray-500 mt-1">
                abhishek2023gdsc@gmail.com
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border w-[220px] hover:shadow-md transition">
              <h3 className="font-medium">Documentation</h3>
              <p className="text-sm text-gray-500 mt-1">
                See Docs →
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">

          <h2 className="text-lg font-semibold mb-4">
            Contact our team
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email address *"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            />

            <input
              type="text"
              name="website"
              placeholder="Company website"
              value={form.website}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            />

            <textarea
              name="message"
              placeholder="Tell us more... *"
              value={form.message}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 h-28 focus:ring-2 focus:ring-black outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;