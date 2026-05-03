import React, { useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const isLoggedIn = !!user;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-gray-200 text-red-500 font-medium"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const disabledClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 bg-gray-50 cursor-not-allowed pointer-events-none";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
  <div className="min-h-screen bg-[#eef1f5] flex flex-col md:flex-row">

    {/* 🔥 MOBILE TOP MENU */}
    <div className="md:hidden bg-white border-b px-2 py-2 overflow-x-auto whitespace-nowrap flex gap-2">
      
      <NavLink to="/my-profile" end className={isLoggedIn ? linkClass : disabledClass}>
        👤 Profile
      </NavLink>

      <NavLink to="/my-profile/my-bookings" className={isLoggedIn ? linkClass : disabledClass}>
        📄 Orders
      </NavLink>

      <NavLink to="/my-profile/notifications" className={linkClass}>
        🔔 Notifications
      </NavLink>

      <NavLink to="/my-profile/rewards" className={linkClass}>
        🎁 Rewards
      </NavLink>

      <NavLink to="/my-profile/support" className={linkClass}>
        ❓ Help
      </NavLink>

    </div>

    {/* 🔥 LEFT PANEL (DESKTOP ONLY) */}
    <div className="w-[320px] p-4 hidden md:block">

      <div className="bg-white rounded-2xl shadow-sm border p-5 min-h-[90vh] flex flex-col justify-between">

        {/* HEADER */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {isLoggedIn ? user?.name : "Guest User"}
            </h2>

            <button className="text-gray-500 text-lg">✕</button>
          </div>

          {/* MENU */}
          <div className="space-y-1 text-sm">

            <NavLink to="/my-profile" end className={isLoggedIn ? linkClass : disabledClass}>
              👤 Profile
            </NavLink>

            <NavLink to="/my-profile/my-bookings" className={isLoggedIn ? linkClass : disabledClass}>
              📄 Your Orders
            </NavLink>

            <NavLink to="/my-profile/notifications" className={linkClass}>
              🔔 Notifications
            </NavLink>

            <NavLink to="/my-profile/rewards" className={linkClass}>
              🎁 Rewards →
            </NavLink>

          </div>

          {/* SERVICES */}
          <div className="mt-6 space-y-1 text-sm">

            <NavLink to="/my-profile/saved-devices" className={isLoggedIn ? linkClass : disabledClass}>
              💻 Saved Devices
            </NavLink>

            <NavLink to="/my-profile/stream" className={isLoggedIn ? linkClass : disabledClass}>
              🎬 Stream Library
            </NavLink>

            <NavLink to="/my-profile/payments" className={isLoggedIn ? linkClass : disabledClass}>
              💳 QuikPay
            </NavLink>

          </div>
        </div>

        {/* BOTTOM */}
        <div className="space-y-2">

          <NavLink to="/my-profile/support" className={linkClass}>
            ❓ Help & Support
          </NavLink>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition"
            >
              🚪 Sign Out
            </button>
          )}
        </div>
      </div>
    </div>

    {/* 🔥 RIGHT CONTENT */}
    <div className="flex-1 p-4 md:p-6">
      <Outlet />
    </div>

  </div>
);
};

export default MyProfile;