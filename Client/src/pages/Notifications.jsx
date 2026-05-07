import React, { useState } from "react";
import { Bell, BellOff, CheckCheck, RefreshCw, Info, Ticket, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Notifications = () => {
  // Mock state for notifications - change to [] to see the Empty State
  const [notifications, setNotifications] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-[calc(100vh-104px)] bg-[#eef1f5] py-8 lg:py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* 🔥 HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Notifications</h1>
            <p className="text-gray-500 text-sm mt-1">Stay updated with your latest event activity.</p>
          </div>
          
          {notifications.length > 0 && (
            <button className="flex items-center gap-1.5 text-xs font-bold text-purple-600 uppercase tracking-wider hover:text-purple-700 transition">
              <CheckCheck size={16} />
              Mark all as read
            </button>
          )}
        </div>

        {/* 🔥 CONTENT AREA */}
        <AnimatePresence mode="wait">
          {notifications.length === 0 ? (
            /* --- EMPTY STATE --- */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 sm:p-16 text-center flex flex-col items-center"
            >
              <div className="relative mb-6">
                {/* Decorative Glow */}
                <div className="absolute inset-0 bg-purple-200 blur-2xl opacity-40 rounded-full animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                  <BellOff size={32} className="text-gray-300" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">All caught up!</h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
                You don’t have any new notifications. Important updates about your bookings and exclusive offers will appear here.
              </p>

              <button 
                onClick={handleRefresh}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-70"
                disabled={isRefreshing}
              >
                <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                {isRefreshing ? "Checking..." : "Check for Updates"}
              </button>
            </motion.div>
          ) : (
            /* --- NOTIFICATION LIST --- */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {notifications.map((notif) => (
                <NotificationCard key={notif.id} data={notif} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        <p className="text-center text-[11px] text-gray-400 mt-10 uppercase tracking-[0.2em] font-bold">
          LiveEventkt Security & Privacy
        </p>
      </div>
    </div>
  );
};

// 🔥 PRE-STYLED NOTIFICATION CARD COMPONENT (Ready for your future data)
const NotificationCard = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
        {/* Dynamic Icon based on type */}
        <Info size={20} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-0.5">
          <h3 className="text-sm font-bold text-gray-900">Notification Title</h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase">2h ago</span>
        </div>
        <p className="text-sm text-gray-500 leading-snug">
          This is where your notification message will go. It looks clean and fits your brand.
        </p>
      </div>
      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div> {/* Unread Dot */}
    </div>
  );
};

export default Notifications;