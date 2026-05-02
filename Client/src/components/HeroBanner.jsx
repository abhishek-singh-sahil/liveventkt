import React from 'react'
import bgImage1 from '../assets/darkcolbg.png'
import { MdOutlineSearch } from 'react-icons/md'

const HeroBanner = ({search, setSearch}) => {
  return (
    <div>
      {/* HERO / BANNER */}
      <div className='relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden rounded-3xl'>
        {/* Background Image */}
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: `url(${bgImage1})` }}
        ></div>
        <div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-4'>
          {/* Badge */}
          <span className='bg-white/10 backdrop-blur-md text-white text-xs px-4 py-1 rounded-full mb-4 tracking-wide'>
            WELCOME TO LIVEVENTKT
          </span>
          <h1 className='text-white text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg'>
            Find Your Next <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500'>
              Unforgettable
            </span>{' '}
            Experience
          </h1>
          <p className='mt-4 text-gray-300 text-sm sm:text-lg max-w-2xl'>
            Discover the best tech conferences,late-night music festivals and
            hands on workshops happening in your area, Secure your spot today.
          </p>
          <div className='mt-6 w-full max-w-xl'>
            <div className='flex items-center bg-gray-200 rounded-full px-4 py-1 shadow-md'>
              <MdOutlineSearch className='text-gray-600 text-2xl mr-2' />
              <input
                type='text'
                placeholder='Search for event'
                value={search}
                onChange={e => setSearch(e.target.value)}
                className='flex-1 bg-transparent outline-none py-3 text-black placeholder-gray-500'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
