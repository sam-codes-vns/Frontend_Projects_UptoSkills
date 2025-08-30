import { useState } from 'react'
import useMockData from '../hooks/useMockData'
import Button from '../components/Button'
import Card from '../components/Card'
import Toast from '../components/Toast'
import Spinner from '../components/Spinner'
import { User, Mail, CalendarDays, QrCode, Eye, EyeOff, Sparkles, CheckCircle, XCircle, Users, UserCog } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
// import QRCode from 'qrcode.react'

const roleOptions = [
  { key: 'participant', label: 'Attendant', icon: <Users className="h-4 w-4 text-blue-600" />, color: 'bg-blue-100 text-blue-700' },
  { key: 'volunteer', label: 'Volunteer', icon: <User className="h-4 w-4 text-green-600" />, color: 'bg-green-100 text-green-700' },
  { key: 'organizer', label: 'Organizer', icon: <UserCog className="h-4 w-4 text-purple-600" />, color: 'bg-purple-100 text-purple-700' },
]

const confettiColors = [
  'bg-yellow-300', 'bg-pink-400', 'bg-blue-400', 'bg-green-300', 'bg-purple-400'
]

const RegisterPage = () => {
  const data = useMockData()
  const [selectedEvent, setSelectedEvent] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(roleOptions[0].key)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfPass, setShowConfPass] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [qrValue, setQrValue] = useState('')
  const [errors, setErrors] = useState({})
  const [showConfetti, setShowConfetti] = useState(false)

  if (!data) return <div>Loading...</div>

  const validate = () => {
    const err = {}
    if (!fullName) err.fullName = 'Full name required'
    if (!email) err.email = 'Email required'
    if (!role) err.role = 'Select role'
    if (!password) err.password = 'Password required'
    if (password.length < 6) err.password = 'Password must be at least 6 chars'
    if (password !== confirmPassword) err.confirmPassword = 'Passwords do not match'
    return err
  }

  const handleRegister = e => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length > 0) {
      setToast('Please fix errors!')
      setTimeout(() => setToast(null), 1500)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setRegistered(true)
      setLoading(false)
      setQrValue(`${email}-${role}`)
      setToast('Registered successfully!')
      setShowConfetti(true)
      setTimeout(() => {
        setToast(null)
        setShowConfetti(false)
      }, 1200)
    }, 1000)
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
        User Registration
      </h2>
      <Card className="max-w-lg w-full mx-auto shadow-xl border-2 border-blue-200 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-visible">
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 font-semibold text-blue-700 mb-1">
              <User className="h-5 w-5 text-blue-600" />
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={e => { setFullName(e.target.value); setErrors(er => ({ ...er, fullName: '' })) }}
              className={`border px-2 py-1 w-full rounded shadow focus:ring-2 focus:ring-blue-400 transition ${errors.fullName ? 'border-red-400' : ''}`}
              required
            />
            {errors.fullName && <div className="text-red-500 text-xs">{errors.fullName}</div>}
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 font-semibold text-blue-700 mb-1">
              <Mail className="h-5 w-5 text-blue-600" />
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: '' })) }}
              className={`border px-2 py-1 w-full rounded shadow focus:ring-2 focus:ring-blue-400 transition ${errors.email ? 'border-red-400' : ''}`}
              required
            />
            {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
          </div>
          {/* Role */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-blue-700 mb-1">Role</label>
            <div className="flex gap-2 flex-wrap">
              {roleOptions.map(opt => (
                <button
                  key={opt.key}
                  type="button"
                  className={`px-2 py-1 rounded flex items-center gap-1 border transition ${role === opt.key ? opt.color + ' border-blue-600 font-bold shadow-lg scale-105' : 'bg-gray-100 text-gray-600 border-gray-300 hover:scale-105'}`}
                  onClick={() => { setRole(opt.key); setErrors(er => ({ ...er, role: '' })) }}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
            {errors.role && <div className="text-red-500 text-xs">{errors.role}</div>}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-blue-700 mb-1">Password</label>
            <div className="flex items-center gap-2">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(er => ({ ...er, password: '' })) }}
                className={`border px-2 py-1 w-full rounded shadow focus:ring-2 focus:ring-blue-400 transition ${errors.password ? 'border-red-400' : ''}`}
                required
                minLength={6}
              />
              <button type="button" onClick={() => setShowPass(v => !v)} className="px-2">
                {showPass ? <EyeOff className="h-5 w-5 text-blue-600" /> : <Eye className="h-5 w-5 text-blue-600" />}
              </button>
            </div>
            {errors.password && <div className="text-red-500 text-xs">{errors.password}</div>}
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-blue-700 mb-1">Confirm Password</label>
            <div className="flex items-center gap-2">
              <input
                type={showConfPass ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setErrors(er => ({ ...er, confirmPassword: '' })) }}
                className={`border px-2 py-1 w-full rounded shadow focus:ring-2 focus:ring-blue-400 transition ${errors.confirmPassword ? 'border-red-400' : ''}`}
                required
                minLength={6}
              />
              <button type="button" onClick={() => setShowConfPass(v => !v)} className="px-2">
                {showConfPass ? <EyeOff className="h-5 w-5 text-blue-600" /> : <Eye className="h-5 w-5 text-blue-600" />}
              </button>
            </div>
            {errors.confirmPassword && <div className="text-red-500 text-xs">{errors.confirmPassword}</div>}
          </div>
          {/* Buttons */}
          <Button type="submit" disabled={loading || registered} className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg p-2 w-full font-bold flex items-center justify-center gap-2 mt-2">
            <QrCode className="inline mr-1 h-5 w-5 animate-spin" />
            {loading ? <Spinner /> : 'Register'}
          </Button>
          <Button type="button" className="bg-gray-200 text-blue-700 px-3 w-full mt-2" onClick={() => window.location.href = '/login'}>
            <User className="inline h-5 w-5 mr-1" /> Login instead
          </Button>
        </form>
        <AnimatePresence>
          {registered && (
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
                Registration Successful!
              </div>
              {/* Uncomment below if QRCode is available */}
              {/* <QRCode value={qrValue} size={128} /> */}
              <div className="text-xs mt-2 font-mono bg-blue-50 rounded p-2 border border-blue-200">{qrValue}</div>
              <div className="text-xs mt-2">Show this QR code at the event.</div>
            </motion.div>
          )}
        </AnimatePresence>
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
      </Card>
      <Toast open={!!toast} message={toast} />
    </motion.div>
  )
}

export default RegisterPage