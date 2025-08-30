export const events = [
  {
    id: 'evt1',
    name: 'Tech Symposium',
    date: '2024-07-10',
    poster: '',
    description: 'A symposium for tech enthusiasts.',
    registrations: 42,
  },
  {
    id: 'evt2',
    name: 'Cultural Fest',
    date: '2024-08-05',
    poster: '',
    description: 'Annual cultural festival.',
    registrations: 58,
  },
]

export const users = [
  { id: 'u1', name: 'Alice', role: 'organizer' },
  { id: 'u2', name: 'Bob', role: 'volunteer' },
  { id: 'u3', name: 'Charlie', role: 'participant' },
]

export const registrations = [
  { id: 'r1', eventId: 'evt1', userId: 'u3', attended: false },
]
