import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  GraduationCap,
  Menu,
  X,
  LayoutDashboard,
  CalendarDays,
  QrCode,
  Info,
  Sun,
  Moon,
  LogOut,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../contexts/ThemeContext"

const allLinks = {
  events: { to: "/events", label: "Events", icon: <CalendarDays className="inline mr-2 h-5 w-5" /> },
  attendance: { to: "/attendance", label: "Attendance", icon: <QrCode className="inline mr-2 h-5 w-5" /> },
  about: { to: "/about", label: "About", icon: <Info className="inline mr-2 h-5 w-5" /> },
}

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // ✅ Hide Navbar on Register & Login page
  if (location.pathname === "/register" || location.pathname === "/login") {
    return null
  }

  // ✅ Get role from localStorage
  const role = (localStorage.getItem("role") || "").toLowerCase().trim()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/login")
  }

  // ✅ Role-based Dashboard path
  const getDashboardLink = () => {
    if (role === "organiser") {
      return { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="inline mr-2 h-5 w-5" /> }
    } else if (role === "attendent" || role === "attendant") {
      return { to: "/attendent-dashboard", label: "Dashboard", icon: <LayoutDashboard className="inline mr-2 h-5 w-5" /> }
    } else if (role === "volunteer") {
      return { to: "/volunteer-dashboard", label: "Dashboard", icon: <LayoutDashboard className="inline mr-2 h-5 w-5" /> }
    } else {
      return { to: "/", label: "Dashboard", icon: <LayoutDashboard className="inline mr-2 h-5 w-5" /> }
    }
  }

  // ✅ Role-based links
  const getLinksByRole = () => {
    const dashboardLink = getDashboardLink()

    if (role === "organiser") {
      // 🔹 Organiser ko ab Attendance bhi milega
      return [dashboardLink, allLinks.events, allLinks.attendance, allLinks.about]
    } else if (role === "attendent" || role === "attendant" || role === "volunteer") {
      return [dashboardLink, allLinks.events, allLinks.attendance, allLinks.about]
    } else {
      // fallback
      return [dashboardLink]
    }
  }

  const links = getLinksByRole()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-700 text-white px-4 py-2 flex items-center justify-between shadow-lg relative"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <GraduationCap className="h-8 w-8 text-yellow-400 bg-blue-900 rounded-full p-1 shadow-lg" />
        <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-yellow-300 via-white to-blue-200 bg-clip-text text-transparent">
          College Event Management
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-2 items-center">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center px-3 py-2 rounded transition-all duration-200 ${
              location.pathname === link.to
                ? "bg-yellow-300 text-blue-900 font-semibold shadow-lg"
                : "hover:bg-blue-700 hover:text-yellow-300"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-2 rounded bg-red-500 hover:bg-red-600 transition text-white shadow-lg"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden block text-white focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
      </button>

      {/* Theme Toggle */}
      <button
        className="mx-2 p-2 rounded-full bg-blue-900 hover:bg-blue-700 transition"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-yellow-300" />
        ) : (
          <Moon className="h-5 w-5 text-blue-200" />
        )}
      </button>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="absolute top-14 left-0 w-full bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-700 flex flex-col items-center md:hidden z-50 shadow-lg"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center w-full text-center px-3 py-2 rounded transition-all duration-200 ${
                  location.pathname === link.to
                    ? "bg-yellow-300 text-blue-900 font-semibold shadow-lg"
                    : "hover:bg-blue-700 hover:text-yellow-300"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                handleLogout()
                setOpen(false)
              }}
              className="flex items-center w-full text-center px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white shadow-lg"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
