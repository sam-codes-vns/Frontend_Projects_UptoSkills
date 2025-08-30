import { useEffect, useState } from "react"
import useMockData from "../hooks/useMockData"
import useRole from "../hooks/useRole"
import Card from "../components/Card"
import Toast from "../components/Toast"
import {
  CalendarClock,
  Ticket,
  ClipboardCheck,
  Star,
  Sparkles,
  Users,
  Bell,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const statGradients = [
  "bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300",
  "bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300",
  "bg-gradient-to-r from-green-500 via-green-400 to-green-300",
]

function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    let start = display
    let end = value
    if (start === end) return
    let frame = 0
    const step = () => {
      frame++
      const progress = Math.min(frame / 30, 1)
      setDisplay(Math.round(start + (end - start) * progress))
      if (progress < 1) requestAnimationFrame(step)
    }
    step()
  }, [value])
  return <span>{display}</span>
}

const AttendentDashboard = () => {
  const data = useMockData()
  const [role] = useRole()
  const [toast, setToast] = useState(null)

  if (!data) return <div>Loading...</div>

  // Dummy: Attendent ke registered events (randomly pick)
  const myEvents = data.events.slice(0, 3)
  const upcomingEvents = data.events.slice(3, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-400 bg-clip-text text-transparent">
          <Sparkles className="h-7 w-7 text-yellow-400 animate-bounce" />
          Attendent Dashboard
        </h2>
      </div>

      {/* Stats Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className={`text-white ${statGradients[0]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30">
            <ClipboardCheck className="h-16 w-16" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold">Registered Events</span>
            <span className="text-3xl font-extrabold flex items-center gap-2">
              <AnimatedCounter value={myEvents.length} />
              <Star className="h-6 w-6 text-yellow-300 animate-pulse" />
            </span>
          </div>
        </Card>

        <Card className={`text-white ${statGradients[1]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30">
            <CalendarClock className="h-16 w-16" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold">Upcoming Events</span>
            <span className="text-3xl font-extrabold">
              <AnimatedCounter value={upcomingEvents.length} />
            </span>
          </div>
        </Card>

        <Card className={`text-white ${statGradients[2]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30">
            <Ticket className="h-16 w-16" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold">My Tickets</span>
            <span className="text-3xl font-extrabold">
              <AnimatedCounter value={myEvents.length} />
            </span>
          </div>
        </Card>
      </div>

      {/* My Events + Upcoming Reminders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-pink-600" />
            My Registered Events
          </div>
          <ul className="space-y-2">
            {myEvents.map((event, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="font-bold text-pink-600">{event.title}</span>
                <span className="text-gray-500">{event.date}</span>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Upcoming Reminders
          </div>
          <ul className="space-y-2">
            {upcomingEvents.map((event, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="font-bold text-blue-600">{event.title}</span>
                <span className="text-gray-500">{event.date}</span>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>

      {/* My Tickets */}
      <div className="mt-6">
        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Ticket className="h-5 w-5 text-green-600" />
            My Tickets / Passes
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                className="p-4 border rounded-lg shadow bg-gradient-to-br from-green-100 to-blue-50"
              >
                <h3 className="font-bold text-green-700">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date}</p>
                <p className="text-xs text-gray-500">Pass ID: #{1000 + i}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <Toast open={!!toast} message={toast} />
    </motion.div>
  )
}

export default AttendentDashboard
