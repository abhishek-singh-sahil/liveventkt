import React, { useEffect, useState } from 'react'
import api from '../utils/axios'
import HeroBanner from '../components/HeroBanner'
import Decor3Card from '../components/Decor3Card'
import Events from '../components/Events'

const Home = () => {
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchEvents = async () => {
    try {
      const { data } = await api.get(`/events/allevent?search=${search}`)

      console.log("API DATA:", data)

      setEvents(data.events) // fix here
    } catch (error) {
      console.log('Error fetching events', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    const timeoutId = setTimeout(() => {
      fetchEvents()
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [search])

  return (
    <div className='flex flex-col min-h-screen'>
      <HeroBanner search={search} setSearch={setSearch} />
      <Decor3Card/>
       {loading ? (
      <div className="flex justify-center items-center h-40">
        <p className="text-xl font-semibold">Loading events...</p>
      </div>
    ) : (
      <Events events={events} />
    )}

    </div>
  )
}

export default Home
