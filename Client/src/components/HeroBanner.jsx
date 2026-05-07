import React from 'react'
import bgImage1 from '../assets/darkcolbg.png'
import { Search, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const HeroBanner = ({ search, setSearch, setIsSearching, isSearching }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        height: isSearching ? 0 : 650,
        opacity: isSearching ? 0 : 1,
        marginBottom: isSearching ? 0 : 20
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        overflow: 'hidden',
        pointerEvents: isSearching ? 'none' : 'auto'
      }}
      className="w-full relative"
    >
      <div className='absolute inset-0 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bgImage1})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#111111]"></div>
      </div>

      <div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6'>
        {!isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className='flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase'>
              <Sparkles size={14} className="text-purple-400" />
              Welcome to LiveEventkt
            </div>

            <h1 className='text-white text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tighter'>
              Find Your Next <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500'>
                Unforgettable
              </span> Experience
            </h1>

            <p className='text-gray-300 text-sm sm:text-lg max-w-2xl font-medium'>
              Discover tech conferences, music festivals, and interactive workshops.
            </p>
          </motion.div>
        )}

        {/* 🔍 SEARCH BAR - layoutId matches Navbar for the transition effect */}
        <div className='mt-10 w-full max-w-2xl px-2 sm:px-0'>
          <motion.div
            layoutId='searchBar'
            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            className='flex items-center bg-white/95 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 shadow-2xl'
          >
            <Search className='text-purple-600 w-5 h-5 mr-3 shrink-0' />
            <input
              type='text'
              placeholder='Search events, artists, venues...'
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                if (value.length > 0 && !isSearching) {
                  setIsSearching(true);
                }
              }}
              className='flex-1 bg-transparent outline-none py-3 text-black placeholder-gray-500 font-bold text-sm sm:text-lg w-full'
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeroBanner