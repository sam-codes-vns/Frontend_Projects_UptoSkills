import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import Toast from '../components/Toast'
import Spinner from '../components/Spinner'
import { ChevronRight, ChevronLeft, Info, Layers, ImagePlus, Sparkles, CalendarDays, Users, Star, BarChart, Palette, XCircle, CheckCircle, FileText, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const eventCategories = [
  { key: 'tech', label: 'Tech', color: 'bg-blue-200 text-blue-800', icon: <Layers className="h-5 w-5 text-blue-600" /> },
  { key: 'cultural', label: 'Cultural', color: 'bg-pink-200 text-pink-800', icon: <Palette className="h-5 w-5 text-pink-600" /> },
  { key: 'sports', label: 'Sports', color: 'bg-green-200 text-green-800', icon: <Users className="h-5 w-5 text-green-600" /> },
  { key: 'art', label: 'Art', color: 'bg-purple-200 text-purple-800', icon: <Palette className="h-5 w-5 text-purple-600" /> },
  { key: 'music', label: 'Music', color: 'bg-yellow-200 text-yellow-800', icon: <Star className="h-5 w-5 text-yellow-600" /> },
  { key: 'science', label: 'Science', color: 'bg-teal-200 text-teal-800', icon: <BarChart className="h-5 w-5 text-teal-600" /> },
  { key: 'business', label: 'Business', color: 'bg-orange-200 text-orange-800', icon: <Info className="h-5 w-5 text-orange-600" /> },
]

const steps = [
  { label: 'Basic Info', icon: <Info className="h-5 w-5" /> },
  { label: 'Details', icon: <FileText className="h-5 w-5" /> },
  { label: 'Poster', icon: <ImagePlus className="h-5 w-5" /> },
  { label: 'Summary', icon: <Eye className="h-5 w-5" /> },
]

const initialForm = {
  title: '',
  date: '',
  description: '',
  poster: '',
  category: eventCategories[0].key,
  capacity: 100,
}

const validateStep = (step, form) => {
  if (step === 0) return !!form.title && !!form.date
  if (step === 1) return !!form.description
  if (step === 2) return !!form.poster
  return true
}

const CreateEventPage = () => {
  const navigate = useNavigate()
  const [createStep, setCreateStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [errors, setErrors] = useState({})
  const [showErrorCard, setShowErrorCard] = useState(false)

  // Validation feedback
  const handleNext = () => {
    const err = {}
    if (createStep === 0) {
      if (!form.title) err.title = 'Event title is required'
      if (!form.date) err.date = 'Event date is required'
    }
    if (createStep === 1) {
      if (!form.description) err.description = 'Event description is required'
    }
    if (createStep === 2) {
      if (!form.poster) err.poster = 'Event poster is required'
    }
    setErrors(err)
    if (Object.keys(err).length === 0) {
      setShowErrorCard(false)
      setCreateStep(s => s + 1)
    } else {
      setShowErrorCard(true)
    }
  }

  const handlePrev = () => setCreateStep(s => s - 1)

  const handlePosterUpload = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = ev => setForm(f => ({ ...f, poster: ev.target.result }))
      reader.readAsDataURL(file)
    }
  }

  const handleResetForm = () => {
    setForm(initialForm)
    setCreateStep(0)
    setErrors({})
  }

  const handleCancel = () => navigate('/events')

  const handleCreate = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setToast('Event created!')
      setTimeout(() => {
        setToast(null)
        navigate('/events')
      }, 1200)
    }, 1000)
  }

  // Progress bar calculation
  const progress = Math.round((createStep / (steps.length - 1)) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-8 mb-8"
    >
      <div className="font-bold text-2xl mb-6 flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-fade-in">
        <Sparkles className="h-7 w-7 text-yellow-400 animate-spin" />
        Create New Event
      </div>
      {showErrorCard && Object.keys(errors).length > 0 && (
        <Card className="mb-4 border-2 border-red-300 bg-red-50 flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-500" />
          <div>
            <span className="font-semibold text-red-700">Please fill all required fields:</span>
            <ul className="list-disc ml-6 text-red-600 text-sm">
              {Object.values(errors).map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>
        </Card>
      )}
      <Card className="relative overflow-visible shadow-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Stepper with progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            {steps.map((step, idx) => (
              <div key={step.label} className="flex flex-col items-center w-1/4">
                <div className={`rounded-full p-2 border-2 ${createStep === idx ? 'border-blue-600 bg-blue-100' : 'border-gray-300 bg-gray-100'} transition`}>
                  {step.icon}
                </div>
                <span className={`text-xs mt-1 ${createStep === idx ? 'text-blue-700 font-bold' : 'text-gray-400'}`}>{step.label}</span>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-blue-100 rounded">
            <motion.div
              className="h-2 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <form onSubmit={handleCreate} className="space-y-3">
          <AnimatePresence mode="wait">
            {/* Step 0: Basic Info */}
            {createStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="flex gap-2 items-center">
                  <Info className="h-5 w-5 text-blue-600" />
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={form.title}
                    onChange={e => {
                      setForm(f => ({ ...f, title: e.target.value }))
                      setErrors(errs => ({ ...errs, title: '' }))
                      setShowErrorCard(false)
                    }}
                    className={`border px-2 py-1 w-full rounded shadow focus:ring-2 focus:ring-blue-400 ${errors.title ? 'border-red-400' : ''}`}
                  />
                </div>
                {errors.title && <div className="text-red-500 text-xs ml-7">{errors.title}</div>}
                <div className="flex gap-2 items-center">
                  <CalendarDays className="h-5 w-5 text-purple-600" />
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => {
                      setForm(f => ({ ...f, date: e.target.value }))
                      setErrors(errs => ({ ...errs, date: '' }))
                      setShowErrorCard(false)
                    }}
                    className={`border px-2 py-1 w-full rounded shadow focus:ring-2 focus:ring-purple-400 ${errors.date ? 'border-red-400' : ''}`}
                  />
                </div>
                {errors.date && <div className="text-red-500 text-xs ml-7">{errors.date}</div>}
                <div className="flex gap-2 items-center">
                  <span className="font-semibold text-blue-700">Category:</span>
                  <div className="flex gap-2 flex-wrap">
                    {eventCategories.map(cat => (
                      <button
                        key={cat.key}
                        type="button"
                        className={`px-2 py-1 rounded flex items-center gap-1 border transition ${form.category === cat.key ? cat.color + ' border-blue-600 font-bold shadow-lg scale-105' : 'bg-gray-100 text-gray-600 border-gray-300 hover:scale-105'}`}
                        onClick={() => setForm(f => ({ ...f, category: cat.key }))}
                      >
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-700">Capacity:</span>
                  <input
                    type="range"
                    min={10}
                    max={500}
                    value={form.capacity}
                    onChange={e => setForm(f => ({ ...f, capacity: Number(e.target.value) }))}
                    className="w-32 accent-blue-600"
                  />
                  <span className="font-bold text-blue-600">{form.capacity}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <Button type="button" className="bg-gray-300 text-gray-700 px-3" onClick={handleResetForm}>
                    <XCircle className="inline h-4 w-4 mr-1" /> Reset
                  </Button>
                  <div className="flex gap-2">
                    <Button type="button" className="bg-gray-200 text-blue-700 px-3" onClick={handleCancel}>
                      <XCircle className="inline h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button type="button" className="bg-blue-600 px-3" onClick={handleNext} disabled={!validateStep(0, form)}>
                      Next <ChevronRight className="inline h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
            {/* Step 1: Details */}
            {createStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="flex gap-2 items-center">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={e => {
                      setForm(f => ({ ...f, description: e.target.value }))
                      setErrors(errs => ({ ...errs, description: '' }))
                      setShowErrorCard(false)
                    }}
                    className={`border px-2 py-1 w-full rounded shadow focus:ring-2 focus:ring-purple-400 ${errors.description ? 'border-red-400' : ''}`}
                    rows={3}
                  />
                </div>
                {errors.description && <div className="text-red-500 text-xs ml-7">{errors.description}</div>}
                <div className="flex justify-between mt-2">
                  <Button type="button" className="bg-gray-300 text-gray-700 px-3" onClick={handlePrev}>
                    <ChevronLeft className="inline h-4 w-4" /> Back
                  </Button>
                  <Button type="button" className="bg-purple-600 px-3" onClick={handleNext} disabled={!validateStep(1, form)}>
                    Next <ChevronRight className="inline h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
            {/* Step 2: Poster */}
            {createStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="flex gap-2 items-center">
                  <ImagePlus className="h-5 w-5 text-pink-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      handlePosterUpload(e)
                      setErrors(errs => ({ ...errs, poster: '' }))
                      setShowErrorCard(false)
                    }}
                    className={`border px-2 py-1 w-full rounded shadow ${errors.poster ? 'border-red-400' : ''}`}
                  />
                </div>
                {errors.poster && <div className="text-red-500 text-xs ml-7">{errors.poster}</div>}
                {form.poster && (
                  <motion.img
                    src={form.poster}
                    alt="preview"
                    className="w-32 h-32 object-cover rounded shadow border-2 border-blue-400 mx-auto mt-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
                <div className="flex justify-between mt-2">
                  <Button type="button" className="bg-gray-300 text-gray-700 px-3" onClick={handlePrev}>
                    <ChevronLeft className="inline h-4 w-4" /> Back
                  </Button>
                  <Button type="button" className="bg-pink-600 px-3" onClick={handleNext} disabled={!validateStep(2, form)}>
                    Next <ChevronRight className="inline h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
            {/* Step 3: Summary */}
            {createStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="font-bold text-lg mb-2 text-blue-700 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-yellow-400 animate-pulse" />
                  Review & Submit
                </div>
                <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded overflow-hidden shadow-lg border-2 border-white">
                      {form.poster
                        ? <img src={form.poster} alt="poster" className="w-full h-full object-cover rounded" />
                        : <span className="text-xs text-gray-500">No Poster</span>
                      }
                    </div>
                    <div className="flex-1">
                      <div className="font-bold flex items-center gap-2 text-blue-700">
                        <Info className="h-4 w-4 text-yellow-300" />
                        {form.title}
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${eventCategories.find(cat => cat.key === form.category)?.color}`}>
                          {eventCategories.find(cat => cat.key === form.category)?.label}
                        </span>
                      </div>
                      <div className="text-sm text-blue-500 flex items-center gap-1 mt-1">
                        <CalendarDays className="h-4 w-4" />
                        {form.date}
                      </div>
                      <div className="text-gray-700 line-clamp-2 mt-1">{form.description}</div>
                      <div className="text-xs mt-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-400" />
                        <span className="font-semibold text-green-700">Capacity:</span> {form.capacity}
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="flex justify-between mt-4">
                  <Button type="button" className="bg-gray-300 text-gray-700 px-3" onClick={handlePrev}>
                    <ChevronLeft className="inline h-4 w-4" /> Back
                  </Button>
                  <Button type="submit" disabled={loading} className="bg-gradient-to-r p-2 from-pink-500 via-purple-500 to-blue-500 shadow-lg">
                    <CheckCircle className="inline mr-1 h-5 w-5" />
                    {loading ? <Spinner /> : 'Create Event'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        {/* Toast */}
        <Toast open={!!toast} message={toast} />
      </Card>
    </motion.div>
  )
}

export default CreateEventPage
