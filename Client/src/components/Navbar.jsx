import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthenticated = !!user?.token;

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  

  return (
    <>
      {/* 🔴 NAVBAR */}
      <div className="w-full fixed top-0 z-50 bg-gray-300 shadow-sm">

        {/* 🔹 TOP ROW */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-black tracking-tight">
            Liv<span className="text-purple-600">Eventkt</span>
          </Link>

          {/* 🔹 Right Side */}
          <div className="flex items-center gap-5">

  {isAuthenticated ? (
    <>

    {/* 🔥 ADMIN BUTTON (ONLY FOR ADMIN) */}
      {user?.accountType === "admin" && (
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 rounded-md text-sm bg-black text-white hover:opacity-90 transition"
        >
          Admin Dashboard
        </button>
      )}
      {/* ✅ Profile Button */}
      <button
        className="flex hover:cursor-pointer items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition"
        onClick={() => setSidebarOpen(true)}
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold">
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </div>

        {/* Name */}
        <span className="text-sm text-gray-700 font-medium hidden sm:block">
          Hi, {user?.name?.split(" ")[0]}
        </span>
      </button>
    </>
  ) : (
    <>
      {/* Get Started */}
      <button
        onClick={() => setOpen(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition"
      >
        Get Started
      </button>

      {/* Hamburger */}
      <button className="p-2 rounded-md hover:bg-gray-100 transition">
        <Menu size={22} />
      </button>
    </>
  )}

</div>
        </div>

        {/* 🔹 BOTTOM ROW */}
        <div className="bg-gray-200 border-t">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2 text-sm text-gray-600">

            {/* Left Links */}
            <div className="flex gap-6">
              <Link className="hover:text-black transition">Movies</Link>
              <Link className="hover:text-black transition">Stream</Link>
              <Link className="hover:text-black transition">Events</Link>
              <Link className="hover:text-black transition">Plays</Link>
              <Link className="hover:text-black transition">Sports</Link>
              <Link className="hover:text-black transition">Activities</Link>
            </div>

            {/* Right Links */}
            <div className="hidden md:flex gap-6">
              <Link className="hover:text-black transition">ListYourShow</Link>
              <Link className="hover:text-black transition">Corporates</Link>
              <Link className="hover:text-black transition">Offers</Link>
              <Link className="hover:text-black transition">Gift Cards</Link>
            </div>

          </div>
        </div>
      </div>

      {/* 🔥 AUTH MODAL */}
      <AuthModal open={open} setOpen={setOpen} />

      <Sidebar 
  open={sidebarOpen} 
  setOpen={setSidebarOpen} 
  user={user} 
  logout={handleLogout}
/>
    </>
    
  );
  
};

export default Navbar;