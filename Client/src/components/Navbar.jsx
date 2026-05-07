import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import AuthModal from './AuthModal'
import { Menu, TrendingUp } from 'lucide-react'
import Sidebar from './Sidebar'
import GuestSidebar from './GuestSidebar'
import { motion, AnimatePresence } from 'framer-motion'
import { MdOutlineSearch } from 'react-icons/md'

// 🔥 IMPORT YOUR LOGO HERE
import logoImg from '../assets/full-logo.png' 

const Navbar = ({ search, setSearch, isSearching }) => {
  const { setOpenAuth, setAuthView, user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const inputRef = useRef(null)

  const isAuthenticated = !!user?.token

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (isSearching) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isSearching])

  return (
    <>
      <div className='w-full fixed top-0 z-50 bg-[#eef1f5]/90 backdrop-blur-md shadow-sm border-b border-gray-200/60'>
        
        {/* 🔹 TOP ROW */}
        <div className='max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2.5 gap-2 xs:gap-3'>
          
          {/* 🔥 LOGO - Explicitly shrinks width by 25% on mobile */}
          <Link to='/' className='flex items-center shrink-0'>
            <img 
              src={logoImg} 
              alt="LivEventkt"
              className={`object-contain transition-all duration-300 ease-in-out origin-left
                /* Desktop/Tablet: Fixed standard size */
                sm:h-9 md:h-10 sm:w-auto
                /* Mobile: Shrinks width by ~25% (100px -> 75px) to give search bar more room */
                ${isSearching ? 'w-[75px] xs:w-[90px] h-5 xs:h-6' : 'w-[100px] xs:w-[120px] h-8'}
              `}
            />
          </Link>

          {/* 🔥 CENTER SEARCH - Removed mobile max-width so it grows organically! */}
          <div className={`flex items-center justify-center transition-all duration-300 ${isSearching ? 'flex-1 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
            <AnimatePresence>
              {isSearching && (
                <motion.div
                  layoutId='searchBar'
                  /* Notice how there is no max-w on mobile anymore. 
                     Because the parent is 'flex-1', it will automatically stretch 
                     to take the exact space given up by the shrinking logo! 
                  */
                  className='flex items-center bg-white border border-gray-200 rounded-full px-3 sm:px-4 py-1.5 w-full sm:max-w-[400px] shadow-sm'
                >
                  <MdOutlineSearch className='text-gray-500 text-lg sm:text-xl mr-1.5 sm:mr-2 shrink-0' />
                  <input
                    ref={inputRef}
                    type='text'
                    value={search}
                    placeholder="Search events..."
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 bg-transparent outline-none py-1 text-xs sm:text-sm text-black placeholder-gray-400 w-full min-w-0'
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 🔹 RIGHT SIDE */}
          <div className={`flex items-center shrink-0 transition-all duration-300 ${isSearching ? 'gap-1.5' : 'gap-2 sm:gap-4'}`}>
            {isAuthenticated ? (
              <>
                {user?.accountType === 'admin' && !isSearching && (
                  <button onClick={() => navigate('/admin')} className='px-3 py-2 rounded-md text-xs bg-black text-white hidden sm:block'>
                    Dashboard
                  </button>
                )}
                <button className='cursor-pointer flex items-center gap-2 p-1 sm:px-3 sm:py-2 rounded-full hover:bg-gray-400/20 transition' onClick={() => setSidebarOpen(true)}>
                  <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold shadow-sm text-xs'>
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  {!isSearching && <span className='text-sm text-gray-800 font-medium hidden lg:block'>Hi, {user?.name?.split(' ')[0]}</span>}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setAuthView('login'); setOpenAuth(true); }}
                  className={`cursor-pointer bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-md transition-all duration-200 shrink-0 ${isSearching ? 'px-3 py-1.5 text-[10px]' : 'px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm'}`}
                >
                  {isSearching ? 'Join' : 'Get Started'}
                </button>
                <button onClick={() => setSidebarOpen(true)} className='p-1.5 rounded-md hover:bg-gray-400/20 text-gray-800'>
                  <Menu size={20} className="sm:w-6 sm:h-6" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* 🔹 BOTTOM ROW: TYPOGRAPHIC STREAM */}
        <div className='bg-[#111111] border-t border-black relative'>
          <div className='max-w-7xl mx-auto flex items-center px-4 sm:px-6 py-2.5 sm:py-3 overflow-x-auto hide-scrollbar'>
            
            <div className="flex items-center gap-2 mr-6 sm:mr-8 text-gray-400 shrink-0">
              <TrendingUp size={16} className="text-purple-500" />
              <span className='text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-300'>Trending</span>
            </div>

            <div className='flex items-center gap-5 sm:gap-6 cursor-default whitespace-nowrap pr-8'>
              <span className='text-gray-400 text-xs sm:text-sm font-medium tracking-wide transition-colors hover:text-gray-200'>
                Coldplay Tribute
              </span>
              
              <span className='w-1 h-1 rounded-full bg-gray-700 shrink-0'></span>
              
              <span className='text-gray-400 text-xs sm:text-sm font-medium tracking-wide transition-colors hover:text-gray-200'>
                Tech Innovators 2026
              </span>
              
              <span className='w-1 h-1 rounded-full bg-gray-700 shrink-0'></span>
              
              <span className='text-gray-400 text-xs sm:text-sm font-medium tracking-wide transition-colors hover:text-gray-200'>
                Standup Specials
              </span>
              
              <span className='w-1 h-1 rounded-full bg-gray-700 shrink-0'></span>
              
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5'>
                <span className="text-[10px] sm:text-sm">🔥</span> IPL Screenings
              </span>
              
              <span className='w-1 h-1 rounded-full bg-gray-700 shrink-0 hidden md:block'></span>
              
              <span className='text-gray-400 text-xs sm:text-sm font-medium tracking-wide transition-colors hover:text-gray-200 hidden md:block'>
                Weekend Workshops
              </span>
            </div>
          </div>

          {/* 🔥 UPGRADE: Smooth gradient fade on the right edge to indicate horizontal scrolling on mobile */}
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#111111] to-transparent pointer-events-none"></div>
        </div>
      </div>

      <AuthModal open={false} setOpen={setOpenAuth} />

      {isAuthenticated ? (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} user={user} logout={handleLogout} />
      ) : (
        <GuestSidebar open={sidebarOpen} setOpen={setSidebarOpen} setAuthOpen={setOpenAuth} />
      )}
    </>
  )
}

export default Navbar