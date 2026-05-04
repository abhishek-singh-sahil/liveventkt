import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOtp from "../pages/VerifyOtp";
// 🔥 IMPORT THE NEW COMPONENT
import ForgotPassword from "../pages/ForgotPassword"; 

const AuthModal = () => {
  const {
    openAuth,
    setOpenAuth,
    authView,
    setAuthView,
    authEmail,
    setAuthEmail
  } = useContext(AuthContext)

  if (!openAuth) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[400px] max-w-[90%] p-6 rounded-xl shadow-lg relative"
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpenAuth(false)}
          className="cursor-pointer absolute top-3 right-3 text-lg text-gray-500 hover:text-black transition"
        >
          ✕
        </button>

        {/* 🔥 DYNAMIC RENDERING */}
        {authView === "login" && <Login />}
        {authView === "register" && <Register />}
        {authView === "otp" && <VerifyOtp />}
        {authView === "forgot-password" && <ForgotPassword />}

      </div>
    </div>
  )
}

export default AuthModal;