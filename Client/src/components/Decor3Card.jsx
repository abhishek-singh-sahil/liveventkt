import React from 'react'
import { FaRegClock } from 'react-icons/fa'
import { RiTicket2Line } from 'react-icons/ri'
import { FiShield } from 'react-icons/fi'

const Decor3Card = () => {
  return (
    <div className='py-13 px-4'>
      <div className='relative grid grid-cols-1 md:grid-cols-3 gap-8 mx-5'>
        {/* Card 1 */}
        <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300'>
          <div className='w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md'>
            <FaRegClock />
          </div>

          <h3 className='text-lg font-semibold mb-2'>Fast Booking</h3>

          <p className='text-gray-500 text-sm leading-relaxed'>
            Secure your tickets instantly with our fast streamlined booking
            infrastructure built for speed.
          </p>
        </div>

        {/* Card 2 */}
        <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300'>
          <div className='w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md'>
            <RiTicket2Line />
          </div>

          <h3 className='text-lg font-semibold mb-2'>Seamless Access</h3>

          <p className='text-gray-500 text-sm leading-relaxed'>
            Download tickets instantly or manage them right from your personal
            dashboard with ease.
          </p>
        </div>

        {/* Card 3 */}
        <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300'>
          <div className='w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md'>
            <FiShield />
          </div>

          <h3 className='text-lg font-semibold mb-2'>Secure Platform</h3>

          <p className='text-gray-500 text-sm leading-relaxed'>
            All transactions and registrations are secured with modern
            encryption and 2FA protection.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Decor3Card
