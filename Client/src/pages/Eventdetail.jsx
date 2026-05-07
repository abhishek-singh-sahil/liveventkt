import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../utils/axios'
import { AuthContext } from "../context/AuthContext"
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Tag, 
  Info, 
  Ticket, 
  ShieldCheck, 
  Flame, 
  Loader2,
  Share2
} from 'lucide-react'

const Eventdetail = () => {
  const { user, setOpenAuth, setAuthView } = useContext(AuthContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  const findevent = async () => {
    try {
      const { data } = await api.get(`/events/${id}`)
      setEvent(data.event)
    } catch (error) {
      console.log("Error fetching event", error)
    } finally {
      setLoading(false)
    }
  }

  // 🔥 UPDATED BOOKING LOGIC
  const handlebooking = () => {
    if (!user) {
      setAuthView("login")   // 🔥 ensure login screen
      setOpenAuth(true)      // 🔥 open global modal
    } else {
      navigate(`/book/${id}`)
    }
  }

  useEffect(() => {
    setLoading(true)
    const timeoutId = setTimeout(() => {
      findevent()
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-104px)] flex flex-col justify-center items-center bg-[#eef1f5]">
        <Loader2 size={36} className="text-purple-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Loading experience details...</p>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-[calc(100vh-104px)] flex flex-col justify-center items-center bg-[#eef1f5]">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
          <Ticket size={32} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Event Not Found</h2>
        <p className="text-gray-500 mt-2 mb-6 text-center max-w-sm">This event may have been cancelled, removed, or the link is invalid.</p>
        <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors">
          Explore Other Events
        </button>
      </div>
    )
  }

  // Capacity Math for FOMO Bar
  const total = event.totalSeats || 1; 
  const available = event.availableSeats || 0;
  const percentAvailable = Math.max(0, Math.min(100, (available / total) * 100));
  const isSellingFast = percentAvailable <= 20 && available > 0;
  const isSoldOut = available === 0;

  return (
    <div className="bg-[#eef1f5] min-h-screen pb-20">
      
      {/* 🔥 CINEMATIC HERO */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-gray-900">
        <img 
          src={event.eventImg || '/eventPlaceholder.jpg'} 
          alt={event.title} 
          onError={(e) => (e.target.src = '/eventPlaceholder.jpg')}
          className="w-full h-full object-cover opacity-80" 
        />
        
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white max-w-3xl"
            >
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <Tag size={12} className="text-purple-400" />
                {event.category || 'General Event'}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight leading-[1.1]">
                {event.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-300 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-purple-400" />
                  <span>
                    {event.date ? new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Date TBA'}
                  </span>
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-purple-400" />
                  <span>{event.location || 'Location TBA'}</span>
                </div>
              </div>
            </motion.div>

            {/* Share Button */}
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors shrink-0"
            >
              <Share2 size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-10 grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">

        {/* 🔹 LEFT COLUMN */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 flex flex-col gap-8"
        >
          {/* About Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Info size={24} className="text-purple-600" />
              About This Experience
            </h2>
            <div className="prose prose-purple max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
              {event.description || "No description provided for this event."}
            </div>
          </div>

          {/* Guidelines / Important Info */}
          <div className="bg-purple-50/50 rounded-3xl p-6 sm:p-10 border border-purple-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck size={22} className="text-purple-600" />
              Important Information
            </h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                Please arrive at least 30 minutes prior to the event start time.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                Tickets are strictly non-transferable and non-refundable.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                Please carry a valid government-issued ID for entry verification.
              </li>
            </ul>
          </div>
        </motion.div>

        {/* 🔹 RIGHT COLUMN (STICKY CTA CARD) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:sticky lg:top-24 h-fit"
        >
          <div className="bg-white rounded-3xl shadow-2xl shadow-purple-900/5 border border-gray-100 p-6 sm:p-8 flex flex-col gap-6">

            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Price</h2>
              <div className="text-4xl font-black text-gray-900">
                {event.price === 0 || !event.price ? (
                  <span className="text-emerald-600">FREE</span>
                ) : (
                  <>₹{event.price.toLocaleString('en-IN')}</>
                )}
              </div>
            </div>

            {/* 🔥 FOMO CAPACITY BAR */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className={`text-sm font-bold uppercase tracking-wider ${isSoldOut ? 'text-rose-500' : isSellingFast ? 'text-orange-500 flex items-center gap-1' : 'text-gray-700'}`}>
                  {isSoldOut ? 'Sold Out' : isSellingFast ? <><Flame size={16}/> Selling Fast</> : 'Available Seats'}
                </span>
                <span className='text-sm font-bold text-gray-900'>
                  {available} <span className="text-gray-400 font-medium">/ {total}</span>
                </span>
              </div>
              
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${isSoldOut ? 'bg-rose-500' : isSellingFast ? 'bg-orange-500' : 'bg-purple-500'}`}
                  style={{ width: `${100 - percentAvailable}%` }}
                />
              </div>
            </div>

            {/* 🔥 MAIN ACTION BUTTON */}
            <button
              onClick={handlebooking}
              disabled={isSoldOut}
              className={`mt-2 w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md
                ${isSoldOut 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                  : 'bg-black text-white hover:bg-gray-800 hover:shadow-xl active:scale-[0.98]'
                }`}
            >
              <Ticket size={18} />
              {isSoldOut ? 'Tickets Unavailable' : 'Book Now'}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <ShieldCheck size={14} className="text-emerald-500" />
              100% Secure Checkout
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Eventdetail