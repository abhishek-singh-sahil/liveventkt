import React, { useEffect, useState } from 'react'
import api from '../utils/axios'
import HeroBanner from '../components/HeroBanner'
import Decor3Card from '../components/Decor3Card'
import Events from '../components/Events'
import { motion, AnimatePresence } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const Home = () => {
  // ✅ GET FROM ROOTLAYOUT (Shared Search State)
  const { search, setSearch, isSearching, setIsSearching } = useOutletContext()

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  // 🔥 NEW PAGINATION STATES
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  // 🔥 FETCH EVENTS (Upgraded for Pagination)
  const fetchEvents = async (pageNum = 1, isLoadMore = false) => {
    try {
      // Show different loaders depending on if it's the initial load or a "load more"
      if (isLoadMore) setLoadingMore(true)
      else setLoading(true)

      // Fetch with page and limit parameters
      const { data } = await api.get(`/events/allevent?search=${search}&page=${pageNum}&limit=8`)
      
      if (isLoadMore) {
        // Append new events to existing ones
        setEvents((prev) => [...prev, ...(data.events || [])])
      } else {
        // Fresh search or initial load: replace the array
        setEvents(data.events || [])
      }

      // Safely update pagination metadata
      setHasMore(data.hasMore || false)
      setPage(data.currentPage || pageNum)

    } catch (error) {
      console.log('Error fetching events', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  // 🔥 DEBOUNCE SEARCH (Always reset to page 1 on new search)
  useEffect(() => {
    setLoading(true)

    const timeoutId = setTimeout(() => {
      fetchEvents(1, false) 
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [search])

  // 🔥 CLICK OUTSIDE RESET (Improved logic)
  useEffect(() => {
    const handleClick = (e) => {
      // Only reset searching mode if search is empty and user clicks away
      if (!search && isSearching) {
        setIsSearching(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [search, isSearching, setIsSearching])

  // 🔥 LOAD MORE HANDLER
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchEvents(page + 1, true)
    }
  }

  return (
    <div className='flex flex-col min-h-screen bg-[#eef1f5]'>
      
      {/* ✅ HERO (Morphs based on isSearching state) */}
      <HeroBanner
        search={search}
        setSearch={setSearch}
        setIsSearching={setIsSearching}
        isSearching={isSearching}
      />

      <div className="max-w-7xl mx-auto w-full pb-20">
        
        {/* 🔥 DECOR CARDS (Fades out during search) */}
        <AnimatePresence>
          {!isSearching && (
            <motion.div
              initial={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Decor3Card isSearching={isSearching} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔥 EVENTS SECTION */}
        <main className="relative z-10 px-2 sm:px-0">
          {loading ? (
            <div className='flex flex-col justify-center items-center h-[40vh] gap-4'>
              <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
              <p className='text-gray-500 font-medium tracking-wide animate-pulse'>
                Finding experiences...
              </p>
            </div>
          ) : (
            <motion.div
              // 🔥 FIX: Dialed down the padding from 110px to 40px
              // This balances perfectly with the padding already inside the Events component
              animate={{
                paddingTop: isSearching ? "40px" : "0px" 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                duration: 0.5 
              }}
            >
              {/* Pass the events to the enhanced Events component */}
              <Events events={events} />

              {/* 🔥 LOAD MORE BUTTON */}
              {hasMore && events.length > 0 && (
                <div className="flex justify-center mt-4 mb-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-gray-200 text-gray-900 rounded-full font-bold shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.1)] hover:border-purple-300 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                        Loading more...
                      </>
                    ) : (
                      "Load More Events"
                    )}
                  </button>
                </div>
              )}
              
              {/* Empty State */}
              {events.length === 0 && !loading && search && (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">
                    We couldn't find any events matching "<span className="text-gray-900 font-bold">{search}</span>"
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Home