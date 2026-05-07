import React from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, Search } from "lucide-react"; // 🔥 Premium built-in icons
import { motion } from "framer-motion";

const NoBookings = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto min-h-[50vh] bg-white border border-gray-100 shadow-sm rounded-3xl flex flex-col items-center justify-center text-center p-8 sm:p-12"
    >
      
      {/* 🔥 ICON / ILLUSTRATION */}
      <div className="relative mb-6">
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-purple-200 blur-2xl opacity-40 rounded-full"></div>
        {/* Crisp circular icon container */}
        <div className="relative w-24 h-24 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
          <Ticket size={40} strokeWidth={1.5} className="text-gray-400" />
        </div>
      </div>

      {/* 🔥 TEXT CONTENT */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
        No tickets yet
      </h2>

      <p className="text-gray-500 max-w-sm mb-8 text-sm sm:text-base leading-relaxed">
        Your digital wallet is empty. Discover the best tech conferences, festivals, and workshops happening near you.
      </p>

      {/* 🔥 PREMIUM BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="group flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 hover:shadow-lg transition-all duration-200 active:scale-95"
      >
        <Search size={16} className="text-gray-400 group-hover:text-white transition-colors" />
        Explore Events
      </button>

    </motion.div>
  );
};

export default NoBookings;