import { Sparkles, Users, Calendar, BarChart, Smartphone, Shield, Bell, FileText, Star } from 'lucide-react'
import Card from '../components/Card'

const AboutPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] py-8">
    <Card className="max-w-3xl w-full mx-auto shadow-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 rounded-2xl">
      
      {/* Heading */}
      <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-fade-in">
        <Sparkles className="h-7 w-7 text-yellow-400 animate-spin" />
        About College Event Management
      </h2>

      {/* Intro para */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        Our <span className="font-semibold text-purple-600">College Event Management System</span> 
        makes it easier for colleges and students to <span className="text-blue-600">create, organize, 
        manage, and participate</span> in events. With interactive dashboards, attendance tracking, and 
        real-time updates, the platform ensures smooth execution of college activities.
      </p>

      {/* Features Section */}
      <h3 className="text-xl font-bold mb-3 text-purple-700">✨ Key Features</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-blue-800">
        <li className="flex items-center gap-2"><Calendar className="h-5 w-5 text-pink-500" /> Event creation & scheduling</li>
        <li className="flex items-center gap-2"><Users className="h-5 w-5 text-green-500" /> Easy student registration</li>
        <li className="flex items-center gap-2"><Shield className="h-5 w-5 text-red-500" /> Secure login & authentication</li>
        <li className="flex items-center gap-2"><FileText className="h-5 w-5 text-indigo-500" /> Digital certificates & reports</li>
        <li className="flex items-center gap-2"><BarChart className="h-5 w-5 text-orange-500" /> Live stats & analytics dashboard</li>
        <li className="flex items-center gap-2"><Smartphone className="h-5 w-5 text-blue-500" /> Fully responsive design</li>
        <li className="flex items-center gap-2"><Bell className="h-5 w-5 text-yellow-500" /> Real-time notifications & alerts</li>
        <li className="flex items-center gap-2"><Star className="h-5 w-5 text-purple-500" /> Feedback & rating system</li>
      </ul>

      {/* Tech Stack */}
      <h3 className="text-xl font-bold mt-6 mb-3 text-purple-700">🛠️ Tech Stack</h3>
      <p className="text-gray-700">
        Built with <span className="font-semibold">React</span>, <span className="font-semibold">TailwindCSS</span>, 
        <span className="font-semibold"> Vite</span>, and integrated with modern APIs for smooth performance.
      </p>

      {/* Footer note */}
      <p className="mt-5 text-sm text-gray-500 text-center italic">
        🚀 Designed for colleges to simplify event management, improve participation, and save time.
      </p>
    </Card>
  </div>
)

export default AboutPage
