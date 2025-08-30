const Button = ({ children, disabled, ...props }) => (
  <button
    className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)

export default Button
