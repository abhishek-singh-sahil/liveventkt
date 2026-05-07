import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Loader2 } from 'lucide-react'

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

/* 🔥 ADMIN PANEL */
import AdminPanel from './pages/AdminDashboard' // Ensure the path matches where you saved it

/* 🔥 AUTH */
import ProtectedRoute from './components/ProtectedRoute'
import AuthModal from './components/AuthModal'
import Support from './components/Support'

const App = () => {
  const { loading } = useContext(AuthContext)

  // 🔥 UPGRADED: Premium Full-Screen Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-[#eef1f5] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold text-black tracking-tight animate-pulse">
            Liv<span className="text-purple-600">Eventkt</span>
          </h1>
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
            <span className="text-sm font-medium tracking-wide">Securely authenticating...</span>
          </div>
        </div>
      </div>
    )
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* 🔹 CONSUMER APP (Uses RootLayout with standard Navbar & Footer) */}
        <Route path='/' element={<Rootlayout />}>
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
            <Route index element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path='my-bookings' element={<ProtectedRoute><BookingList /></ProtectedRoute>} />
            <Route path='saved-devices' element={<ProtectedRoute><div className="p-6 text-gray-500">Saved Devices Content</div></ProtectedRoute>} />
            <Route path='stream' element={<ProtectedRoute><div className="p-6 text-gray-500">Stream Library Content</div></ProtectedRoute>} />
            <Route path='payments' element={<ProtectedRoute><div className="p-6 text-gray-500">Payments Content</div></ProtectedRoute>} />
            
            {/* 🟢 PUBLIC */}
            <Route path='notifications' element={<Notifications />} />
            <Route path='rewards' element={<Rewards />} />
            <Route path='support' element={<Support/>} />
          </Route>

          <Route path='update-email' element={<ProtectedRoute><UpdateEmail /></ProtectedRoute>} />
        </Route>

        {/* 🔹 ADMIN APP (Completely separate from RootLayout so it has its own Sidebar) */}
        <Route 
          path='/admin' 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
      {/* 🔥 GLOBAL AUTH MODAL */}
      <AuthModal />
    </>
  )
}

export default App