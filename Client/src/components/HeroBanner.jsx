import React from 'react'
import bgImage1 from '../assets/darkcolbg.png'
import { MdOutlineSearch } from 'react-icons/md'
import { motion } from 'framer-motion'

const HeroBanner = ({ search, setSearch, setIsSearching, isSearching }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        height: isSearching ? 0 : 650,
        opacity: isSearching ? 0 : 1
      }}
      transition={{ duration: 0.35 }}
      style={{
        overflow: 'hidden',
        pointerEvents: isSearching ? 'none' : 'auto'
      }}
      className="w-full rounded-2xl relative"
    >
      {/* Background */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${bgImage1})` }}
      />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-4'>

        {/* TEXT CONTENT */}
        {!isSearching && (
          <>
            <span className='bg-white/10 backdrop-blur-md text-white text-xs px-4 py-1 rounded-full mb-4'>
              WELCOME TO LIVEVENTKT
            </span>

            <h1 className='text-white text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight'>
              Find Your Next <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500'>
                Unforgettable
              </span>{' '}
              Experience
            </h1>

            <p className='mt-4 text-gray-300 text-sm sm:text-lg max-w-2xl'>
              Discover the best tech conferences, late-night music festivals and workshops.
            </p>
          </>
        )}

        {/* 🔍 SEARCH BAR */}
        <div className='mt-6 w-full max-w-xl'>
          <motion.div
            layoutId='searchBar'
            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            className='flex items-center bg-gray-200 rounded-full px-4 py-1 shadow-md'
          >
            <MdOutlineSearch className='text-gray-600 text-2xl mr-2' />

            <input
              type='text'
              placeholder='Search for event'
              value={search}
              onChange={(e) => {
                const value = e.target.value
                setSearch(value)

                // ✅ trigger ONLY once (prevents glitch)
                if (value.length === 1 && !isSearching) {
                  setIsSearching(true)
                }
              }}
              className='flex-1 bg-transparent outline-none py-3 text-black placeholder-gray-500'
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeroBanner