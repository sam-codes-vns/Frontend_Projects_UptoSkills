const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white rounded shadow p-4 md:p-6 transition hover:shadow-lg ${className}`} {...props}>
    {children}
  </div>
)

export default Card
