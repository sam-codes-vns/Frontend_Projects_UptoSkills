import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMockData from '../hooks/useMockData'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import Spinner from '../components/Spinner'
import { CheckCircle, Info, CalendarDays, Users, ImagePlus, Star, Sparkles, ArrowUpRight, Link2, Download, BadgeCheck, BarChart, Palette, Layers } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const statGradients = [
  'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300',
  'bg-gradient-to-r from-green-500 via-green-400 to-green-300',
  'bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300',
]

const eventCategories = [
  { key: 'tech', label: 'Tech', color: 'bg-blue-200 text-blue-800' },
  { key: 'cultural', label: 'Cultural', color: 'bg-pink-200 text-pink-800' },
  { key: 'sports', label: 'Sports', color: 'bg-green-200 text-green-800' },
  { key: 'art', label: 'Art', color: 'bg-purple-200 text-purple-800' },
  { key: 'music', label: 'Music', color: 'bg-yellow-200 text-yellow-800' },
  { key: 'science', label: 'Science', color: 'bg-teal-200 text-teal-800' },
  { key: 'business', label: 'Business', color: 'bg-orange-200 text-orange-800' },
]

function getCategory(evt) {
  if (evt.title.toLowerCase().includes('tech') || evt.title.toLowerCase().includes('coding') || evt.title.toLowerCase().includes('hackathon')) return eventCategories[0]
  if (evt.title.toLowerCase().includes('cultural')) return eventCategories[1]
  if (evt.title.toLowerCase().includes('sport')) return eventCategories[2]
  if (evt.title.toLowerCase().includes('art')) return eventCategories[3]
  if (evt.title.toLowerCase().includes('music')) return eventCategories[4]
  if (evt.title.toLowerCase().includes('science')) return eventCategories[5]
  if (evt.title.toLowerCase().includes('entrepreneur')) return eventCategories[6]
  return eventCategories[0]
}

