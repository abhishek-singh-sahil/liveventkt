import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

const Rootlayout = () => {
  const [search, setSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  return (
    <div>
      <ScrollToTop />

      {/* ✅ SINGLE NAVBAR */}
      <Navbar
        search={search}
        setSearch={setSearch}
        isSearching={isSearching}
      />

      <div className="bg-gray-100 mt-6 px-5 pt-24">
        <Outlet context={{ search, setSearch, isSearching, setIsSearching }} />
      </div>
    </div>
  )
}

export default Rootlayout