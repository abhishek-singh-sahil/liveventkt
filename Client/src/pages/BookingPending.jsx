import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { motion } from "framer-motion";
import { Clock, Info, MapPin, Calendar, ArrowRight, Ticket } from "lucide-react";

const BookingPending = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH EVENTS FOR SCROLLER
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get("/events/allevent");
        setEvents(data.events || []);
      } catch (err) {
        console.log("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-[calc(100vh-104px)] bg-[#eef1f5] px-4 py-12 lg:py-20 overflow-hidden">

      {/* 🔥 MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">

        {/* 🔥 STATUS CARD (Animated) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-12 text-center relative overflow-hidden mb-16"
        >
          {/* Subtle glowing background orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-200/30 blur-[50px] rounded-full pointer-events-none"></div>

          {/* ANIMATED ICON */}
          <div className="relative flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shadow-sm relative z-10">
              <Clock size={36} className="text-amber-500 animate-pulse" />
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Booking Received!
          </h1>

          {/* STATUS BADGE */}
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1.5 text-xs rounded-full bg-amber-100 text-amber-700 font-bold uppercase tracking-wider border border-amber-200">
              Payment Verification Pending
            </span>
          </div>

          {/* INFO BOX */}
          <div className="bg-amber-50/50 border-l-4 border-amber-400 rounded-r-xl p-5 text-left mb-8 flex gap-3">
            <Info className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-gray-700 leading-relaxed">
              We are currently verifying your UTR payment. This usually takes a few hours. Once confirmed by our team, your secure digital tickets will be instantly available in your bookings dashboard.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/my-profile/my-bookings")}
              className="group bg-black text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Ticket size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              View My Bookings
            </button>

            <button
              onClick={() => navigate("/")}
              className="border border-gray-200 bg-white px-8 py-3.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition-all"
            >
              Return to Home
            </button>
          </div>
        </motion.div>


        {/* 🔥 BOOK MORE EVENTS (Cross-sell Scroller) */}
        {!loading && events.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Discover More Events
              </h2>
              <button 
                onClick={() => navigate("/")}
                className="text-sm font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group"
              >
                See all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Scroller Container */}
            <div className="relative">
              <div className="flex gap-5 sm:gap-6 overflow-x-auto pb-8 pt-2 px-2 hide-scrollbar snap-x snap-mandatory">
                
                {events.slice(0, 8).map((event) => (
                  <div
                    key={event._id}
                    onClick={() => navigate(`/event/${event._id}`)}
                    className="snap-start shrink-0 w-[260px] sm:w-[280px] group bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col border border-gray-100 cursor-pointer"
                  >
                    {/* IMAGE */}
                    <div className="h-40 w-full overflow-hidden relative bg-gray-100">
                      <img
                        src={event.eventImg ? `${event.eventImg}?w=300&q=80` : "/eventPlaceholder.jpg"}
                        alt={event.title || "Event"}
                        onError={(e) => (e.target.src = "/eventPlaceholder.jpg")}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-extrabold shadow-sm">
                        {event.price === 0 || !event.price ? (
                          <span className="text-emerald-600">FREE</span>
                        ) : (
                          <span className="text-gray-900">₹{event.price.toLocaleString("en-IN")}</span>
                        )}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-purple-600 transition-colors">
                        {event.title || "Untitled Event"}
                      </h3>

                      <div className="flex flex-col gap-2 text-xs text-gray-600 mt-auto">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-gray-400 shrink-0" />
                          <span className="truncate">{event.location || "Location TBA"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400 shrink-0" />
                          <span>
                            {event.date ? new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Date TBA"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gradient fade on the right edge to indicate scrolling */}
              <div className="absolute right-0 top-0 bottom-8 w-16 bg-gradient-to-l from-[#eef1f5] to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default BookingPending;