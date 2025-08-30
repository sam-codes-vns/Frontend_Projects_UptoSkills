import { useState } from 'react'

export default function useRole(defaultRole = 'organizer') {
  const [role, setRole] = useState(defaultRole)
  return [role, setRole]
}