const EventsPage = () => {
  const data = useMockData()
  const navigate = useNavigate()
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)
  const [sortBy, setSortBy] = useState('date')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [filterCat, setFilterCat] = useState('all')

  // Role from localStorage
  const role = localStorage.getItem('role') || 'attendent'

  if (!data) return <Spinner />

  // Sorting
  let sortedEvents = [...data.events]
  if (sortBy === 'date') sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
  if (sortBy === 'registrations') sortedEvents.sort((a, b) => b.registrations - a.registrations)
  if (sortBy === 'capacity') sortedEvents.sort((a, b) => b.capacity - a.capacity)

  // Filtering
  let filteredEvents = sortedEvents.filter(evt => evt.title.toLowerCase().includes(search.toLowerCase()))
  if (dateRange.from) filteredEvents = filteredEvents.filter(evt => new Date(evt.date) >= new Date(dateRange.from))
  if (dateRange.to) filteredEvents = filteredEvents.filter(evt => new Date(evt.date) <= new Date(dateRange.to))
  if (filterCat !== 'all') filteredEvents = filteredEvents.filter(evt => getCategory(evt).key === filterCat)

  const openDetails = evt => {
    setSelectedEvent(evt)
    setDetailsOpen(true)
  }

  const handleCopyLink = evt => {
    navigator.clipboard.writeText(window.location.origin + '/events#' + evt.id)
    setToast('Event link copied!')
    setTimeout(() => setToast(null), 1200)
  }

  const handleDownloadPoster = evt => {
    if (!evt.poster) return
    const link = document.createElement('a')
    link.href = evt.poster
    link.download = evt.title + '-poster.jpg'
    link.click()
    setToast('Poster download started!')
    setTimeout(() => setToast(null), 1200)
  }

  const handleParticipate = evt => {
    evt.registrations += 1 // increment registration
    setToast(`You participated in "${evt.title}"!`)
    setTimeout(() => setToast(null), 1200)
  }

  // Stats summary
  const totalEvents = data.events.length
  const totalRegistrations = data.events.reduce((a, e) => a + e.registrations, 0)
  const avgCapacity = Math.round(data.events.reduce((a, e) => a + e.capacity, 0) / totalEvents)

  return (
    <div className="p-4">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className={`text-white ${statGradients[0]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30"><BarChart className="h-12 w-12" /></div>
          <div className="flex flex-col items-start">
            <span className="text-gray-100 font-semibold">Total Events</span>
            <span className="text-2xl font-extrabold flex items-center gap-2">{totalEvents}<Star className="h-5 w-5 text-yellow-300 animate-pulse" /></span>
          </div>
        </Card>
        <Card className={`text-white ${statGradients[1]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30"><Users className="h-12 w-12" /></div>
          <div className="flex flex-col items-start">
            <span className="text-gray-100 font-semibold">Total Registrations</span>
            <span className="text-2xl font-extrabold flex items-center gap-2">{totalRegistrations}<ArrowUpRight className="h-5 w-5 text-green-300 animate-bounce" /></span>
          </div>
        </Card>
        <Card className={`text-white ${statGradients[2]} relative overflow-hidden`}>
          <div className="absolute right-4 top-4 opacity-30"><CalendarDays className="h-12 w-12" /></div>
          <div className="flex flex-col items-start">
            <span className="text-gray-100 font-semibold">Avg. Capacity</span>
            <span className="text-2xl font-extrabold flex items-center gap-2">{avgCapacity}<Users className="h-5 w-5 text-white animate-spin" /></span>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <h2 className="text-xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-fade-in">
          <Sparkles className="h-7 w-7 text-yellow-400 animate-spin" /> Events
        </h2>
        <div className="flex flex-wrap gap-2 items-center">
          <input type="text" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} className="border px-2 py-1 rounded shadow focus:ring-2 focus:ring-blue-400 transition" />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border px-2 py-1 rounded shadow" title="Sort by">
            <option value="date">Sort by Date</option>
            <option value="registrations">Sort by Registrations</option>
            <option value="capacity">Sort by Capacity</option>
          </select>
          <input type="date" value={dateRange.from} onChange={e => setDateRange(r => ({ ...r, from: e.target.value }))} className="border px-2 py-1 rounded shadow" title="From date" />
          <input type="date" value={dateRange.to} onChange={e => setDateRange(r => ({ ...r, to: e.target.value }))} className="border px-2 py-1 rounded shadow" title="To date" />
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="border px-2 py-1 rounded shadow" title="Filter by category">
            <option value="all">All Categories</option>
            {eventCategories.map(cat => (<option key={cat.key} value={cat.key}>{cat.label}</option>))}
          </select>
          {role === 'organiser' && (
            <Button onClick={() => navigate('/create-event')} className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg p-2">
              <ImagePlus className="inline mr-1 h-5 w-5" /> Create Event
            </Button>
          )}
        </div>
      </div>

      {/* Event cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredEvents.map((evt, idx) => {
            const cat = getCategory(evt)
            const progress = Math.round((evt.registrations / evt.capacity) * 100)
            const isFeatured = evt.registrations > evt.capacity * 0.7
            return (
              <motion.div key={evt.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, delay: idx * 0.07 }}>
                <Card className={`cursor-pointer border-2 border-transparent hover:border-blue-400 transition relative overflow-hidden shadow-lg ${idx % 3 === 0 ? statGradients[0] : idx % 3 === 1 ? statGradients[1] : statGradients[2]}`} onClick={() => openDetails(evt)}>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded overflow-hidden shadow-lg border-2 border-white relative">
                      {evt.poster ? <img src={evt.poster} alt="poster" className="w-full h-full object-cover rounded" /> : <span className="text-xs text-gray-500">No Poster</span>}
                      {isFeatured && <span className="absolute top-1 left-1 bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 shadow animate-fade-in"><BadgeCheck className="h-4 w-4" /> Featured</span>}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold flex items-center gap-2 text-white drop-shadow">
                        <Info className="h-4 w-4 text-yellow-300" /> {evt.title}
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${cat.color}`}>{cat.label}</span>
                        {isFeatured && <Star className="h-4 w-4 text-yellow-300 animate-pulse" />}
                      </div>
                      <div className="text-sm text-blue-100 flex items-center gap-1 mt-1"><CalendarDays className="h-4 w-4" />{evt.date}</div>
                      <div className="text-white/90 line-clamp-2 mt-1">{evt.description}</div>
                      {/* Progress bar */}
                      <div className="w-full mt-2">
                        <div className="flex items-center gap-2 text-xs text-white">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/30 rounded">
                          <div className={`h-2 rounded ${progress > 80 ? 'bg-green-400' : progress > 50 ? 'bg-yellow-400' : 'bg-blue-400'}`} style={{ width: `${progress}%`, transition: 'width 0.5s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Participate button below card for non-organisers */}
                {role !== 'organiser' && (
                  <Button onClick={() => handleParticipate(evt)} className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5" /> Participate
                  </Button>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Details modal */}
      <Modal open={detailsOpen} onClose={() => setDetailsOpen(false)}>
        {selectedEvent && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="font-bold text-lg mb-2 flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              <Info className="h-5 w-5 text-yellow-300" /> {selectedEvent.title} <Star className="h-5 w-5 text-yellow-300 animate-pulse" />
              <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${getCategory(selectedEvent).color}`}>{getCategory(selectedEvent).label}</span>
            </div>
            <div className="mb-1 text-blue-700 flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {selectedEvent.date}</div>
            <div className="mb-2 text-gray-700">{selectedEvent.description}</div>
            <div className="mb-2 text-xs flex items-center gap-2 text-green-700"><Users className="h-4 w-4" /><span className="font-semibold">Capacity:</span> {selectedEvent.capacity}</div>
            <div className="mb-2 text-xs flex items-center gap-2 text-pink-700"><Users className="h-4 w-4" /><span className="font-semibold">Registrations:</span> {selectedEvent.registrations}</div>

            {/* Actions */}
            <div className="flex gap-2 mt-2 flex-wrap">
              <Button onClick={() => handleCopyLink(selectedEvent)} className="bg-blue-500 text-white flex items-center gap-1"><Link2 className="h-4 w-4" /> Copy Link</Button>
              {selectedEvent.poster && <Button onClick={() => handleDownloadPoster(selectedEvent)} className="bg-green-500 text-white flex items-center gap-1"><Download className="h-4 w-4" /> Download Poster</Button>}
              {role !== 'organiser' && <Button onClick={() => handleParticipate(selectedEvent)} className="bg-pink-500 text-white flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Participate</Button>}
            </div>
          </motion.div>
        )}
      </Modal>

      <Toast open={!!toast} message={toast} />
    </div>
  )
}

export default EventsPage
