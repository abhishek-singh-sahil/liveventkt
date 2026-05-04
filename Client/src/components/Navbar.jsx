import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import AuthModal from './AuthModal'
import { Menu, TrendingUp } from 'lucide-react'
import Sidebar from './Sidebar'
import GuestSidebar from './GuestSidebar'
import { motion } from 'framer-motion'
import { MdOutlineSearch } from 'react-icons/md'

const Navbar = ({ search, setSearch, isSearching }) => {
  const { setOpenAuth, setAuthView } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const inputRef = useRef(null)

  const isAuthenticated = !!user?.token

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // 🔥 FIX: AUTO FOCUS WHEN SEARCH BAR COMES TO NAVBAR
  useEffect(() => {
    if (isSearching) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 200) // wait for animation
      return () => clearTimeout(timer)
    }
  }, [isSearching])

  return (
    <>
      {/* 🔴 NAVBAR */}
      {/* Changed from stark white to a premium subtle gray matching your app's theme */}
      <div className='w-full fixed top-0 z-50 bg-gray-300 shadow-sm'>
        
        {/* 🔹 TOP ROW */}
        <div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-2'>
          
          {/* Logo */}
          <Link to='/' className='text-3xl font-bold text-black tracking-tight'>
            Liv<span className='text-purple-600'>Eventkt</span>
          </Link>

          {/* 🔥 CENTER SEARCH */}
          <div className='hidden md:flex items-center justify-center flex-1'>
            {isSearching && (
              <motion.div
                layoutId='searchBar'
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                className='flex items-center bg-white border border-gray-200 rounded-full px-4 py-1.5 w-[350px] shadow-sm'
              >
                <MdOutlineSearch className='text-gray-500 text-xl mr-2' />

                <input
                  ref={inputRef}
                  type='text'
                  value={search}
                  placeholder="Search for events..."
                  onChange={(e) => setSearch(e.target.value)}
                  className='flex-1 bg-transparent outline-none py-1 text-black placeholder-gray-400'
                />
              </motion.div>
            )}
          </div>

          {/* 🔹 RIGHT SIDE */}
          <div className='flex items-center gap-5'>
            {isAuthenticated ? (
              <>
                {user?.accountType === 'admin' && (
                  <button
                    onClick={() => navigate('/admin')}
                    className='px-4 py-2 rounded-md text-sm bg-black text-white hover:opacity-90 transition'
                  >
                    Admin Dashboard
                  </button>
                )}

                <button
                  className='cursor-pointer flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50/60 transition'
                  onClick={() => setSidebarOpen(true)}
                >
                  <div className='w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold shadow-sm'>
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>

                  <span className='text-sm text-gray-800 font-medium hidden sm:block'>
                    Hi, {user?.name?.split(' ')[0]}
                  </span>
                </button>
              </>
            ) : (
              <>
                {/* 🔥 YOUR ORIGINAL EXPENSIVE BUTTON - UNTOUCHED */}
                <button
                  onClick={() => {
                    setAuthView('login')
                    setOpenAuth(true)
                  }}
                  className='cursor-pointer px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium text-sm rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2'
                >
                  Get Started
                </button>

                <button
                  onClick={() => setSidebarOpen(true)}
                  className='cursor-pointer p-2 rounded-md hover:bg-gray-200/60 transition text-gray-800'
                >
                  <Menu size={22} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* 🔹 BOTTOM ROW: TYPOGRAPHIC STREAM */}
        {/* Uses a dark background to blend perfectly into your dark hero image */}
        <div className='bg-[#111111] border-t border-black'>
          <div className='max-w-7xl mx-auto flex items-center px-6 py-3 overflow-x-auto hide-scrollbar'>
            
            <div className="flex items-center gap-2 mr-8 text-gray-400 shrink-0">
              <TrendingUp size={16} className="text-purple-500" />
              <span className='text-xs font-bold uppercase tracking-widest text-gray-300'>Trending</span>
            </div>

            {/* Pure typography, no bounding boxes. Separated by elegant dots. */}
            <div className='flex items-center gap-6 cursor-default whitespace-nowrap'>
              <span className='text-gray-400 text-sm font-medium tracking-wide transition-colors hover:text-gray-200'>
                Coldplay Tribute
              </span>
              
              <span className='w-1 h-1 rounded-full bg-gray-700 shrink-0'></span>
              
              <span className='text-gray-400 text-sm font-medium tracking-wide transition-colors hover:text-gray-200'>
                Tech Innovators 2026
              </span>
              
              <span className='w-1 h-1 rounded-full bg-gray-700 shrink-0'></span>
              
              <span className='text-gray-400 text-sm font-medium tracking-wide transition-colors hover:text-gray-200'>
                Standup Specials
              </span>
              
              <span className='w-1 h-1 rounded-full bg-gray-700 shrink-0'></span>
              
              {/* Highlighted item using text gradient instead of a background box */}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-sm font-bold tracking-wide flex items-center gap-1.5'>
                <span className="text-sm">🔥</span> IPL Screenings
              </span>
              
              <span className='w-1 h-1 rounded-full bg-gray-700 shrink-0 hidden md:block'></span>
              
              <span className='text-gray-400 text-sm font-medium tracking-wide transition-colors hover:text-gray-200 hidden md:block'>
                Weekend Workshops
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 🔥 AUTH MODAL */}
      <AuthModal open={open} setOpen={setOpen} />

      {/* 🔥 SIDEBAR */}
      {isAuthenticated ? (
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          user={user}
          logout={handleLogout}
        />
      ) : (
        <GuestSidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          setAuthOpen={setOpen}
        />
      )}
    </>
  )
}

export default Navbar