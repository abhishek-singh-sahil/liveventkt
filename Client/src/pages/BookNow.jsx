import React, { useState } from 'react'
import OtpStep from '../components/OtpStep'
import PaymentStep from '../components/PaymentStep'
import api from '../utils/axios'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const inputClass =
  'w-full px-5 py-3 rounded-full border border-gray-300 bg-[#F9F7FF] text-sm ' +
  'placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 ' +
  'focus:bg-[#FAFBFF] transition-all duration-200'

const BookNow = () => {
  const { id: eventId } = useParams()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${eventId}`)
        setEvent(data.event)
      } catch (err) {
        console.log('Failed to fetch event')
      }
    }

    fetchEvent()
  }, [eventId])

  const [bookingId, setBookingId] = useState(null)
  const [paymentOpen, setPaymentOpen] = useState(false)
useEffect(() => {
  if (paymentOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [paymentOpen]);

  const [step, setStep] = useState('otp') // otp | payment
  // 🔹 Contact (main person / booking owner)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const isFormValid = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone)
      return false

    for (let t of tickets) {
      if (!t.firstName || !t.lastName) return false
    }

    return true
  }

  const handleCheckout = async () => {
    try {
      await api.post(
        '/booking/sendotp', // ✅ correct route
        {
          email: form.email // ✅ IMPORTANT
        }
      )

      setPaymentOpen(true)
      setStep('otp')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send OTP')
      setPaymentOpen(false)
    }
  }
  // 🔹 Ticket holders
  const [tickets, setTickets] = useState([{ firstName: '', lastName: '' }])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
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

  const total = tickets.length * (event?.price || 0)

  return (
    <div className='min-h-screen bg-[#f7f7f7] '>
      <div className=' bg-white rounded-xl shadow-sm grid md:grid-cols-3 p-4 gap-8'>
        {/* 🔹 LEFT SIDE */}
        <div className='md:col-span-2'>
          <h1 className='text-2xl font-semibold mb-6'>Checkout</h1>

          {/* Contact */}
          <h2 className='text-lg font-medium mb-4'>Contact information</h2>

          <div className='grid md:grid-cols-2 gap-4 mb-4'>
            <input
              name='firstName'
              placeholder='First name*'
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name='lastName'
              placeholder='Last name*'
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <input
            name='email'
            placeholder='Email address*'
            onChange={handleChange}
            className={`${inputClass} mb-4`}
          />

          <input
            name='phone'
            placeholder='Phone number*'
            onChange={handleChange}
            className={`${inputClass} mb-8`}
          />

          {/* 🔥 Ticket Holders */}
          <h2 className='text-lg font-medium mb-4'>Ticket Holders</h2>

          {tickets.map((ticket, index) => (
            <div key={index} className='mb-6'>
              <div className='flex justify-between items-center mb-2'>
                <h3 className='text-sm font-semibold text-gray-700'>
                  Person {index + 1}
                </h3>

                {index !== 0 && (
                  <button
                    onClick={() => removePerson(index)}
                    className='text-xs text-red-500 hover:underline'
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <input
                  placeholder='First name*'
                  className={inputClass}
                  value={ticket.firstName}
                  onChange={e =>
                    handleTicketChange(index, 'firstName', e.target.value)
                  }
                />
                <input
                  placeholder='Last name*'
                  className={inputClass}
                  value={ticket.lastName}
                  onChange={e =>
                    handleTicketChange(index, 'lastName', e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          {/* ➕ Add person */}
          <button
            onClick={addPerson}
            className='text-sm text-purple-600 font-medium hover:underline'
          >
            + Add another person
          </button>
        </div>

        {/* 🔹 RIGHT SIDE */}
        <div className='bg-white p-4 md:p-5 rounded-xl shadow-sm h-fit sticky top-24'>
          <div className='w-full h-48 bg-gray-200 rounded mb-4 overflow-hidden'>
            <img
              src={event?.eventImg}
              alt='event'
              className='w-full h-full object-cover'
            />
          </div>
          <h2 className='text-md font-semibold mb-2'>{event?.title}</h2>
          <h2 className='text-lg font-semibold mb-4'>Order summary</h2>

          <div className='flex justify-between text-sm mb-2'>
            <span>{tickets.length} × General Admission</span>
            <span>₹{total}</span>
          </div>

          <div className='flex justify-between text-sm mb-4'>
            <span>Delivery - eTicket</span>
            <span>₹0</span>
          </div>

          <hr className='mb-4' />

          <div className='flex justify-between font-semibold mb-6'>
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            disabled={!isFormValid()}
            onClick={handleCheckout}
            className={`w-full py-3 rounded-lg transition 
    ${
      isFormValid()
        ? 'bg-black text-white hover:opacity-90'
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }`}
          >
            Checkout
          </button>
        </div>
      </div>
      {paymentOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    {/* OVERLAY */}
    <div
      onClick={() => setPaymentOpen(false)}
      className="absolute inset-0 bg-black/50"
    />

    {/* MODAL */}
    <div className="relative w-full max-w-xl md:max-w-2xl mx-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">

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

      </div>
    </div>

  </div>
)}
    </div>
  )
}

export default BookNow
