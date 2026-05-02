import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

const Rootlayout = () => {
  return (
    
    <div className=''>
      <ScrollToTop/>
      <Navbar/>
      <div className="bg-gray-100 mt-6 px-5 pt-24">
        <Outlet />
      </div>
    </div>
  )
}

export default Rootlayout
