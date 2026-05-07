import React, { useEffect, useState } from 'react'
import placeholder from "../assets/eventPlaceholder.jpg";
import api from '../utils/axios'
import NoBookings from './NoBookings'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Ticket, Loader2, ExternalLink } from 'lucide-react' // 🔥 Imported premium icons

const BookingList = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/booking/my', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setBookings(data.bookings || [])
      } catch (err) {
        console.log('Error fetching bookings')
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  // 🔥 PREMIUM LOADING STATE
  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center h-[50vh] gap-3'>
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <p className='text-gray-500 font-medium animate-pulse'>Fetching your tickets...</p>
      </div>
    )
  }

  // 🔥 EMPTY STATE
  if (!bookings.length) {
    return <NoBookings />
  }

  // 🔥 UPGRADED STATUS LABEL FUNCTION (Modern Pastel Badges)
  const getStatus = b => {
    if (b.Bookingstatus === 'cancelled' || b.paymentStatus === 'rejected')
      return { text: 'Cancelled', color: 'bg-rose-50 text-rose-700 border-rose-200' }

    if (b.paymentStatus === 'paid' && b.Bookingstatus === 'confirmed') {
      return { text: 'Confirmed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
    }

    if (b.paymentStatus === 'submitted') {
      return { text: 'Verifying', color: 'bg-amber-50 text-amber-700 border-amber-200' }
    }

    return { text: 'Payment Pending', color: 'bg-gray-100 text-gray-600 border-gray-200' }
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-10">
      
      <div className="flex items-center gap-3 mb-6">
        <Ticket className="text-purple-600" size={24} />
        <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>My Bookings</h2>
      </div>

      <div className='space-y-6'>
        {bookings.map(b => {
          const status = getStatus(b)

          return (
            <div
              key={b._id}
              className='bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group'
            >
              {/* 🔥 TICKET HEADER (Order Meta) */}
              <div className='bg-gray-50/80 px-5 py-3 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0'>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${status.color}`}>
                    {status.text}
                  </span>
                  <span className='text-xs text-gray-400 font-mono'>
                    ID: {b._id.slice(-8).toUpperCase()} {/* Sliced ID for cleaner look */}
                  </span>
                </div>
                
                <span className='text-xs font-medium text-gray-500'>
                  Booked on {new Date(b.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>

              {/* 🔥 TICKET BODY (Event Details) */}
              <div className='p-5 flex flex-col sm:flex-row justify-between gap-5 sm:gap-6'>
                
                {/* LEFT SIDE: Image + Details */}
                <div className='flex gap-4 sm:gap-5 items-start'>
                  
                  {/* Event Thumbnail */}
                  <div className="shrink-0 relative overflow-hidden rounded-xl w-24 h-24 sm:w-28 sm:h-28 border border-gray-100">
                    <img
                      src={b.eventId?.eventImg || placeholder}
                      onError={e => (e.target.src = placeholder)}
                      alt='event'
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>

                  {/* Event Info */}
                  <div className="flex flex-col justify-center h-full space-y-1.5">
                    <h3 className='font-bold text-gray-900 text-lg sm:text-xl leading-tight line-clamp-2'>
                      {b.eventId?.title || 'Event Unavailable'}
                    </h3>

                    <div className="flex flex-col gap-1.5 mt-1">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <MapPin size={14} className="text-gray-400 shrink-0" />
                        <span className="truncate max-w-[200px] sm:max-w-xs">{b.eventId?.location || 'Location TBA'}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Calendar size={14} className="text-gray-400 shrink-0" />
                        <span>{b.eventId?.date ? new Date(b.eventId.date).toDateString() : 'Date TBA'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE: Price & Action */}
                <div className='flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 shrink-0'>
                  
                  <div className="flex flex-col items-start sm:items-end">
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Amount</span>
                    <span className='text-lg sm:text-2xl font-bold text-black'>
                      ₹{b.amount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/event/${b.eventId?._id}`)}
                    className='flex items-center justify-center gap-2 border border-gray-200 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors w-full sm:w-auto text-gray-700'
                  >
                    View Details
                    <ExternalLink size={14} className="text-gray-400" />
                  </button>
                </div>

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookingList