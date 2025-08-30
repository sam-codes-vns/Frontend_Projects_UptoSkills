import { GraduationCap, Github, Linkedin, Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

const iconHover = {
  whileHover: { scale: 1.2, color: "#f59e42" },
  transition: { type: "spring", stiffness: 300, damping: 20 }
}

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="w-full relative bg-gradient-to-r from-blue-900 via-purple-800 to-pink-600 text-white py-10 px-4 mt-12"
  >
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 animate-pulse" />
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-3">
        <GraduationCap className="h-8 w-8 text-yellow-300 bg-blue-900 rounded-full p-1 shadow-lg" />
        <span className="font-extrabold text-xl tracking-wide bg-gradient-to-r from-yellow-300 via-white to-blue-200 bg-clip-text text-transparent">
          College Event Management
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex gap-4 items-center">
          <motion.a
            href="mailto:info@college.edu"
            className="flex items-center gap-1 px-2 py-1 rounded transition hover:bg-yellow-300 hover:text-blue-900"
            {...iconHover}
          >
            <Mail className="h-5 w-5" /> info@college.edu
          </motion.a>
          <motion.a
            href="tel:+1234567890"
            className="flex items-center gap-1 px-2 py-1 rounded transition hover:bg-yellow-300 hover:text-blue-900"
            {...iconHover}
          >
            <Phone className="h-5 w-5" /> +1 234 567 890
          </motion.a>
        </div>
        <div className="flex gap-4 items-center">
          <motion.a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 rounded transition hover:bg-yellow-300 hover:text-blue-900"
            {...iconHover}
          >
            <Github className="h-5 w-5" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 rounded transition hover:bg-yellow-300 hover:text-blue-900"
            {...iconHover}
          >
            <Linkedin className="h-5 w-5" />
          </motion.a>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-blue-100 gap-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        &copy; {new Date().getFullYear()} <span className="font-semibold text-yellow-300">College Event Management</span>. All rights reserved.
      </motion.div>
      <div className="flex gap-2">
        <motion.span
          className="mr-2 px-2 py-1 rounded transition hover:bg-yellow-300 hover:text-blue-900 cursor-pointer"
          whileHover={{ scale: 1.1, backgroundColor: "#f59e42", color: "#2563eb" }}
        >
          Privacy Policy
        </motion.span>
        <motion.span
          className="mr-2 px-2 py-1 rounded transition hover:bg-yellow-300 hover:text-blue-900 cursor-pointer"
          whileHover={{ scale: 1.1, backgroundColor: "#f59e42", color: "#2563eb" }}
        >
          Terms of Service
        </motion.span>
        <motion.span
          className="px-2 py-1 rounded transition hover:bg-yellow-300 hover:text-blue-900 cursor-pointer"
          whileHover={{ scale: 1.1, backgroundColor: "#f59e42", color: "#2563eb" }}
        >
          Contact Us
        </motion.span>
      </div>
    </div>
  </motion.footer>
)

export default Footer
