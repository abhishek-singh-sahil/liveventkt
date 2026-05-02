import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const MyProfile = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  // 🔥 Active + Normal styling
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
      isActive
        ? 'bg-gray-100 text-red-500 font-medium'
        : 'hover:bg-gray-100 text-gray-700'
    }`

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-[#f5f5f5] flex'>
      {/* 🔥 LEFT SIDEBAR */}
      <div className='w-72 bg-white border-r p-6 hidden md:block'>
        <h2 className='text-xl font-semibold mb-6'>My Account</h2>

        <div className='space-y-3 text-sm'>
          {/* PROFILE */}
          <NavLink to='/my-profile' end className={linkClass}>
            👤 <span>Profile</span>
          </NavLink>

          {/* BOOKINGS */}
          <NavLink to='/my-profile/my-bookings' className={linkClass}>
            📄 <span>Your Orders</span>
          </NavLink>

          {/* SAVED DEVICES */}
          <NavLink to='/my-profile/saved-devices' className={linkClass}>
            💻 <span>Saved Devices</span>
          </NavLink>

          {/* STREAM */}
          <NavLink to='/my-profile/stream' className={linkClass}>
            🎬 <span>Stream Library</span>
          </NavLink>

          {/* PAYMENTS */}
          <NavLink to='/my-profile/payments' className={linkClass}>
            💳 <span>QuikPay</span>
          </NavLink>

          <hr />

          {/* LOGOUT */}
          <div
            onClick={handleLogout}
            className='flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer'
          >
            🚪 <span>Sign Out</span>
          </div>
        </div>
      </div>

      {/* 🔥 RIGHT CONTENT */}
      <div className='flex-1 p-6'>
        <Outlet />
      </div>
    </div>
  )
}

export default MyProfile
