import React, { useState, useEffect } from 'react'
import OtpStep from '../components/OtpStep'
import PaymentStep from '../components/PaymentStep'
import api from '../utils/axios'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, UserPlus, ShieldCheck, MapPin, Calendar, Loader2, AlertCircle, Ticket } from 'lucide-react'

// 🔥 Standardized Premium Input Class
const inputClass =
  'w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 ' +
  'placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/10 ' +
  'focus:border-purple-500 focus:bg-white transition-all duration-200'

const BookNow = () => {
  const { id: eventId } = useParams()
  const navigate = useNavigate()
  
  const [event, setEvent] = useState(null)
  const [loadingEvent, setLoadingEvent] = useState(true)
  
  const [bookingId, setBookingId] = useState(null)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [step, setStep] = useState('otp') // otp | payment
  
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState("")

  // 🔥 FETCH EVENT DETAILS
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${eventId}`)
        setEvent(data.event)
      } catch (err) {
        console.log('Failed to fetch event')
      } finally {
        setLoadingEvent(false)
      }
    }
    fetchEvent()
  }, [eventId])

  // 🔥 SCROLL LOCK FOR MODAL
  useEffect(() => {
    document.body.style.overflow = paymentOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [paymentOpen]);

  // 🔹 Contact (main person / booking owner)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  
  // 🔹 Ticket holders
  const [tickets, setTickets] = useState([{ firstName: '', lastName: '' }])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setCheckoutError("") // Clear error on typing
  }

  const handleTicketChange = (index, field, value) => {
    const updated = [...tickets]
    updated[index][field] = value
    setTickets(updated)
  }

  const addPerson = () => {
    setTickets([...tickets, { firstName: '', lastName: '' }])
  }

  const removePerson = index => {
    const updated = tickets.filter((_, i) => i !== index)
    setTickets(updated)
  }

  const isFormValid = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) return false
    for (let t of tickets) {
      if (!t.firstName || !t.lastName) return false
    }
    return true
  }

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true)
      setCheckoutError("")
      
      await api.post('/booking/sendotp', { email: form.email })

      setStep('otp')
      setPaymentOpen(true)
    } catch (err) {
      setCheckoutError(err.response?.data?.message || 'Failed to send verification code. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  const total = tickets.length * (event?.price || 0)

  // 🔥 LOADING STATE
  if (loadingEvent) {
    return (
      <div className="min-h-[calc(100vh-104px)] flex flex-col items-center justify-center bg-[#eef1f5]">
        <Loader2 size={32} className="text-purple-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Preparing your checkout...</p>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-[calc(100vh-104px)] flex flex-col items-center justify-center bg-[#eef1f5]">
        <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-purple-600 hover:underline">Return Home</button>
      </div>
    )
  }

  return (
    <div className='min-h-[calc(100vh-104px)] bg-[#eef1f5] py-8 lg:py-12 px-4 sm:px-6'>
      <div className='max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 lg:gap-12 items-start'>
        
        {/* 🔹 LEFT SIDE (FORM) */}
        <div className='lg:col-span-2 space-y-8'>
          
          <div>
            <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight mb-2'>Secure Checkout</h1>
            <p className="text-gray-500">Please enter your details to complete the booking.</p>
          </div>

          {/* Contact Info Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.04)] border border-gray-100">
            <h2 className='text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3'>
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs">1</span>
              Contact Information
            </h2>

            <div className='grid sm:grid-cols-2 gap-5 mb-5'>
              <input name='firstName' placeholder='First name *' onChange={handleChange} className={inputClass} />
              <input name='lastName' placeholder='Last name *' onChange={handleChange} className={inputClass} />
            </div>

            <input name='email' type="email" placeholder='Email address *' onChange={handleChange} className={`${inputClass} mb-5`} />
            <input name='phone' type="tel" placeholder='Phone number *' onChange={handleChange} className={inputClass} />
            
            <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" />
              Your tickets will be sent to this email address.
            </p>
          </div>

          {/* 🔥 Ticket Holders Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.04)] border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-6">
              <h2 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs">2</span>
                Ticket Holders
              </h2>
              <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                {tickets.length} {tickets.length === 1 ? 'Ticket' : 'Tickets'}
              </span>
            </div>

            <AnimatePresence>
              {tickets.map((ticket, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.3 }}
                  className='mb-6 bg-gray-50/50 border border-gray-100 p-5 rounded-2xl relative group'
                >
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2'>
                      <Ticket size={16} className="text-gray-400" />
                      Attendee {index + 1}
                    </h3>

                    {index !== 0 && (
                      <button
                        onClick={() => removePerson(index)}
                        className='text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-rose-50 px-2 py-1 rounded-md'
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    )}
                  </div>

                  <div className='grid sm:grid-cols-2 gap-4'>
                    <input
                      placeholder='First name *'
                      className={inputClass}
                      value={ticket.firstName}
                      onChange={e => handleTicketChange(index, 'firstName', e.target.value)}
                    />
                    <input
                      placeholder='Last name *'
                      className={inputClass}
                      value={ticket.lastName}
                      onChange={e => handleTicketChange(index, 'lastName', e.target.value)}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* ➕ Add person */}
            <button
              onClick={addPerson}
              className='flex items-center justify-center gap-2 w-full py-3.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-600 font-bold hover:bg-gray-50 hover:border-purple-300 hover:text-purple-600 transition-all duration-200'
            >
              <UserPlus size={18} />
              Add Another Ticket
            </button>
          </div>
        </div>

        {/* 🔹 RIGHT SIDE (ORDER SUMMARY) */}
        <div className='lg:sticky lg:top-24 space-y-6'>
          
          <div className='bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-purple-900/5 border border-gray-100 flex flex-col'>
            
            {/* Event Header */}
            <div className='w-full h-48 bg-gray-100 rounded-2xl mb-5 overflow-hidden relative'>
              <img src={event?.eventImg || '../assets/eventPlaceholder.jpg'} alt={event?.title} className='w-full h-full object-cover' />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-1 block">Experience</span>
                <h2 className='text-lg font-bold text-white line-clamp-2 leading-snug'>{event?.title}</h2>
              </div>
            </div>
            
            <div className="flex flex-col gap-2.5 mb-6 text-sm text-gray-600 border-b border-gray-100 pb-6">
              <div className="flex items-start gap-2.5">
                <Calendar size={16} className="text-purple-500 shrink-0 mt-0.5" />
                <span className="font-medium">
                  {event?.date ? new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'TBA'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-purple-500 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{event?.location}</span>
              </div>
            </div>

            <h2 className='text-lg font-bold text-gray-900 mb-4'>Order Summary</h2>

            <div className='flex justify-between text-sm mb-3 font-medium text-gray-600'>
              <span>{tickets.length} × General Admission</span>
              <span className="text-gray-900">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <div className='flex justify-between text-sm mb-5 font-medium text-gray-600'>
              <span>Digital Delivery</span>
              <span className="text-emerald-600">FREE</span>
            </div>

            <div className='border-t-2 border-dashed border-gray-200 pt-5 mb-6 flex justify-between items-center'>
              <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Total Amount</span>
              <span className="text-2xl font-black text-gray-900">₹{total.toLocaleString('en-IN')}</span>
            </div>

            {/* ERROR BANNER */}
            <AnimatePresence>
              {checkoutError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="bg-rose-50 text-rose-600 border border-rose-100 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2"
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{checkoutError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              disabled={!isFormValid() || checkoutLoading}
              onClick={handleCheckout}
              className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300
                ${isFormValid()
                  ? 'bg-black text-white hover:bg-gray-800 hover:shadow-lg active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              {checkoutLoading ? (
                <><Loader2 size={18} className="animate-spin" /> Processing...</>
              ) : (
                'Proceed to Payment'
              )}
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-4">By proceeding, you agree to our Terms & Conditions.</p>
          </div>
        </div>
      </div>

      {/* 🔥 MODAL OVERLAY */}
      <AnimatePresence>
        {paymentOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPaymentOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* MODAL CONTENT */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl z-10 overflow-hidden"
            >
              {step === "otp" ? (
                <OtpStep
                  setStep={setStep}
                  eventId={eventId}
                  setBookingId={setBookingId}
                  contact={form}
                  attendees={tickets}
                  setPaymentOpen={setPaymentOpen}
                />
              ) : (
                <PaymentStep
                  setPaymentOpen={setPaymentOpen}
                  bookingId={bookingId}
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default BookNow