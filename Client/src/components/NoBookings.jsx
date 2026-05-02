import React from "react";
import { useNavigate } from "react-router-dom";

const NoBookings = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-center text-center">

      {/* IMAGE */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
        alt="no bookings"
        className="w-40 mb-6 opacity-90"
      />

      {/* TEXT */}
      <h2 className="text-lg font-semibold mb-2 text-gray-800">
        You have no bookings.
      </h2>

      <p className="text-gray-500 mb-6">
        How about you get started?
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50 transition"
      >
        Explore
      </button>

    </div>
  );
};

export default NoBookings;