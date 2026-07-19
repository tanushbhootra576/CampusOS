# 🎓 CampusOS

CampusOS is a comprehensive, centralized platform built with an editorial approach to campus management. Designed for pure clarity and zero friction, CampusOS streamlines everything from event registrations and project showcasing to community management and administrative workflows.

---

## 🚀 Features & Modules

### 1. **Authentication & Roles**
- Secure login and registration using **NextAuth.js**.
- Support for **Credentials** (Email/Password) and **Google OAuth**.
- Role-based Access Control (RBAC):
  - **Students/Users**: Can register for events, read blogs, post projects, and view leaderboards.
  - **Admins**: Can manage specific communities, approve projects, and manage event attendance.
  - **Super Admins**: Full platform oversight, audit logs, and system settings.

### 2. **Dashboards**
- Dedicated dashboards for users (`/dashboard`), providing an overview of "My Clubs," "My Events," "My Projects," and certificates.
- Admin dashboard (`/admin`) for analytics and approval queues.
- Super Admin dashboard (`/super-admin`) for platform-wide metrics.

### 3. **Events Module**
- Browse upcoming workshops, hackathons, and sports events.
- Seamless one-click registration.
- **Location**: `src/modules/events`

### 4. **Projects Showcase**
- A gallery of innovative projects built by the CampusOS community.
- Filter by tech stack, view repository links, and see live demos.
- **Location**: `src/modules/projects`

### 5. **Additional Modules**
- **Blogs**: Campus news, student articles, and community updates.
- **Communities**: Dedicated pages for clubs, complete with their own events and member lists.
- **Gallery**: Photo albums of past events and campus life.
- **Leaderboard**: Gamified rankings based on student achievements and engagement.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & custom fluid magnetic components.
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using raw `mongodb` driver & `mongoose` schemas).
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (v4)

---

## 🏗️ Project Architecture

The project leverages Next.js App Router conventions.

```text
campusos/
├── app/
│   ├── (public)/         # Publicly accessible routes (About, Landing)
│   ├── (protected)/      # Routes requiring authentication (Dashboards)
│   ├── admin/            # Admin routes
│   ├── api/              # Backend API routes (/api/events, /api/auth)
│   ├── auth/             # Authentication pages (Login, Register)
│   └── ...               # Module specific routes (blogs, events, projects)
├── src/
│   ├── components/       # Reusable UI components (Navbar, Buttons)
│   ├── db/               # Mongoose models and schemas
│   ├── lib/              # Utility functions, DB clients, and helpers
│   └── modules/          # Feature-specific components (e.g., EventList, ProjectShowcase)
├── public/               # Static assets (images, icons)
├── .env.local            # Environment variables (not tracked by git)
└── package.json          # Dependencies and scripts
```

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js (v18+)
- Local or Cloud MongoDB Database

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root of the project with the following variables:
```env
# URL of your Next.js application (required for NextAuth)
NEXTAUTH_URL=http://localhost:3000

# Secret used to encrypt session cookies (Generate a random string)
NEXTAUTH_SECRET=your_super_secret_string

# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/campusos

# (Optional) Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development without a Database (Mock Mode)
The application has been designed to gracefully handle development even if a MongoDB instance is not connected. 
- **Authentication**: Handled via mock credentials. You can log in using *any* email and password combo (e.g., `student@campus.edu` / `password`).
- **Data Fetching**: API routes (like `/api/events` and `/api/projects`) will automatically fall back to returning mock data if the database connection fails, preventing the UI from crashing.

---

## 🔒 Authentication Flow
CampusOS uses **NextAuth.js** with JWT sessions. 
- The `middleware.ts` file sits at the edge and automatically intercepts requests to protected routes (like `/dashboard`, `/my-events`, `/admin`). 
- If a user attempts to access these routes without a valid JWT token, they are immediately redirected to `/auth/signin`.

---

## 👨‍💻 Contributing
When adding new modules:
1. Create your backend logic in `app/api/<module>/route.ts`.
2. Build your feature components inside `src/modules/<module>/`.
3. Wire the pages up in the `app/<module>/page.tsx` directories.
