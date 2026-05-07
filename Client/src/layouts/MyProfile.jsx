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

// 🔥 MOBILE MENU ITEM
const MobileNavItem = ({ to, icon: Icon, label, disabled, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={(e) => disabled && e.preventDefault()}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 text-sm ${
          disabled
            ? "text-gray-400 bg-gray-50/50 cursor-not-allowed opacity-60"
            : isActive
            ? "bg-purple-100 text-purple-700 font-bold shadow-sm border border-purple-200/50"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
};

// 🔥 DESKTOP MENU ITEM (Upgraded for Perfect Square Alignment)
const DesktopNavItem = ({ to, icon: Icon, label, disabled, end, isCollapsed }) => {
  return (
    <NavLink
      to={to}
      end={end}
      title={isCollapsed ? label : ""} // Native tooltip when collapsed
      onClick={(e) => disabled && e.preventDefault()}
      className={({ isActive }) =>
        `group flex items-center transition-all duration-300 overflow-hidden whitespace-nowrap 
        ${
          /* 🔥 Dynamic Shape: Square when collapsed, Wide Rectangle when open */
          isCollapsed 
            ? "w-12 h-12 justify-center mx-auto rounded-xl" 
            : "w-full px-3 py-3 gap-3 rounded-xl"
        }
        ${
          disabled
            ? "text-gray-400 cursor-not-allowed opacity-60"
            : isActive
            ? "bg-purple-50 text-purple-700 font-bold shadow-[inset_3px_0_0_0_#9333ea]" // Added subtle active border
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`flex items-center justify-center shrink-0 transition-transform duration-300 ${!disabled && "group-hover:scale-110"}`}>
            <Icon
              size={20}
              strokeWidth={isActive ? 2.5 : 2}
              className={isActive ? "text-purple-600" : "text-gray-400 group-hover:text-purple-500"}
            />
          </div>
          
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="tracking-wide text-sm block"
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
    <div className="min-h-[calc(100vh-104px)] bg-[#eef1f5] flex flex-col md:flex-row max-w-[1600px] mx-auto w-full relative">
      
      {/* 🔥 MOBILE TOP MENU */}
      <div className="md:hidden sticky top-[104px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/60 px-2 py-3 w-full shadow-sm">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar px-2 pb-1 relative">
          <MobileNavItem to="/my-profile" end icon={User} label="Profile" disabled={!isLoggedIn} />
          <MobileNavItem to="/my-profile/my-bookings" icon={FileText} label="Orders" disabled={!isLoggedIn} />
          <MobileNavItem to="/my-profile/notifications" icon={Bell} label="Notifications" />
          <MobileNavItem to="/my-profile/rewards" icon={Gift} label="Rewards" />
          <MobileNavItem to="/my-profile/support" icon={HelpCircle} label="Help" />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>

      {/* 🔥 LEFT PANEL (DESKTOP ONLY) */}
      <motion.div
        /* Reduced collapsed width from 96 to 88 for sleeker alignment */
        animate={{ width: isCollapsed ? 88 : 280 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden md:block shrink-0 sticky top-[116px] h-[calc(100vh-130px)] ml-6 my-4 z-10"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 h-full flex flex-col justify-between overflow-y-auto hide-scrollbar">
          
          <div className="shrink-0">
            {/* HEADER */}
            <div className={`flex items-center mb-8 mt-2 overflow-hidden whitespace-nowrap ${isCollapsed ? "justify-center" : "justify-between px-2"}`}>
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex items-center gap-3 overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
                      {isLoggedIn && user?.name ? user.name[0].toUpperCase() : "G"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-extrabold text-gray-900 tracking-tight truncate">
                        {isLoggedIn ? user?.name : "Guest User"}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Account</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-center shrink-0 bg-gray-50 rounded-xl border border-gray-100">
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                  aria-label="Toggle Sidebar"
                >
                  {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
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
            <div className="mt-8 space-y-1 border-t border-gray-100 pt-4">
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[10px] font-bold text-gray-400 px-4 mb-2 uppercase tracking-widest shrink-0"
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
          <div className="space-y-1 border-t border-gray-100 pt-4 mt-8 shrink-0">
            <DesktopNavItem to="/my-profile/support" icon={HelpCircle} label="Help & Support" isCollapsed={isCollapsed} />

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                title={isCollapsed ? "Sign Out" : ""}
                className={`group flex items-center transition-all duration-300 overflow-hidden whitespace-nowrap mt-1 text-rose-500 hover:bg-rose-50
                  ${isCollapsed ? "w-12 h-12 justify-center mx-auto rounded-xl" : "w-full px-3 py-3 gap-3 rounded-xl"}
                `}
              >
                <div className="flex items-center justify-center shrink-0">
                  <LogOut size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
                </div>
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-semibold tracking-wide text-sm block"
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
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
        <Outlet />
      </div>

    </div>
  );
};

export default MyProfile;