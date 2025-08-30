import { useState, useRef, useEffect } from 'react'
import useMockData from '../hooks/useMockData'
import Card from '../components/Card'
import Button from '../components/Button'
import Toast from '../components/Toast'
import { 
  QrCode, User, Mail, CalendarDays, XCircle, Sparkles, 
  CheckCircle, Clock, Trash2 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// 🔹 Confetti colors
const confettiColors = [
  'bg-yellow-300', 'bg-pink-400', 'bg-blue-400', 'bg-green-300', 'bg-purple-400'
]

// 🔹 helper functions for localStorage
const saveAttendance = (attendance) => {
  const existing = JSON.parse(localStorage.getItem('attendance')) || []
  localStorage.setItem(
    'attendance',
    JSON.stringify([attendance, ...existing.slice(0, 49)]) // max 50 records
  )
}

const getAttendance = () => {
  return JSON.parse(localStorage.getItem('attendance')) || []
}

const AttendancePage = () => {
  const data = useMockData()
  const [qrInput, setQrInput] = useState('')
  const [result, setResult] = useState(null)
  const [toast, setToast] = useState(null)
  const [recent, setRecent] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const inputRef = useRef(null)

  // 🔹 Get role from localStorage (normalize to lowercase)
  const role = (localStorage.getItem("role") || "").toLowerCase().trim()

  // 🔹 load saved attendance from localStorage on first render
  useEffect(() => {
    setRecent(getAttendance())
  }, [])

  if (!data) return <div>Loading...</div>

  const handleScan = e => {
    e.preventDefault()
    const reg = data.registrations.find(r => r.qr === qrInput)
    if (reg) {
      const user = data.users.find(u => u.id === reg.userId)
      const event = data.events.find(ev => ev.id === reg.eventId)
      const newAttendance = {
        user,
        event,
        time: new Date().toLocaleTimeString(),
        poster: event.poster
      }

      setResult({ user, event, reg })
      setToast('Attendance marked!')
      setRecent(r => [newAttendance, ...r.slice(0, 4)])

      // 🔹 Save to localStorage
      saveAttendance(newAttendance)

      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1200)
    } else {
      setResult(null)
      setToast('Invalid QR code!')
    }
    setTimeout(() => setToast(null), 1200)
  }

  const handleClear = () => {
    setQrInput('')
    setResult(null)
    inputRef.current?.focus()
  }

  // 🔹 delete handler
  const handleDelete = (index) => {
    const updated = recent.filter((_, i) => i !== index)
    setRecent(updated)
    localStorage.setItem('attendance', JSON.stringify(updated))
    setToast('Attendance deleted!')
    setTimeout(() => setToast(null), 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8"
    >
      <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-fade-in">
        <Sparkles className="h-7 w-7 text-yellow-400 animate-spin" />
        Attendance Tracking
      </h2>
      <Card className="max-w-lg w-full mx-auto shadow-xl border-2 border-blue-200 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-visible">
        <form onSubmit={handleScan} className="space-y-3">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-blue-600 animate-pulse" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Scan or enter QR code value"
              value={qrInput}
              onChange={e => setQrInput(e.target.value)}
              className="border px-2 py-1 w-full rounded shadow focus:ring-2 focus:ring-blue-400 transition"
              required
              autoFocus
            />
            <Button
              type="button"
              className="bg-gray-200 text-blue-700 px-2"
              onClick={handleClear}
              disabled={!qrInput}
            >
              <XCircle className="inline h-4 w-4" />
            </Button>
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg p-2 w-full font-bold flex items-center justify-center gap-2"
          >
            <QrCode className="inline mr-1 h-5 w-5 animate-spin" />
            Validate
          </Button>
        </form>

        {/* ✅ Attendance result */}
        <AnimatePresence>
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-center"
            >
              <div className="mb-2 text-green-600 font-bold flex items-center justify-center gap-2">
                <CheckCircle className="h-6 w-6 animate-bounce" />
                Attendance Recorded!
              </div>
              {result.event.poster && (
                <motion.img
                  src={result.event.poster}
                  alt="poster"
                  className="w-20 h-20 object-cover rounded shadow border-2 border-blue-400 mx-auto mb-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}
              <div className="mb-1 flex items-center gap-2 justify-center text-blue-700">
                <User className="h-4 w-4" />
                Name: <span className="font-bold">{result.user.name}</span>
              </div>
              <div className="mb-1 flex items-center gap-2 justify-center text-purple-700">
                <Mail className="h-4 w-4" />
                Email: <span className="font-bold">{result.user.email}</span>
              </div>
              <div className="mb-1 flex items-center gap-2 justify-center text-pink-700">
                <CalendarDays className="h-4 w-4" />
                Event: <span className="font-bold">{result.event.title}</span>
              </div>
              <div className="mb-1 flex items-center gap-2 justify-center text-green-700">
                <Clock className="h-4 w-4" />
                Time: <span className="font-bold">{new Date().toLocaleTimeString()}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎉 Confetti */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              key="confetti"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 pointer-events-none flex flex-wrap justify-center items-center"
              style={{ zIndex: 10 }}
            >
              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-3 h-3 rounded-full ${confettiColors[i % confettiColors.length]}`}
                  initial={{ y: -20, x: 0, opacity: 0 }}
                  animate={{
                    y: Math.random() * 80 + 20,
                    x: (Math.random() - 0.5) * 120,
                    opacity: 1,
                    rotate: Math.random() * 360
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: i * 0.03 }}
                  style={{ position: 'absolute', top: '50%', left: '50%' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ Recent attendance list (delete button only for organisers/organizers) */}
        {recent.length > 0 && (
          <div className="mt-8">
            <div className="font-semibold mb-2 flex items-center gap-2 text-blue-700">
              <Sparkles className="h-5 w-5 text-yellow-400 animate-spin" />
              Recent Attendance
            </div>
            <ul className="space-y-2">
              <AnimatePresence>
                {recent.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="flex items-center gap-2 text-sm text-gray-700 bg-white/60 rounded px-2 py-1 shadow"
                  >
                    {r.poster
                      ? <img src={r.poster} alt="poster" className="w-8 h-8 object-cover rounded border-2 border-blue-200" />
                      : <QrCode className="h-6 w-6 text-blue-400" />
                    }
                    <span className="font-bold text-blue-700">{r.user.name}</span>
                    <span className="text-gray-500">for</span>
                    <span className="font-bold text-purple-700">{r.event.title}</span>
                    <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="h-4 w-4" />{r.time}
                    </span>

                    {/* 🔹 Delete Button → only show if current user is organiser */}
                    {role === 'organiser' || role === 'organizer' ? (
                      <Button
                        type="button"
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(i)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : null}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        )}

        {/* ✅ Organizer View - Full Attendance Table (only for organisers) */}
        {recent.length > 0 && (role === 'organiser' || role === 'organizer') && (
          <div className="mt-10">
            <div className="font-semibold mb-2 flex items-center gap-2 text-green-700">
              <User className="h-5 w-5 text-green-500 animate-bounce" />
              Organizer View: All Attendance Records
            </div>
            <div className="overflow-x-auto border rounded-lg shadow">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-green-100 text-green-800 font-bold">
                  <tr>
                    <th className="px-3 py-2 border">Name</th>
                    <th className="px-3 py-2 border">Email</th>
                    <th className="px-3 py-2 border">Event</th>
                    <th className="px-3 py-2 border">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r, i) => (
                    <tr key={i} className="odd:bg-white even:bg-green-50">
                      <td className="px-3 py-2 border font-bold">{r.user?.name}</td>
                      <td className="px-3 py-2 border">{r.user?.email}</td>
                      <td className="px-3 py-2 border">{r.event?.title}</td>
                      <td className="px-3 py-2 border">{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>
      <Toast open={!!toast} message={toast} />
    </motion.div>
  )
}

export default AttendancePage
