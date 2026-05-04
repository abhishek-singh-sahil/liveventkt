import React, { useEffect, useState } from 'react'
import api from '../utils/axios'
import HeroBanner from '../components/HeroBanner'
import Decor3Card from '../components/Decor3Card'
import Events from '../components/Events'
import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'

const Home = () => {
  // ✅ GET FROM ROOTLAYOUT (DO NOT REDECLARE)
  const { search, setSearch, isSearching, setIsSearching } = useOutletContext()

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  // 🔥 FETCH EVENTS
  const fetchEvents = async () => {
    try {
      const { data } = await api.get(`/events/allevent?search=${search}`)
      setEvents(data.events)
    } catch (error) {
      console.log('Error fetching events', error)
    } finally {
      setLoading(false)
    }
  }

  // 🔥 DEBOUNCE SEARCH
  useEffect(() => {
    setLoading(true)

    const timeoutId = setTimeout(() => {
      fetchEvents()
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [search])

  // 🔥 CLICK OUTSIDE RESET
  useEffect(() => {
  const handleClick = (e) => {
    // Only reset if input is empty AND click is outside search
    if (!search) {
      setIsSearching(false)
    }
  }

  document.addEventListener('click', handleClick)
  return () => document.removeEventListener('click', handleClick)
}, [search])

  return (
    <div className='flex flex-col min-h-screen gap-0'>
      {/* ✅ HERO (DO NOT REMOVE — animate instead) */}
      <HeroBanner
        search={search}
        setSearch={setSearch}
        setIsSearching={setIsSearching}
        isSearching={isSearching}
      />

      <motion.div
        animate={{
          opacity: isSearching ? 0 : 1,
          y: isSearching ? 50 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <Decor3Card isSearching={isSearching} />
      </motion.div>

      {/* EVENTS */}
      {loading ? (
        <div className='flex justify-center items-center h-40'>
          <p className='text-xl font-semibold'>Loading events...</p>
        </div>
      ) : (
        <motion.div
          animate={{
            y: isSearching ? -120 : 0
          }}
          transition={{ duration: 0.4 }}
        >
          <Events events={events} />
        </motion.div>
      )}
    </div>
  )
}

export default Home
