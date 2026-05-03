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
import Eventdetail from './pages/Eventdetail'
import BookNow from './pages/BookNow'
import BookingPending from './pages/BookingPending'
import Notifications from './pages/Notifications'
import Rewards from './pages/Rewards'

/* 🔥 PROFILE */
import BookingList from './components/BookingList'
import MyProfile from './layouts/MyProfile'
import EditProfile from './components/EditProfile'
import UpdateEmail from './components/UpdateEmail'

/* 🔥 AUTH */
import ProtectedRoute from './components/ProtectedRoute'
import AuthModal from './components/AuthModal'
import Support from './components/Support'

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
        {/* 🔹 MAIN */}
        <Route index element={<Home />} />
        <Route path='event/:id' element={<Eventdetail />} />

        {/* 🔒 PROTECTED */}
        <Route
          path='book/:id'
          element={
            <ProtectedRoute>
              <BookNow />
            </ProtectedRoute>
          }
        />

        <Route path='booking-pending' element={<BookingPending />} />

        {/* 🔥 PROFILE */}
        <Route path='my-profile' element={<MyProfile />}>
          {/* 🔴 INDEX (Edit Profile) → PROTECTED */}
          <Route
            index
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          {/* 🔴 PROTECTED */}
          <Route
            path='my-bookings'
            element={
              <ProtectedRoute>
                <BookingList />
              </ProtectedRoute>
            }
          />

          <Route
            path='saved-devices'
            element={
              <ProtectedRoute>
                <div>Saved Devices</div>
              </ProtectedRoute>
            }
          />

          <Route
            path='stream'
            element={
              <ProtectedRoute>
                <div>Stream Library</div>
              </ProtectedRoute>
            }
          />

          <Route
            path='payments'
            element={
              <ProtectedRoute>
                <div>Payments</div>
              </ProtectedRoute>
            }
          />

          {/* 🟢 PUBLIC */}
          <Route path='notifications' element={<Notifications />} />
          <Route path='rewards' element={<Rewards />} />
          <Route path='support' element={<Support/>} />
        </Route>

        <Route
          path='update-email'
          element={
            <ProtectedRoute>
              <UpdateEmail />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />

      {/* 🔥 GLOBAL AUTH MODAL (MOST IMPORTANT) */}
      <AuthModal />
    </>
  )
}

export default App
