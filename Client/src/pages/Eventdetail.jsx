import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../utils/axios';
import BookNow from './BookNow';


const Eventdetail = () => {

const {id} = useParams();
const [event, setEvent] = useState(null);
const [loading, setLoading] = useState(false);

const findevent = async ()=>{
  try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data.event)
      } catch (error) {
        console.log("Error fetching event", error)
      } finally {
        setLoading(false)
      }
}
    const navigate = useNavigate()
const handlebooking =()=>{
    navigate(`/book/${id}`)
}

useEffect(() => {
    setLoading(true)
    const timeoutId = setTimeout(() => {
      findevent()
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [id])


  return (
  <div className="bg-gray-50 min-h-screen">

    {/* 🔹 LOADING */}
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    ) : !event ? (
      <p className="text-center mt-20 text-xl text-gray-500">Event not found</p>
    ) : (
      <>
        {/* 🔥 HERO SECTION */}
        <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden">
          <img
            src={event.eventImg}
            alt={event.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-end">
            <div className="max-w-6xl mx-auto px-6 py-10 text-white w-full">
              <h1 className="text-3xl md:text-5xl font-bold mb-3">
                {event.title}
              </h1>
              <p className="text-gray-300 text-sm md:text-lg">
                {event.location} •{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 MAIN CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

          {/* LEFT CONTENT */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-3">About Event</h2>
              <p className="text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">

                <div>
                  <p className="font-semibold text-gray-800">Category</p>
                  <p>{event.category}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Price</p>
                  <p>{event.price === 0 ? "Free" : `₹${event.price}`}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Date</p>
                  <p>
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Location</p>
                  <p>{event.location}</p>
                </div>

              </div>
            </div>

          </div>

          {/* 🔥 RIGHT SIDE BOOKING CARD */}
          <div className="sticky top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">

              <h2 className="text-xl font-bold">Book Your Spot</h2>

              {/* Price */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Price</span>
                <span className="text-lg font-semibold">
                  {event.price === 0 ? "Free" : `₹${event.price}`}
                </span>
              </div>

              {/* Seats */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Seats Left</span>
                <span className="font-semibold">
                  {event.availableSeats}/{event.totalSeats}
                </span>
              </div>

              {/* Button */}
              
              <button onClick={handlebooking} className="mt-4 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition font-semibold">
                Book Now
              </button>

              {/* Extra */}
              <p className="text-xs text-gray-400 text-center">
                Secure & instant booking
              </p>

            </div>
          </div>

        </div>
      </>
    )}

  </div>
)
}

export default Eventdetail
