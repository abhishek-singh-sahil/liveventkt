import React, { useEffect, useContext } from "react";
import {
  Bell,
  Ticket,
  Film,
  HelpCircle,
  Settings,
  Gift,
  ChevronRight,
  Lock,
  UserCircle2,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const GuestSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  // 🔥 GLOBAL AUTH CONTEXT
  const { setOpenAuth, setAuthView } = useContext(AuthContext);

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  const openLoginModal = () => {
    setOpen(false);
    setTimeout(() => {
      setAuthView("login");
      setOpenAuth(true);
    }, 150); // Tiny delay ensures the sidebar closes smoothly before modal opens
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <>
      {/* 🔥 OVERLAY (Glassmorphism) */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* 🔥 RIGHT SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-[60]
        shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* 🔥 CLOSE BUTTON */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* 🔥 PREMIUM HEADER */}
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 border-b border-gray-100 pt-12 sm:pt-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-300 border border-gray-100">
              <UserCircle2 size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Welcome, Guest!</h2>
              <p className="text-sm text-gray-500 font-medium mt-0.5">
                Sign in to unlock all features
              </p>
            </div>
          </div>

          <button
            onClick={openLoginModal}
            className="w-full cursor-pointer bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 hover:shadow-lg transition-all duration-200"
          >
            Login or Create Account
          </button>
        </div>

        {/* 🔥 MENU (Scrollable if screen is small) */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 hide-scrollbar">

          <MenuItem
            icon={<Bell size={20} />}
            title="Notifications"
            onClick={() => goTo("my-profile/notifications")}
          />

          <MenuItem
            icon={<Ticket size={20} />}
            title="Your Bookings"
            subtitle="View all your past and upcoming events"
            locked
            onLogin={openLoginModal}
          />

          <MenuItem
            icon={<Film size={20} />}
            title="Stream Library"
            subtitle="Access your rented & purchased content"
            locked
            onLogin={openLoginModal}
          />

          <div className="h-px bg-gray-100 my-4 mx-2" /> {/* Divider */}

          <MenuItem
            icon={<Gift size={20} />}
            title="Rewards & Offers"
            onClick={() => goTo("my-profile/rewards")}
          />

          <MenuItem
            icon={<HelpCircle size={20} />}
            title="Help & Support"
            onClick={() => goTo("my-profile/support")}
          />

          <MenuItem
            icon={<Settings size={20} />}
            title="Accounts & Settings"
            locked
            onLogin={openLoginModal}
          />

        </div>
      </div>
    </>
  );
};

// 🔥 UPDATED MENU ITEM (Highly Interactive)
const MenuItem = ({ icon, title, subtitle, locked, onClick, onLogin }) => {
  return (
    <div
      onClick={() => {
        if (locked) {
          onLogin && onLogin();
        } else {
          onClick && onClick();
        }
      }}
      className={`group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 cursor-pointer border border-transparent
        ${locked 
          ? "hover:bg-gray-50 hover:border-gray-100" 
          : "hover:bg-purple-50/50 hover:border-purple-100/50"
        }`}
    >
      <div className="flex items-center gap-4">
        
        {/* Animated Icon Box */}
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-300
          ${locked 
            ? "bg-gray-50 text-gray-400 group-hover:bg-white group-hover:shadow-sm" 
            : "bg-gray-50 text-gray-500 group-hover:bg-white group-hover:text-purple-600 group-hover:shadow-sm"
          }`}
        >
          {icon}
        </div>

        <div>
          <p className={`text-sm font-bold tracking-wide transition-colors ${locked ? "text-gray-700" : "text-gray-900 group-hover:text-purple-700"}`}>
            {title}
          </p>

          {subtitle && (
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 pl-2">
        {locked ? (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-md group-hover:bg-gray-200 transition-colors">
            <Lock size={12} className="text-gray-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sign In</span>
          </div>
        ) : (
          <ChevronRight size={18} className="text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
        )}
      </div>
    </div>
  );
};

export default GuestSidebar;