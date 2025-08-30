import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import MainLayout from "./layouts/MainLayout"
import DashboardPage from "./pages/DashboardPage"        // Organiser
import AttendentPage from "./pages/AttendentPage"        // Attendent
import VolunteerPage from "./pages/VolunteerPage"        // Volunteer
import EventsPage from "./pages/EventsPage"
import RegisterPage from "./pages/RegisterPage"
import AttendancePage from "./pages/AttendancePage"
import CreateEventPage from "./pages/CreateEventPage"
import LoginPage from "./pages/LoginPage"
import AboutPage from "./pages/AboutPage"
import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Login page without layout */}
        <Route path="/" element={<LoginPage />} />

        {/* Main layout ke andar routes */}
        <Route element={<MainLayout />}>
          {/* Organiser */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Attendent */}
          <Route path="/attendent-dashboard" element={<AttendentPage />} />
          {/* Volunteer */}
          <Route path="/volunteer-dashboard" element={<VolunteerPage />} />

          <Route path="/events" element={<EventsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Wrong URL → redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
