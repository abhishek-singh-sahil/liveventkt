import React, { useEffect, useContext } from "react";
import {
  Bell,
  Ticket,
  Film,
  HelpCircle,
  Settings,
  Gift,
  ChevronRight,
  Lock
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
    setAuthView("login");
    setOpenAuth(true);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <>
      {/* 🔥 OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-50"
        />
      )}

      {/* 🔥 RIGHT SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[360px] bg-white z-[60]
        shadow-xl transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* 🔥 HEADER */}
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold mb-4">Hey!</h2>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Unlock offers & benefits
            </p>

            <button
              onClick={openLoginModal}
              className="text-sm px-3 py-1.5 rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition"
            >
              Login / Register
            </button>
          </div>
        </div>

        {/* 🔥 MENU */}
        <div className="divide-y">

          <MenuItem
            icon={<Bell size={18} />}
            title="Notifications"
            onClick={() => goTo("my-profile/notifications")}
          />

          <MenuItem
            icon={<Ticket size={18} />}
            title="Your Bookings"
            subtitle="View all your bookings"
            locked
            disabled
            onLogin={openLoginModal}
          />

          <MenuItem
            icon={<Film size={18} />}
            title="Stream Library"
            subtitle="Rented & purchased content"
            locked
            disabled
            onLogin={openLoginModal}
          />

          <MenuItem
            icon={<HelpCircle size={18} />}
            title="Help & Support"
            onClick={() => goTo("my-profile/support")}
          />

          <MenuItem
            icon={<Settings size={18} />}
            title="Accounts & Settings"
            locked
            disabled
            onLogin={openLoginModal}
          />

          <MenuItem
            icon={<Gift size={18} />}
            title="Rewards"
            onClick={() => goTo("my-profile/rewards")}
          />

        </div>
      </div>
    </>
  );
};

export default GuestSidebar;


// 🔥 UPDATED MENU ITEM
const MenuItem = ({ icon, title, subtitle, locked, disabled, onClick, onLogin }) => {
  return (
    <div
      onClick={() => {
        if (disabled) {
          onLogin && onLogin();   // 🔥 OPEN LOGIN MODAL
        } else {
          onClick && onClick();
        }
      }}
      className={`flex items-center justify-between px-5 py-4 transition
        ${disabled 
          ? "opacity-40 cursor-not-allowed bg-gray-50" 
          : "hover:bg-gray-50 cursor-pointer"
        }`}
    >
      <div className="flex items-center gap-4">
        <div className={`${disabled ? "text-gray-600" : "text-gray-500"}`}>
          {icon}
        </div>

        <div>
          <p className={`text-sm font-medium ${disabled ? "text-gray-600" : ""}`}>
            {title}
          </p>

          {subtitle && (
            <p className="text-xs text-gray-600">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {locked && <Lock size={14} className="text-gray-600" />}
        <ChevronRight size={16} className="text-gray-600" />
      </div>
    </div>
  );
};