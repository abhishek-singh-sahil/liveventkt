import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Ticket, ShieldCheck } from 'lucide-react' // 🔥 Upgraded to premium Lucide icons

const Decor3Card = ({ isSearching }) => {
  return (
    <motion.div
      animate={{
        opacity: isSearching ? 0 : 1,
        y: isSearching ? 20 : 0,
        scale: isSearching ? 0.98 : 1 // Subtle scale down when hiding
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`w-full transition-all duration-300 ${
        isSearching ? 'py-0 h-0 overflow-hidden' : 'py-12 sm:py-16' // 🔥 Fixed invalid py-13 class
      }`}
      style={{
        pointerEvents: isSearching ? 'none' : 'auto'
      }}
    >
      {/* 🔥 UPGRADE: max-w-7xl ensures it perfectly aligns with your Navbar and Footer */}
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
        
        {/* Card 1 */}
        <div className='group bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1.5 hover:border-purple-100 transition-all duration-300 flex flex-col items-center text-center'>
          {/* 🔥 UPGRADE: Interactive Icon Box */}
          <div className='w-14 h-14 bg-gray-900 text-white group-hover:bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-colors duration-300'>
            <Zap size={24} className="group-hover:scale-110 transition-transform duration-300" />
          </div>

          <h3 className='text-lg font-bold text-gray-900 tracking-tight mb-3'>Fast Booking</h3>

          <p className='text-gray-500 text-sm leading-relaxed max-w-[280px]'>
            Secure your tickets instantly with our streamlined booking infrastructure built for speed.
          </p>
        </div>

        {/* Card 2 */}
        <div className='group bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1.5 hover:border-purple-100 transition-all duration-300 flex flex-col items-center text-center'>
          <div className='w-14 h-14 bg-gray-900 text-white group-hover:bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-colors duration-300'>
            <Ticket size={24} className="group-hover:scale-110 transition-transform duration-300" />
          </div>

          <h3 className='text-lg font-bold text-gray-900 tracking-tight mb-3'>Seamless Access</h3>

          <p className='text-gray-500 text-sm leading-relaxed max-w-[280px]'>
            Download tickets instantly or manage them right from your personal digital dashboard.
          </p>
        </div>

        {/* Card 3 - On tablet (sm), this centers nicely if there's an odd number of cards */}
        <div className='group bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1.5 hover:border-purple-100 transition-all duration-300 flex flex-col items-center text-center sm:col-span-2 lg:col-span-1 sm:max-w-md mx-auto lg:max-w-none'>
          <div className='w-14 h-14 bg-gray-900 text-white group-hover:bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-colors duration-300'>
            <ShieldCheck size={24} className="group-hover:scale-110 transition-transform duration-300" />
          </div>

          <h3 className='text-lg font-bold text-gray-900 tracking-tight mb-3'>Secure Platform</h3>

          <p className='text-gray-500 text-sm leading-relaxed max-w-[280px]'>
            All transactions and registrations are secured with modern encryption and 2FA protection.
          </p>
        </div>

      </div>
    </motion.div>
  )
}

export default Decor3Card