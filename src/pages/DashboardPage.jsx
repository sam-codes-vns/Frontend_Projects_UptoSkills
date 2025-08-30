import { useEffect, useState } from 'react'
import useMockData from '../hooks/useMockData'
import useRole from '../hooks/useRole'
import Card from '../components/Card'
import Button from '../components/Button'
import Toast from '../components/Toast'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Users, CalendarDays, UserCog, Activity, ArrowUpRight, Star, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// const roles = [
//   { key: 'organizer', label: 'Organizer', icon: <UserCog className="inline mr-1 h-4 w-4" /> },
//   { key: 'volunteer', label: 'Volunteer', icon: <Users className="inline mr-1 h-4 w-4" /> },
//   { key: 'participant', label: 'Participant', icon: <Users className="inline mr-1 h-4 w-4" /> },
// ]

const COLORS = ['url(#blueGrad)', 'url(#greenGrad)', 'url(#orangeGrad)']
const ROLE_COLORS = ['#6366f1', '#f43f5e', '#facc15']

const statGradients = [
  'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300',
  'bg-gradient-to-r from-green-500 via-green-400 to-green-300',
  'bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300',
]

function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    let start = display
    let end = value
    if (start === end) return
    let frame = 0
    const duration = 500
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

const DashboardPage = () => {
  const data = useMockData()
  const [role, setRole] = useRole()
  const [liveCount, setLiveCount] = useState(0)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (data) setLiveCount(data.events.reduce((a, e) => a + e.registrations, 0))
  }, [data])

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(c => c + Math.floor(Math.random() * 2))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!data) return <div>Loading...</div>

  const recentRegs = data.registrations.slice(-5).map(r => ({
    name: data.users.find(u => u.id === r.userId)?.name,
    event: data.events.find(e => e.id === r.eventId)?.title,
    time: new Date().toLocaleTimeString(),
  }))

  const donutData = [
    { name: 'Registrations', value: liveCount },
    { name: 'Users', value: data.users.length },
    { name: 'Events', value: data.events.length },
  ]

  // Dummy numbers for roles
  const roleData = [
    { name: 'Organizers', value: 5 },
    { name: 'Volunteers', value: 8 },
    { name: 'Participants', value: 30 },
  ]

//   const handleRoleChange = r => {
//     setRole(r)
//     setToast(`Switched to ${r} dashboard`)
//     setTimeout(() => setToast(null), 1500)
//   }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent">
          <Sparkles className="h-7 w-7 text-yellow-400 animate-spin" />
          Dashboard <span className="text-base font-normal">({role})</span>
        </h2>
        {/* <div className="flex gap-2">
          {roles.map((r, idx) => (
            <Button
              key={r.key}
              onClick={() => handleRoleChange(r.key)}
              disabled={role === r.key}
              className={`shadow ${statGradients[idx % statGradients.length]} border-2 border-white`}
            >
              {r.icon}
              {r.label}
            </Button>
          ))}
        </div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className={`text-white ${statGradients[0]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30">
            <Users className="h-16 w-16" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-gray-100 font-semibold">Live Registration Count</span>
            <span className="text-3xl font-extrabold flex items-center gap-2">
              <AnimatedCounter value={liveCount} />
              <ArrowUpRight className="h-6 w-6 text-green-300 animate-bounce" />
            </span>
          </div>
        </Card>
        <Card className={`text-white ${statGradients[1]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30">
            <CalendarDays className="h-16 w-16" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-gray-100 font-semibold">Total Events</span>
            <span className="text-3xl font-extrabold flex items-center gap-2">
              <AnimatedCounter value={data.events.length} />
              <Star className="h-6 w-6 text-yellow-300 animate-pulse" />
            </span>
          </div>
        </Card>
        <Card className={`text-white ${statGradients[2]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30">
            <Users className="h-16 w-16" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-gray-100 font-semibold">Total Users</span>
            <span className="text-3xl font-extrabold flex items-center gap-2">
              <AnimatedCounter value={data.users.length} />
              <Users className="h-6 w-6 text-white animate-spin" />
            </span>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Recent Activity
          </div>
          <ul className="space-y-2">
            <AnimatePresence>
              {recentRegs.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="font-bold">{r.name}</span>
                  <span className="text-gray-500">registered for</span>
                  <span className="font-bold text-blue-600">{r.event}</span>
                  <span className="ml-auto text-xs text-gray-400">{r.time}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </Card>
        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            System Overview
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#bbf7d0" />
                </linearGradient>
                <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f59e42" />
                  <stop offset="100%" stopColor="#fde68a" />
                </linearGradient>
              </defs>
              <Pie
                data={donutData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {donutData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <div className="font-semibold mb-2 flex items-center gap-2">
            <UserCog className="h-5 w-5 text-purple-600" />
            User Roles
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {roleData.map((entry, idx) => (
                  <Cell key={`role-cell-${idx}`} fill={ROLE_COLORS[idx % ROLE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
          <div className="font-semibold mb-2 text-lg text-blue-700">Role Tools</div>
          <AnimatePresence mode="wait">
            {role === 'organizer' && (
              <motion.div
                key="organizer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-blue-700 text-center"
              >
                <UserCog className="h-8 w-8 mx-auto mb-2 animate-spin" />
                Organizer tools: <br /> <span className="font-bold">Create/manage events.</span>
              </motion.div>
            )}
            {role === 'volunteer' && (
              <motion.div
                key="volunteer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-green-700 text-center"
              >
                <Users className="h-8 w-8 mx-auto mb-2 animate-bounce" />
                Volunteer tools: <br /> <span className="font-bold">Track attendance.</span>
              </motion.div>
            )}
            {role === 'participant' && (
              <motion.div
                key="participant"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-pink-700 text-center"
              >
                <Users className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                Participant info: <br /> <span className="font-bold">View registered events.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
      <Toast open={!!toast} message={toast} />
    </motion.div>
  )
}

export default DashboardPage
