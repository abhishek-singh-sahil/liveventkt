import React, { useEffect } from "react";
import {
  Bell,
  Ticket,
  Settings,
  Gift,
  HelpCircle,
  LogOut,
  ChevronRight,
  Pencil,
  X,
  ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, setOpen, user, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/");
  };

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
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

      {/* 🔥 SIDEBAR */}
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
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 border-b border-gray-100 pt-12 sm:pt-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">{user?.name}</h2>

            {/* 🔥 EDIT PROFILE WITH ANIMATION */}
            <button
              onClick={() => goTo("/my-profile")}
              className="mt-1 cursor-pointer flex items-center gap-1.5 text-xs text-purple-600 font-bold uppercase tracking-wider group"
            >
              <Pencil
                size={12}
                className="group-hover:-translate-y-0.5 transition-transform duration-200"
              />
              <span className="group-hover:underline">Edit Profile</span>
            </button>
          </div>

          {/* 🔥 Dynamic Brand Avatar */}
          <div className="w-14 h-14 rounded-full bg-purple-400 flex items-center justify-center shadow-md border-2 border-white shrink-0">
            <span className="text-white text-xl font-bold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
        </div>

        {/* 🔥 MENU LIST (Scrollable) */}
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
            onClick={() => goTo("/my-profile/my-bookings")}
          />

          <MenuItem
            icon={<Settings size={20} />}
            title="Account Settings"
            subtitle="Manage profile & preferences"
            onClick={() => goTo("/my-profile")}
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

          {/* 🔥 ADMIN */}
          {user?.accountType?.toLowerCase() === "admin" && (
            <>
              <div className="h-px bg-gray-100 my-4 mx-2" />
              <MenuItem
                icon={<ShieldCheck size={20} />}
                title="Admin Dashboard"
                subtitle="Manage events and users"
                onClick={() => goTo("/admin")}
                isAdmin
              />
            </>
          )}
        </div>

        {/* 🔥 LOGOUT */}
        <div className="p-5 border-t border-gray-100 bg-gray-50/30">
          <button
            onClick={handleLogout}
            className="w-full bg-white border border-rose-200 text-rose-600 py-3 rounded-xl 
                       hover:bg-rose-50 hover:border-rose-300 active:scale-[0.98] transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-sm"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

      </div>
    </>
  );
};

// 🔥 HIGH-END MENU ITEM COMPONENT
const MenuItem = ({ icon, title, subtitle, onClick, isAdmin }) => {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 cursor-pointer border border-transparent
        ${isAdmin 
          ? "hover:bg-amber-50/50 hover:border-amber-100/50" 
          : "hover:bg-purple-50/50 hover:border-purple-100/50"
        }`}
    >
      <div className="flex items-center gap-4">
        
        {/* Animated Icon Box */}
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 text-gray-500 transition-colors duration-300 group-hover:bg-white group-hover:shadow-sm
          ${isAdmin ? "group-hover:text-amber-600" : "group-hover:text-purple-600"}
        `}>
          {icon}
        </div>

        <div>
          <p className={`text-sm font-bold tracking-wide transition-colors text-gray-900
            ${isAdmin ? "group-hover:text-amber-700" : "group-hover:text-purple-700"}
          `}>
            {title}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{subtitle}</p>
          )}
        </div>
      </div>

      <ChevronRight size={18} className={`text-gray-400 transition-all group-hover:translate-x-1
        ${isAdmin ? "group-hover:text-amber-500" : "group-hover:text-purple-500"}
      `} />
    </div>
  );
};

export default Sidebar;