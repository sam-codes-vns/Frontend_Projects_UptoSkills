

# 📘 College Event Management System

## 🚀 Introduction
The **College Event Management System** is a web-based application designed to manage college events in one platform.  
It provides three user roles:

- 🎓 **Organizer** → Manage events, users, and attendance  
- 🧑‍🤝‍🧑 **Attendant** → Participate in events and mark attendance  
- 🤝 **Volunteer** → Assist in events, manage tasks, and mark attendance  

Each user has a separate dashboard with role-specific features.

---

## 🎯 Features

### 🔹 Organizer Role
**Dashboard showing:**
- Live Register Count  
- Total Events  
- Total Users  
- Recent Activity (static for now)  
- System Overview Graph (registrations, events, users)  
- User Role Graph (Organizers, Attendants, Volunteers)  

**Event Management:**
- View events (with sorting by name, date, category)  
- Create new events (title, date, category, capacity, description, poster upload)  

**Attendance Management:**
- View attendance list  
- Delete attendance if needed  

**About Page** → Shows system details  

---

### 🔹 Attendant Role
**Dashboard showing:**
- Events joined  
- Upcoming events  
- My tickets/passes  
- Reminders for events  

**Events:**
- View event details  
- Join/Participate in events  
- Sort events by name, date, category  

**Attendance:**
- Mark attendance by User ID or QR scan  
- View event name, time, and user details after marking  

**About Page** → Same as organizer  

---

### 🔹 Volunteer Role
**Dashboard showing:**
- Assigned tasks  
- Completed tasks  
- Events where volunteering  
- Attendance records  
- Volunteer leaderboard (ranking)  
- Notifications & Achievements  

**Events:**
- View events  
- Participate as helper  

**Attendance:**
- Mark attendance (same as attendant, by ID or QR scan)  

**About Page** → Same as other roles  

---

## 🗂️ File Structure
```bash
college-event-management-system/
├── public/                 # Static files
│   └── vite.svg
├── src/
│   ├── assets/             # Images, posters, icons
│   ├── components/         # Reusable components (Navbar, Card, Button, etc.)
│   ├── contexts/           # Context API (Theme, Auth, Role handling)
│   ├── hooks/              # Custom hooks (mock data, role-based logic)
│   ├── pages/              # Main pages
│   │   ├── Auth/           # Login & Register
│   │   ├── Organizer/      # Organizer Dashboard, Events, Attendance, About
│   │   ├── Attendant/      # Attendant Dashboard, Events, Attendance, About
│   │   ├── Volunteer/      # Volunteer Dashboard, Events, Attendance, About
│   │   └── Shared/         # About page & common pages
│   ├── App.jsx             # Main app with routes
│   ├── main.jsx            # ReactDOM entry point
│   └── index.css           # Global styles
├── .eslintrc.cjs           # ESLint config
├── package.json            # Dependencies
├── vite.config.js          # Vite config
└── README.md               # Project documentation

---

### **⚙️ Installation & Setup**

Clone the repository:

git clone https://github.com/sam-codes-vns/Frontend_Projects_UptoSkills.git

cd college-event-management-system


Install dependencies:

npm install


Start the development server:

npm run dev


Open in browser:

http://localhost:5173

🛠️ Technologies Used

Frontend: React + Vite

State Management: Context API

Routing: React Router DOM

Styling: Tailwind CSS + Shadcn/UI Components

Icons: Lucide React

Animations: Framer Motion

Charts: Recharts

The College Event Management System makes it simple to:

---

📌 Organizers → Manage events and attendance

📌 Attendants → Join events and mark attendance

📌 Volunteers → Assist in events and manage tasks

👉 This system ensures that college events are digital, organized, and user-friendly.
