import React, { useEffect, useState } from 'react'
import placeholder from "../assets/eventPlaceholder.jpg";
import api from '../utils/axios'
import NoBookings from './NoBookings'
import { useNavigate } from 'react-router-dom'

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

  // 🔥 LOADING
  if (loading) {
    return (
      <div className='flex justify-center items-center h-40'>
        <p className='text-gray-500'>Loading your bookings...</p>
      </div>
    )
  }

  // 🔥 EMPTY
  if (!bookings.length) {
    return <NoBookings />
  }

  // 🔥 STATUS LABEL FUNCTION
  const getStatus = b => {
    if (b.Bookingstatus === 'cancelled' || b.paymentStatus === 'rejected')
      return { text: 'Cancelled', color: 'bg-red-100 text-red-600' }

    if (b.paymentStatus === 'paid' && b.Bookingstatus === 'confirmed') {
      return { text: 'Confirmed', color: 'bg-green-100 text-green-600' }
    }

    if (b.paymentStatus === 'submitted') {
      return {
        text: 'Verification Pending',
        color: 'bg-yellow-100 text-yellow-700'
      }
    }

    return { text: 'Not Paid', color: 'bg-gray-200 text-gray-600' }
  }

  return (
    <div>
      <h2 className='text-xl font-semibold mb-6'>My Bookings</h2>

      <div className='space-y-5'>
        {bookings.map(b => {
          const status = getStatus(b)

          return (
            <div
              key={b._id}
              className='bg-white border rounded-lg p-4 hover:shadow-md transition'
            >
              {/* 🔥 TOP ROW */}
              <div className='flex justify-between items-center mb-3'>
                <span
                  className={`text-xs px-3 py-1 rounded font-medium ${status.color}`}
                >
                  {status.text}
                </span>

                <span className='text-sm text-gray-500'>
                  Total: ₹{b.amount}
                </span>
              </div>

              {/* 🔥 ORDER META */}
              <div className='text-xs text-gray-500 mb-3'>
                {new Date(b.createdAt).toLocaleString()} • Order ID: {b._id}
              </div>

              <hr className='mb-4' />

              {/* 🔥 MAIN CONTENT */}
              <div className='flex justify-between items-center'>
                {/* LEFT SIDE */}
                <div className='flex gap-4 items-center'>
                  {/* IMAGE */}
                  
                  <img
                    src={b.eventId?.eventImg || placeholder}
                    onError={e => (e.target.src = placeholder)}
                    alt='event'
                    className='w-20 h-20 object-cover rounded-md'
                  />
                  {/* DETAILS */}
                  <div>
                    <h3 className='font-medium text-gray-800'>
                      {b.eventId?.title || 'Event'}
                    </h3>

                    <p className='text-sm text-gray-500'>
                      {b.eventId?.location}
                    </p>

                    <p className='text-sm text-gray-400'>
                      {new Date(b.eventId?.date).toDateString()}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className='text-right'>
                  <button
                    onClick={() => navigate(`/event/${b.eventId?._id}`)}
                    className='border px-4 py-2 text-sm rounded hover:bg-gray-100 transition'
                  >
                    View Event
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
