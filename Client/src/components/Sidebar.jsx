import React, { useEffect } from "react";
import {
  Bell,
  Ticket,
  Settings,
  Gift,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ open, setOpen, user, logout }) => {


    const handellogout = ()=>{
        setOpen(false)
        logout()
    }
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
            <p className="text-sm text-gray-500 cursor-pointer hover:underline">
              Edit Profile
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 font-bold">
              {user?.name?.[0]}
            </span>
          </div>
        </div>

        {/* 🔥 SPECIAL CARD */}
        <div className="bg-yellow-100 px-5 py-3 text-sm border-b flex justify-between items-center">
          <div>
            <p className="font-medium">Get tickets on WhatsApp/SMS!</p>
            <p className="text-gray-600 text-xs">
              Add your Mobile Number
            </p>
          </div>
          <ChevronRight size={18} />
        </div>

        {/* 🔥 MENU LIST */}
        <div className="divide-y">

          <MenuItem icon={<Bell size={18} />} title="Notifications" />
          <MenuItem
            icon={<Ticket size={18} />}
            title="Your Orders"
            subtitle="View all your bookings & purchases"
          />
          <MenuItem
            icon={<Settings size={18} />}
            title="Accounts & Settings"
            subtitle="Location, Payments, Permissions & More"
          />
          <MenuItem
            icon={<Gift size={18} />}
            title="Rewards"
            subtitle="View your rewards & unlock new ones"
          />
          <MenuItem
            icon={<HelpCircle size={18} />}
            title="Help & Support"
            subtitle="View FAQs & Chat support"
          />

          {/* 🔥 ADMIN */}
          {user?.accountType?.toLowerCase() === "admin" && (
            <MenuItem
              icon={<Settings size={18} />}
              title="Admin Dashboard"
            />
          )}
        </div>

        {/* 🔥 LOGOUT */}
        <div className="p-5 border-t">
          <button
            onClick={handellogout}
            className="w-full border border-red-400 text-red-500 py-2.5 rounded-lg 
                       hover:bg-red-50 transition font-medium"
          >
            Sign out
          </button>
        </div>

      </div>
    </>
  );
};

export default Sidebar;


// 🔥 MENU ITEM COMPONENT
const MenuItem = ({ icon, title, subtitle }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition cursor-pointer">
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