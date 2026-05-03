import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOtp from "../pages/VerifyOtp";

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
    <div
  onClick={() => setOpenAuth(false)}
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
>
  <div
    onClick={(e) => e.stopPropagation()}
    className="bg-white w-[400px] max-w-[90%] p-6 rounded-xl shadow-lg relative"
  >

    {/* CLOSE BUTTON */}
    <button
      onClick={() => setOpenAuth(false)}
      className="absolute top-3 right-3 text-lg"
    >
      ✕
    </button>

    {authView === "login" && <Login />}
    {authView === "register" && <Register />}
    {authView === "otp" && <VerifyOtp />}

  </div>
</div>
  )
}

export default AuthModal;