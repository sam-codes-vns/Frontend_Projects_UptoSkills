import { useEffect, useState } from "react"
import useMockData from "../hooks/useMockData"
import useRole from "../hooks/useRole"
import Card from "../components/Card"
import Toast from "../components/Toast"
import {
  ClipboardList,
  CheckCircle,
  Clock,
  Users,
  Sparkles,
  Bell,
  Calendar,
  Award,
  Trophy,
} from "lucide-react"
import { motion } from "framer-motion"

const statGradients = [
  "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300",
  "bg-gradient-to-r from-green-500 via-green-400 to-green-300",
  "bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300",
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

const VolunteerDashboard = () => {
  const data = useMockData()
  const [role] = useRole()
  const [toast, setToast] = useState(null)

  if (!data) return <div>Loading...</div>

  // Dummy Volunteer Data
  const assignedTasks = [
    { title: "Stage Setup", status: "Completed", date: "2025-08-28" },
    { title: "Registration Desk", status: "Pending", date: "2025-08-29" },
    { title: "Crowd Management", status: "Pending", date: "2025-08-30" },
  ]

  const helpingEvents = data.events.slice(0, 2)

  // Dummy Leaderboard
  const leaderboard = [
    { name: "Rahul", points: 120 },
    { name: "Aisha", points: 95 },
    { name: "Me", points: 80 },
  ]

  // Dummy Notifications
  const notifications = [
    { msg: "New task assigned: Food Stall", date: "Just now" },
    { msg: "Event timing updated: Tech Fest", date: "1h ago" },
    { msg: "Reminder: Tomorrow’s shift at 8AM", date: "5h ago" },
  ]

  // Calculate Achievements
  const completedCount = assignedTasks.filter((t) => t.status === "Completed").length
  const badges = []
  if (completedCount >= 1) badges.push("Helper")
  if (completedCount >= 2) badges.push("Star Volunteer")
  if (completedCount >= 3) badges.push("Legend")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-blue-600 via-green-500 to-orange-400 bg-clip-text text-transparent">
          <Sparkles className="h-7 w-7 text-yellow-400 animate-bounce" />
          Volunteer Dashboard
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className={`text-white ${statGradients[0]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30">
            <ClipboardList className="h-16 w-16" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold">Assigned Tasks</span>
            <span className="text-3xl font-extrabold">
              <AnimatedCounter value={assignedTasks.length} />
            </span>
          </div>
        </Card>

        <Card className={`text-white ${statGradients[1]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30">
            <CheckCircle className="h-16 w-16" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold">Completed Tasks</span>
            <span className="text-3xl font-extrabold">
              <AnimatedCounter value={completedCount} />
            </span>
          </div>
        </Card>

        <Card className={`text-white ${statGradients[2]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30">
            <Users className="h-16 w-16" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold">Events Helping In</span>
            <span className="text-3xl font-extrabold">
              <AnimatedCounter value={helpingEvents.length} />
            </span>
          </div>
        </Card>
      </div>

      {/* Assigned Tasks + Helping Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-blue-600" />
            My Assigned Tasks
          </div>
          <ul className="space-y-2">
            {assignedTasks.map((task, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-center justify-between text-sm"
              >
                <span
                  className={`font-bold ${
                    task.status === "Completed" ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {task.title}
                </span>
                <span className="text-gray-500">{task.date}</span>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            Events Helping In
          </div>
          <ul className="space-y-2">
            {helpingEvents.map((event, i) => (
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

      {/* Attendance Record */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Attendance Record
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-3 border rounded bg-blue-50">
              <p className="text-sm font-bold text-blue-700">Shift 1</p>
              <p className="text-xs text-gray-500">08:00 AM - 12:00 PM</p>
              <p className="text-green-600 text-xs">✔ Present</p>
            </div>
            <div className="p-3 border rounded bg-blue-50">
              <p className="text-sm font-bold text-blue-700">Shift 2</p>
              <p className="text-xs text-gray-500">12:30 PM - 04:00 PM</p>
              <p className="text-orange-600 text-xs">⏳ Pending</p>
            </div>
          </div>
        </Card>

        {/* Leaderboard */}
        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Volunteer Leaderboard
          </div>
          <ul className="space-y-2">
            {leaderboard.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="font-bold">{i + 1}. {p.name}</span>
                <span className="text-gray-600">{p.points} pts</span>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Notifications + Achievements */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Bell className="h-5 w-5 text-red-600" />
            Notifications
          </div>
          <ul className="space-y-2">
            {notifications.map((n, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex justify-between text-sm"
              >
                <span>{n.msg}</span>
                <span className="text-xs text-gray-400">{n.date}</span>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            My Achievements
          </div>
          {badges.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-purple-100 text-purple-700 font-semibold rounded-full shadow"
                >
                  🏅 {b}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No achievements yet.</p>
          )}
        </Card>
      </div>

      <Toast open={!!toast} message={toast} />
    </motion.div>
  )
}

export default VolunteerDashboard
