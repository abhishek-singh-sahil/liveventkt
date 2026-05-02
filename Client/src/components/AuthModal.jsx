import React, { useEffect } from 'react'
import Login from '../pages/Login'
import { useState } from 'react'
import VerifyOtp from '../pages/VerifyOtp'
import Register from '../pages/Register'

const AuthModal = ({ open, setOpen }) => {
  const [view, setView] = useState('login') // login | otp
  const [email, setEmail] = useState('')
  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  useEffect(() => {
    if (open) {
      setView('login')
      setEmail('')
    }
  }, [open])

  if (!open) return null

  return (
    <div
      onClick={() => setOpen(false)}
      className='fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/40 backdrop-blur-sm'
    >
      {/* Modal Box */}
      <div
        onClick={e => e.stopPropagation()}
        className='bg-white w-[400px] p-6 rounded-xl shadow-lg relative'
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className='absolute top-3 right-3 text-lg'
        >
          ✕
        </button>

        {/* Placeholder */}
        <div className='mt-4 text-center text-gray-500'>
          {view === 'login' && (
            <Login setOpen={setOpen} setView={setView} setEmail={setEmail} />
          )}

          {view === 'register' && (
            <Register setView={setView} setEmail={setEmail} />
          )}

          {view === 'otp' && (
            <VerifyOtp setOpen={setOpen} email={email} setView={setView} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthModal
