import { useTheme } from '../contexts/ThemeContext'
import { Outlet } from "react-router-dom"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const MainLayout = () => {
  const { theme } = useTheme()

  return (
    <div className={`flex flex-col min-h-screen w-full overflow-x-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      
      <main className="flex-1 w-full h-full px-0 py-0 mt-6 flex justify-center">
        <div className="w-[90%]">
          {/* Yaha pages render honge */}
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default MainLayout
