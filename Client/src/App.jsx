import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Rootlayout from './layouts/Rootlayout'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Eventdetail from './pages/Eventdetail'
import BookNow from './pages/BookNow'
import VerifyOtp from './pages/VerifyOtp'
import BookingPending from './pages/BookingPending'

/* 🔥 NEW IMPORTS */
import BookingList from './components/BookingList'
import MyProfile from './layouts/MyProfile'
import EditProfile from './components/EditProfile'
import UpdateEmail from './components/UpdateEmail'

const App = () => {
  const { loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        Checking user...
      </div>
    )
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Rootlayout />}>
        {/* 🔹 MAIN ROUTES */}
        <Route index element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='event/:id' element={<Eventdetail />} />
        <Route path='book/:id' element={<BookNow />} />
        <Route path='booking-pending' element={<BookingPending />} />

        {/* 🔥 MY PROFILE (NEW STRUCTURE) */}
        <Route path='my-profile' element={<MyProfile />}>
          <Route index element={<EditProfile />} />
          <Route path='my-bookings' element={<BookingList />} />
          <Route path='saved-devices' element={<div>Saved Devices</div>} />
          <Route path='stream' element={<div>Stream Library</div>} />
          <Route path='payments' element={<div>Payments</div>} />
        </Route>
        <Route path='update-email' element={<UpdateEmail/>}/>
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
