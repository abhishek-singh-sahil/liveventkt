import React from 'react'
import { Calendar, MapPin, Ticket, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'

const Events = ({ events = [] }) => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-12 lg:pt-6 lg:pb-16'>
      {/* 🔥 FIX: Changed top padding (pt) to be much smaller than bottom padding (pb) */}
      
      {/* 🔥 HEADER */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10'>
        <div>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>
            Upcoming Experiences
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Discover and book the best events happening around you.
          </p>
        </div>
        <div className='bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-bold tracking-wide border border-purple-100 shrink-0 self-start sm:self-auto'>
          {events?.length || 0} {events?.length === 1 ? 'Event' : 'Events'} Found
        </div>
      </div>

      {/* 🔥 CONTENT LOGIC */}
      {events.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm'>
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Ticket size={32} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No events found</h3>
          <p className='text-gray-500 mt-2 text-center max-w-sm'>
            We couldn't find any upcoming events right now. Check back later for new experiences!
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
          {events.map(event => {
            // Safe Math for Visual Bar
            const total = event.totalSeats || 1;
            const available = event.availableSeats || 0;
            const percentAvailable = (available / total) * 100;
            const isSellingFast = percentAvailable <= 20 && available > 0;
            const isSoldOut = available === 0;

            return (
              <Link 
                to={`/event/${event._id}`} 
                key={event._id}
                className='group bg-white rounded-2xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col border border-gray-100'
              >
                {/* 🖼️ IMAGE WRAPPER */}
                <div className='h-52 overflow-hidden relative bg-gray-100'>
                  <img
                    src={event.eventImg ? `${event.eventImg}?w=500&q=80` : '/eventPlaceholder.jpg'}
                    alt={event.title}
                    loading='lazy'
                    onError={e => (e.target.src = '/eventPlaceholder.jpg')}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl text-sm font-extrabold shadow-sm border border-white/20'>
                    {event.price === 0 ? (
                      <span className='text-emerald-600 uppercase tracking-wider text-xs'>Free Entry</span>
                    ) : (
                      <span className="text-gray-900">₹{event.price?.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>

                {/* 📝 CONTENT WRAPPER */}
                <div className='p-5 flex flex-col flex-grow'>
                  <h3 className='text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors'>
                    {event.title}
                  </h3>

                  <div className='flex flex-col gap-2.5 text-sm text-gray-600 mt-2 mb-6'>
                    <div className='flex items-start gap-2.5'>
                      <Calendar size={16} className='text-purple-500 shrink-0 mt-0.5' />
                      <span className="font-medium">
                        {event.date ? new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'
                        }) : 'Date TBA'}
                      </span>
                    </div>
                    <div className='flex items-start gap-2.5'>
                      <MapPin size={16} className='text-purple-500 shrink-0 mt-0.5' />
                      <span className="line-clamp-1">{event.location || 'Location TBA'}</span>
                    </div>
                  </div>

                  {/* Visual Capacity Bar */}
                  <div className='mt-auto mb-5'>
                    <div className="flex justify-between items-end mb-1.5">
                      <span className={`text-xs font-bold uppercase tracking-wider ${isSoldOut ? 'text-rose-500' : isSellingFast ? 'text-orange-500 flex items-center gap-1' : 'text-gray-500'}`}>
                        {isSoldOut ? 'Sold Out' : isSellingFast ? <><Flame size={12}/> Selling Fast</> : 'Available Seats'}
                      </span>
                      <span className='text-xs font-medium text-gray-900'>
                        {available} <span className="text-gray-400">/ {total}</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${isSoldOut ? 'bg-rose-500' : isSellingFast ? 'bg-orange-500' : 'bg-purple-500'}`}
                        style={{ width: `${100 - percentAvailable}%` }}
                      />
                    </div>
                  </div>

                  <div className={`w-full py-2.5 rounded-xl font-semibold text-sm text-center transition-all duration-300 ${
                    isSoldOut 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-50 text-gray-900 group-hover:bg-black group-hover:text-white border border-gray-200 group-hover:border-black'
                  }`}>
                    {isSoldOut ? 'Event Full' : 'View Event Details'}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default Events