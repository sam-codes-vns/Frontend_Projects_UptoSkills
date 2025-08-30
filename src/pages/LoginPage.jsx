import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import Toast from '../components/Toast'
import Spinner from '../components/Spinner'
import { User, Mail, QrCode, Eye, EyeOff, Sparkles, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const confettiColors = [
  'bg-yellow-300', 'bg-pink-400', 'bg-blue-400', 'bg-green-300', 'bg-purple-400'
]

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('attendent') // default role
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [errors, setErrors] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const navigate = useNavigate()

  const validate = () => {
    const err = {}
    if (!email) err.email = 'Email required'
    if (!password) err.password = 'Password required'
    if (password.length < 6) err.password = 'Password must be at least 6 chars'
    return err
  }

  const handleLogin = e => {
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
      setLoggedIn(true)
      setLoading(false)
      setToast('Login successful!')
      setShowConfetti(true)

      setTimeout(() => {
        setToast(null)
        setShowConfetti(false)

        // Save role in localStorage so Navbar can use it
        localStorage.setItem('role', role)
        // Optional: save a token if using API
        // localStorage.setItem('token', 'dummy_token_here')

        // Redirect based on role
        if (role === 'attendent') navigate('/attendent-dashboard')
        else if (role === 'organiser') navigate('/dashboard')
        else navigate('/volunteer-dashboard')
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
        Login
      </h2>

      <Card className="max-w-md w-full mx-auto shadow-xl border-2 border-blue-200 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-visible">
        <form onSubmit={handleLogin} className="space-y-4">

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

          {/* Role Selection */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-blue-700 mb-1">Select Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="border px-2 py-1 w-full rounded shadow focus:ring-2 focus:ring-purple-400 transition"
            >
              <option value="attendent">Attendent</option>
              <option value="organiser">Organiser</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          {/* Buttons */}
          <Button type="submit" disabled={loading || loggedIn} className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg p-2 w-full font-bold flex items-center justify-center gap-2 mt-2">
            <User className="inline mr-1 h-5 w-5 animate-spin" />
            {loading ? <Spinner /> : 'Login'}
          </Button>
          <Button type="button" className="bg-gray-200 text-blue-700 px-3 w-full mt-2" onClick={() => navigate('/register')}>
            <QrCode className="inline h-5 w-5 mr-1" /> Register instead
          </Button>

          {/* Success Message */}
          <AnimatePresence>
            {loggedIn && (
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
                  Login Successful!
                </div>
                <div className="text-xs mt-2">Welcome to your dashboard.</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confetti */}
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
        </form>

        <Toast open={!!toast} message={toast} />
      </Card>
    </motion.div>
  )
}

export default LoginPage
