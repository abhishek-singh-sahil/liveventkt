import { useContext, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { user, setOpenAuth, setAuthView } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      setAuthView("login")
      setOpenAuth(true)

      // 🔥 IMPORTANT: move user away from protected route
      navigate("/", { replace: true })
    }
  }, [user])

  if (!user) return null

  return children
}

export default ProtectedRoute