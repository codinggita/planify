Planify

Planify is a smart task and productivity management web application that helps users organize tasks, track progress, and maintain focus on their goals.
The application allows users to create, manage, and monitor tasks efficiently using modern full-stack technologies.

The platform is designed to improve productivity by providing features such as task prioritization, deadlines, filtering, search, and a built-in focus timer.

Project Description

Many students and developers struggle to manage multiple assignments, deadlines, and daily tasks efficiently. Traditional to-do list applications often lack productivity insights and proper organization tools.

Planify solves this problem by providing a centralized task management system where users can organize tasks, track progress, and stay focused while working or studying.

Features

Development Progress

Step 1 - feat: add routing and basic pages with Tailwind layout
- Set up React Router with BrowserRouter
- Created 5 routes: / | /login | /signup | /dashboard | /profile
- Built sticky Navbar with active link highlighting
- Created page shells for Home, Login, Signup, Dashboard, Profile
- Configured Tailwind CSS with reusable component classes (btn, card, input, badge)
- Status: COMPLETED

Step 2 - feat: add dark/light theme toggle with localStorage persistence
- Created ThemeContext with localStorage persistence
- Created ThemeToggle Sun/Moon component
- Configured Tailwind HTML dark mode switching
- Status: COMPLETED

Step 3 - feat: add authentication context and login/signup forms
- Created AuthContext for global user state
- Implemented Login and Signup forms with React state
- Built mock authService simulating API delays and JWT generation
- Updated Navbar and Profile to dynamically show logged-in user details
- Stored mock JWT in localStorage to mimic accurate session persistence
- Status: COMPLETED

Step 4 - feat: add backend authentication APIs (Node, Express, MongoDB, JWT)
- Set up Express server with CORS and error handling middleware
- Configured MongoDB connection via Mongoose
- Created User model with bcrypt password hashing
- Created Auth logic (register, login, get user profile) with JWT signing
- Protected routes using JWT verification middleware
- Switched frontend authService to use real Axios HTTP calls
- Status: COMPLETED

Step 5 - feat: add task CRUD with MongoDB and React Context
- Created Task Mongoose Model with title, description, status, priority, dueDate, tags
- Created Task Express Controller (getTasks, createTask, updateTask, deleteTask)
- Created protected Express Task Routes mapping to the Controller
- Built frontend `taskService` to make authorized Axios HTTP calls
- Built frontend `TaskContext` holding global tasks state, fetching dynamically on login
- Created fully functional `Dashboard` mapping over real data instead of placeholders
- Created a reusable `Modal` component
- Created a `TaskFormModal` for creating new UI tasks
- Status: COMPLETED

Step 6 - feat: add task search, filter, sort and debouncing
- Updated Express `getTasks` controller to process `req.query` for search (regex), status, priority, and sort options
- Built `useDebounce` custom React hook to delay API calls while typing
- Created `SearchBar`, `FilterPanel`, and `SortDropdown` UI components
- Updated `taskService` to convert React state filters into URL Query Strings
- Integrated real-time filtering into the `Dashboard`
- Status: COMPLETED

Step 7 - Pagination — coming next
Step 8 - Form Validation
Step 9 - Error Handling
Step 10 - Task Progress Tracking
Step 11 - Drag and Drop Tasks
Step 12 - Productivity Streak System
Step 13 - Task Notes
Step 14 - Activity History



User Authentication (Signup & Login)

Protected Routes for authenticated users

Task CRUD Operations (Create, Read, Update, Delete)

Task Priorities (High / Medium / Low)

Task Deadlines

Subtasks for breaking large tasks into smaller steps

Task Categories (Study, Personal, Projects, etc.)

Search functionality

Filtering and Sorting tasks

Pagination for large task lists

Dashboard productivity statistics

Pomodoro focus timer

Dark Mode / Light Mode support

Responsive UI for desktop, tablet, and mobile

Tech Stack

Frontend
React.js
Tailwind CSS
React Router
Context API

Backend
Node.js
Express.js

Database
MongoDB

Project Structure
planify/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── utils/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
│
└── README.md
Prerequisites

Before running the project, make sure you have the following installed:

Node.js (v18 or higher)

npm or yarn

MongoDB or MongoDB Atlas

Environment Variables

Create a .env file inside the server folder.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Installation

Clone the repository

git clone https://github.com/yourusername/planify.git

Navigate to the project directory

cd planify

Install backend dependencies

cd server
npm install

Install frontend dependencies

cd ../client
npm install
Run the Project

Start the backend server

cd server
npm run dev

Start the frontend

cd client
npm start

Application will run on:

Frontend
http://localhost:3000

Backend API
http://localhost:5000

Scripts

Common scripts used in the project:

npm run dev
npm start
npm run build

These commands start the development server, production server, or build the frontend.

App Routes

Public Routes

/
 /login
 /signup

User Routes

/dashboard
/tasks
/profile
/settings
API Endpoints

Authentication

POST /api/auth/signup
POST /api/auth/login

Tasks

GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

Users

GET /api/users/profile
PUT /api/users/profile
Security Notes

Never commit .env files to GitHub

Keep API keys and database credentials private

Use .env.example to show required environment variables

Implement proper validation for user inputs

Deployment

Frontend
Vercel / Netlify

Backend
Render / Railway

Database
MongoDB Atlas

Summary

Planify is a full-stack productivity application built using the MERN stack.
It allows users to manage tasks efficiently, track productivity, and stay focused using modern web technologies.

The project demonstrates key full-stack development concepts including authentication, API development, database integration, and responsive UI design.
