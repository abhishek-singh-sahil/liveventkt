import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const BookingPending = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // 🔥 FETCH EVENTS FOR SCROLLER
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get("/events/allevent");
        setEvents(data.events || []);
      } catch (err) {
        console.log("Failed to load events");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-4 py-10">

      {/* 🔥 MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">

        {/* 🔥 STATUS CARD */}
        <div className="bg-white rounded-2xl shadow-md p-8 text-center mb-10">

          {/* ANIMATED ICON */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center animate-pulse">
              <span className="text-3xl">⏳</span>
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Booking Placed Successfully
          </h1>

          {/* SUBTEXT */}
          <p className="text-gray-600 text-sm mb-4">
            Your booking is currently under verification.
          </p>

          {/* STATUS BADGE */}
          <div className="mb-6">
            <span className="px-4 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium">
              Payment Verification Pending
            </span>
          </div>

          {/* INFO BOX */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600 mb-6">
            We are verifying your payment. Once confirmed, your tickets will be
            available instantly in your bookings section.
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">

            <button
              onClick={() => navigate("/my-profile/my-bookings")}
              className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              View My Bookings
            </button>

            <button
              onClick={() => navigate("/")}
              className="border border-gray-300 px-6 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Go to Home
            </button>

          </div>
        </div>

        {/* 🔥 BOOK MORE EVENTS */}
        <div>

          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Book More Events 🎉
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

            {events.map((event) => (
              <div
                key={event._id}
                onClick={() => navigate(`/event/${event._id}`)}
                className="min-w-[220px] bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
              >
                {/* IMAGE */}
                <div className="h-36 w-full rounded-t-xl overflow-hidden">
                  <img
                    src={event.eventImg || "https://via.placeholder.com/300"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-3">

                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {event.title}
                  </h3>

                  <p className="text-xs text-gray-500 mb-1">
                    {event.location}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium text-black">
                      ₹{event.price}
                    </span>

                    <span className="text-xs text-gray-400">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingPending;