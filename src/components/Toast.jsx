const Toast = ({ open, message }) => {
  if (!open) return null
  return (
    <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
      {message}
    </div>
  )
}

export default Toast
