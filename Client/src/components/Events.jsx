import React from 'react'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Events = ({ events }) => {
  return (
    <div className='flex flex-col gap-10 px-6 md:px-10 py-10'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-black text-2xl md:text-3xl'>
          Upcoming Events
        </h2>
        <h5 className='text-md md:text-lg text-gray-600'>
          {events.length} results found
        </h5>
      </div>

      {/* Content */}
      {events.length === 0 ? (
        <div className='text-center py-20 text-xl text-gray-500'>
          No events found.
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {events.map(event => (
            <Link to={`/event/${event._id}`} key={event._id}>
              <div className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col'>
                {/* Image */}
                <div className='h-48 overflow-hidden relative'>
                  <img
                    src={`${event.eventImg}?w=400&q=80`}
                    alt="Event"
                    loading='lazy'
                    onError={e => (e.target.src = '/eventPlaceholder.jpg')}
                    className='w-full h-full object-cover'
                  />

                  {/* Price Badge */}
                  <div className='absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow'>
                    {event.price === 0 ? (
                      <span className='text-green-600'>FREE</span>
                    ) : (
                      <span>₹{event.price}</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className='p-5 flex flex-col flex-grow'>
                  {/* Category */}
                  <span className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>
                    {event.category}
                  </span>

                  {/* Title */}
                  <h3 className='text-lg font-bold text-gray-800 mb-2 line-clamp-2'>
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className='text-sm text-gray-500 mb-4 line-clamp-2'>
                    {event.description}
                  </p>

                  {/* Info */}
                  <div className='flex flex-col gap-2 text-sm text-gray-600 mb-4'>
                    <div className='flex items-center gap-2'>
                      <FaCalendarAlt className='text-gray-400' />
                      <span>
                        {new Date(event.date).toLocaleDateString(undefined, {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className='flex items-center gap-2'>
                      <FaMapMarkerAlt className='text-gray-400' />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Seats */}
                  <div className='mb-4'>
                    <span className='text-sm text-gray-500'>
                      {event.availableSeats} / {event.totalSeats} seats left
                    </span>
                  </div>

                  {/* Button */}
                  <button className='mt-auto bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition'>
                    Book Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Events
