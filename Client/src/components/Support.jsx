import React, { useState } from "react";
import api from "../utils/axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, 
  Send, 
  Mail, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  LifeBuoy 
} from "lucide-react";

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
      setPopup({ type: "error", text: "Email & Message are required" });
      setTimeout(() => setPopup(null), 3000);
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

      setPopup({ type: "success", text: "Message sent successfully!" });

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        website: "",
        message: "",
      });
    } catch (err) {
      setPopup({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
      setTimeout(() => setPopup(null), 3000);
    }
  };

  return (
    <div className="bg-[#eef1f5] min-h-[calc(100vh-104px)] py-12 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
      
      {/* 🔥 PREMIUM TOAST NOTIFICATION */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 20, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-5 py-3 rounded-full shadow-2xl backdrop-blur-md border text-sm font-bold tracking-wide z-[100]
              ${popup.type === "success" 
                ? "bg-emerald-500/95 border-emerald-400 text-white" 
                : "bg-rose-500/95 border-rose-400 text-white"}`}
          >
            {popup.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {popup.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

        {/* 🔥 LEFT: COPY & INFO */}
        <div className="pt-4">
          
          <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-max mb-6 border border-purple-200">
            <LifeBuoy size={14} />
            Support 24/7
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5 leading-tight">
            How can we <br className="hidden sm:block" /> help you today?
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
            Reach out for queries, onboarding help, or product support. Our team is always ready to assist you.
          </p>

          <ul className="space-y-4 text-gray-700 mb-10">
            {["Request a live platform demo", "Get priority onboarding help", "Ask anything about our features"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-medium">
                <CheckCircle2 size={20} className="text-purple-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Contact Card 1 */}
            <a href="mailto:abhishek2023gdsc@gmail.com" className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Mail size={18} />
              </div>
              <h3 className="font-bold text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">abhishek2023gdsc@gmail.com</p>
            </a>

            {/* Contact Card 2 */}
            <div className="group cursor-pointer bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <FileText size={18} />
              </div>
              <h3 className="font-bold text-gray-900">Documentation</h3>
              <p className="text-sm text-purple-600 font-semibold mt-1 group-hover:underline">Browse Docs →</p>
            </div>
          </div>
        </div>

        {/* 🔥 RIGHT: THE FORM */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10">

          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
            Send us a message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="e.g. Jane"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="e.g. Doe"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email Address <span className="text-rose-500">*</span></label>
              <input
                type="email"
                name="email"
                placeholder="jane@company.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Website</label>
                <input
                  type="text"
                  name="website"
                  placeholder="https://yoursite.com"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">How can we help? <span className="text-rose-500">*</span></label>
              <textarea
                name="message"
                placeholder="Tell us a little about your project or issue..."
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900 h-32 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;