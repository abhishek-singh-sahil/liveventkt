import React, { useContext, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  FileText,
  Bell,
  Gift,
  HelpCircle,
  Monitor,
  PlaySquare,
  CreditCard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

// 🔥 MOVED OUTSIDE: Mobile Menu Item
const MobileNavItem = ({ to, icon: Icon, label, disabled, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors ${
          disabled
            ? "text-gray-400 bg-gray-50 cursor-not-allowed pointer-events-none"
            : isActive
            ? "bg-gray-200 text-red-500 font-medium"
            : "text-gray-700 hover:bg-gray-100 cursor-pointer"
        }`
      }
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  );
};

// 🔥 MOVED OUTSIDE: Desktop Menu Item
// Notice we now accept `isCollapsed` as a prop!
const DesktopNavItem = ({ to, icon: Icon, label, disabled, end, isCollapsed }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group flex items-center w-full gap-3 px-3 py-3 rounded-xl transition-all overflow-hidden whitespace-nowrap ${
          disabled
            ? "text-gray-400 bg-gray-50 cursor-not-allowed pointer-events-none"
            : isActive
            ? "bg-gray-200 text-red-500 font-medium"
            : "text-gray-700 hover:bg-gray-100 cursor-pointer"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Strict 24px wrapper ensures the icon is NEVER pushed off-center */}
          <div className="flex items-center justify-center w-[24px] shrink-0">
            <Icon
              size={22}
              className={`transition-transform duration-300 group-hover:scale-110 ${
                isActive ? "text-red-500" : "text-gray-500 group-hover:text-black"
              }`}
            />
          </div>
          
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="font-medium tracking-wide"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const MyProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#eef1f5] flex flex-col md:flex-row">
      
      {/* 🔥 MOBILE TOP MENU */}
      <div className="md:hidden bg-white border-b px-3 py-3 overflow-x-auto hide-scrollbar flex gap-2">
        <MobileNavItem to="/my-profile" end icon={User} label="Profile" disabled={!isLoggedIn} />
        <MobileNavItem to="/my-profile/my-bookings" icon={FileText} label="Orders" disabled={!isLoggedIn} />
        <MobileNavItem to="/my-profile/notifications" icon={Bell} label="Notifications" />
        <MobileNavItem to="/my-profile/rewards" icon={Gift} label="Rewards" />
        <MobileNavItem to="/my-profile/support" icon={HelpCircle} label="Help" />
      </div>

      {/* 🔥 LEFT PANEL (DESKTOP ONLY) */}
      <motion.div
        animate={{ width: isCollapsed ? 104 : 300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        // 🔥 FIX 1: Make the wrapper sticky and exactly the height of the screen
        className="p-4 hidden md:block shrink-0 sticky top-0 h-screen"
      >
        {/* 🔥 FIX 2: Changed h-[90vh] to h-full, and overflow-hidden to overflow-y-auto */}
        {/* Added custom CSS to hide the ugly default scrollbar while keeping scroll functionality */}
        <div className="bg-white rounded-2xl shadow-sm border p-3 h-full flex flex-col justify-between overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          <div className="shrink-0">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8 mt-2 overflow-hidden whitespace-nowrap px-1">
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.h2
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-lg font-bold text-black"
                  >
                    {isLoggedIn ? user?.name : "Guest User"}
                  </motion.h2>
                )}
              </AnimatePresence>

              {/* Strict 48px wrapper keeps the toggle button perfectly aligned with icons below */}
              <div className="w-[48px] flex justify-center shrink-0">
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-colors"
                >
                  {isCollapsed ? <PanelLeftOpen size={22} /> : <PanelLeftClose size={22} />}
                </button>
              </div>
            </div>

            {/* MAIN MENU */}
            <div className="space-y-1">
              <DesktopNavItem to="/my-profile" end icon={User} label="Profile" disabled={!isLoggedIn} isCollapsed={isCollapsed} />
              <DesktopNavItem to="/my-profile/my-bookings" icon={FileText} label="Your Orders" disabled={!isLoggedIn} isCollapsed={isCollapsed} />
              <DesktopNavItem to="/my-profile/notifications" icon={Bell} label="Notifications" isCollapsed={isCollapsed} />
              <DesktopNavItem to="/my-profile/rewards" icon={Gift} label="Rewards" isCollapsed={isCollapsed} />
            </div>

            {/* SERVICES */}
            <div className="mt-8 space-y-1">
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs font-bold text-gray-400 px-4 mb-3 uppercase tracking-widest shrink-0"
                  >
                    Services
                  </motion.p>
                )}
              </AnimatePresence>
              <DesktopNavItem to="/my-profile/saved-devices" icon={Monitor} label="Saved Devices" disabled={!isLoggedIn} isCollapsed={isCollapsed} />
              <DesktopNavItem to="/my-profile/stream" icon={PlaySquare} label="Stream Library" disabled={!isLoggedIn} isCollapsed={isCollapsed} />
              <DesktopNavItem to="/my-profile/payments" icon={CreditCard} label="QuikPay" disabled={!isLoggedIn} isCollapsed={isCollapsed} />
            </div>
          </div>

          {/* BOTTOM */}
          <div className="space-y-1 border-t pt-4 mt-8 shrink-0">
            <DesktopNavItem to="/my-profile/support" icon={HelpCircle} label="Help & Support" isCollapsed={isCollapsed} />

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="group flex items-center w-full gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors overflow-hidden whitespace-nowrap"
              >
                <div className="flex items-center justify-center w-[24px] shrink-0">
                  <LogOut size={22} className="transition-transform duration-300 group-hover:-translate-x-1" />
                </div>
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium tracking-wide"
                    >
                      Sign Out
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}
          </div>

        </div>
      </motion.div>

      {/* 🔥 RIGHT CONTENT */}
      <div className="flex-1 p-4 md:p-6 overflow-hidden">
        <Outlet />
      </div>

    </div>
  );
};

export default MyProfile;