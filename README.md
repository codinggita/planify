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

Step 7 - feat: add task pagination
- Added robust `.env` variables to backend for MongoDB Atlas connection
- Updated Express `getTasks` controller to process `pageNumber` and `limit`, utilizing Mongoose `.skip()` and `.limit()`
- Returned pagination metadata (`total`, `page`, `pages`) from API
- Built reusable React `Pagination` component with previous/next and numbered page buttons
- Wired frontend `Dashboard` state to track active page and dynamically re-fetch data on click
- Status: COMPLETED

Step 8 - feat: add form validation with zod and react-hook-form
- Installed `react-hook-form`, `zod`, and `@hookform/resolvers`
- Created centralized input validation schemas in `features/validation/schemas.js` (email patterns, character limits, enums)
- Refactored `LoginForm`, `SignupForm`, and `TaskFormModal` to replace manual state with Zod Resolvers
- Display dynamic inline error messages matching input fields
- Status: COMPLETED

Step 9 - feat: add error handling and toast notifications
- Installed `react-hot-toast` for global success/error popups
- Updated Context Providers to display native toasts instead of simple string errors
- Created a top-level `ErrorBoundary` React Class Component to catch JS crashes and prevent white screens
- Status: COMPLETED

Step 10 - feat: add task progress tracking
- Added `/api/tasks/stats` backend endpoint to count total and completed tasks
- Updated `taskService` and `TaskContext` to fetch and store global user task statistics
- Created animated `ProgressTracker` component displaying completed tasks vs total tasks with dynamic bar
- Added ProgressTracker to `Dashboard`
- Status: COMPLETED

Step 11 - feat: add drag and drop kanban board
- Installed `@hello-pangea/dnd` for drag and drop support
- Added `updateTaskStatus` to `TaskContext` with optimistic UI updates (instant visual feedback, reverts on error)
- Created `KanbanCard` (draggable task card) and `KanbanBoard` (3-column Droppable layout)
- Added a List/Board view toggle to the Dashboard header
- Board view fetches all tasks (limit=100) for full Kanban visibility
- Status: COMPLETED

Step 12 - feat: add productivity streak system
- Added `streak` and `lastActive` fields to MongoDB User schema
- Updated backend Authentication logic to calculate consecutive daily logins and automatically persist `streak`
- Created `StreakBadge` component to display active fire streaks
- Added the streak badge to the top Navbar explicitly for logged-in users
- Status: COMPLETED

Step 13 - feat: add task notes and edit mode
- Added `notes` string to MongoDB Task schema
- Refactored `TaskFormModal` to conditionally act as an "Edit Task" modal
- Populated `TaskFormModal` default values with existing task data if being edited
- Wired up the "Edit" buttons on both the List view cards and the Kanban Board cards
- Status: COMPLETED

Step 14 - feat: add activity history feed
- Created `Activity` MongoDB model and `/api/activity` Express routes to log actions
- Intercepted Task creation, completion, and deletion events in `taskController.js` to automatically log activities
- Designed and built the `<ActivityFeed />` vertical timeline UI component
- Mounted `ActivityFeed` into the main `Dashboard.jsx` interface
- Status: COMPLETED

Step 15 - feat: add real-time platform analytics visualization
- Created public `/api/tasks/public/stats` endpoint for aggregated platform data
- Implemented dedicated "Analytics Visualized" showcase section on the landing page
- Integrated live backend data (total tasks, completion rates) instead of mock values
- Status: COMPLETED

Step 16 - feat: refine task logic and auth error handling
- Locked task status during edits to prevent unauthorized workflow changes
- Implemented `clearError` and `formatAuthError` in `AuthContext`
- Technical errors (502, 500) now map to user-friendly, branded messages
- Automated error clearing during navigation between login and signup
- Status: COMPLETED

Step 17 - feat: secure deployment and cross-platform connectivity
- Configured dynamic CORS security in `server.js` using `ALLOWED_ORIGINS`
- Created Netlify `_redirects` for production API proxying to Render
- Verified live connectivity between Netlify frontend and Render backend
- Updated `.env.example` with full production environment requirements
- Status: COMPLETED



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
