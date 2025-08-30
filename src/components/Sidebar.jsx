import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/events', label: 'Events' },
  { to: '/register', label: 'Register' },
  { to: '/attendance', label: 'Attendance' },
  { to: '/about', label: 'About' },
]

const Sidebar = () => {
  const location = useLocation()
  return (
    <aside className="w-48 bg-white border-r min-h-full p-4">
      <ul className="space-y-2">
        {links.map(link => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`block px-2 py-1 rounded ${location.pathname === link.to ? 'bg-blue-100 font-semibold' : 'hover:bg-blue-50'}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
