import React, { useEffect } from "react";
import {
  Bell,
  Ticket,
  Settings,
  Gift,
  HelpCircle,
  LogOut,
  ChevronRight,
  Pencil
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
      {/* 🔥 OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-50"
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[360px] bg-white z-[60] 
        shadow-xl transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >

        {/* 🔥 HEADER */}
        <div className="p-5 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{user?.name}</h2>

            {/* 🔥 EDIT PROFILE WITH ANIMATION */}
            <button
              onClick={() => goTo("/my-profile")}
              className="flex items-center gap-1 text-sm text-purple-600 font-medium group"
            >
              <Pencil
                size={16}
                className="group-hover:rotate-12 transition-transform duration-200"
              />
              <span className="group-hover:underline">Edit Profile</span>
            </button>
          </div>

          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 font-bold">
              {user?.name?.[0]}
            </span>
          </div>
        </div>

        {/* 🔥 MENU LIST */}
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
            onClick={() => goTo("/my-profile/my-bookings")}
          />

          <MenuItem
            icon={<Settings size={18} />}
            title="Account Settings"
            subtitle="Profile & preferences"
            onClick={() => goTo("/my-profile")}
          />

          <MenuItem
            icon={<Gift size={18} />}
            title="Rewards"
            onClick={() => goTo("my-profile/rewards")}
          />

          <MenuItem
            icon={<HelpCircle size={18} />}
            title="Help & Support"
            onClick={() => goTo("my-profile/support")}
          />

          {/* 🔥 ADMIN */}
          {user?.accountType?.toLowerCase() === "admin" && (
            <MenuItem
              icon={<Settings size={18} />}
              title="Admin Dashboard"
              onClick={() => goTo("/admin")}
            />
          )}
        </div>

        {/* 🔥 LOGOUT */}
        <div className="p-5 border-t">
          <button
            onClick={handleLogout}
            className="w-full border border-red-400 text-red-500 py-2.5 rounded-lg 
                       hover:bg-red-50 transition font-medium flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>

      </div>
    </>
  );
};

export default Sidebar;


// 🔥 MENU ITEM COMPONENT
const MenuItem = ({ icon, title, subtitle, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="text-gray-500">{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>

      <ChevronRight size={16} className="text-gray-400" />
    </div>
  );
};