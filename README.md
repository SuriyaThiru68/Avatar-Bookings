# ProConnect 🌟

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://reactjs.org/)

**ProConnect** is a modern, full-stack booking platform that connects clients with world-class professionals for 1-on-1 consultation sessions. Built with React, Express, and featuring a beautiful UI powered by Tailwind CSS and Framer Motion.

![ProConnect Homepage](https://via.placeholder.com/1200x600/4F46E5/ffffff?text=ProConnect+-+Connect+with+the+Best)

## ✨ Features

### 🔐 Authentication & User Management
- **Secure Authentication**: User registration and login with bcrypt password hashing
- **Session Management**: Persistent sessions using express-session
- **Role-Based Access**: Support for Clients, Professionals, and Admin roles
- **User Profiles**: Detailed profile pages with statistics and activity tracking

### 📅 Booking System
- **Browse Experts**: Hand-picked selection of top-rated professionals
- **Advanced Search**: Filter by specialty, role, and availability
- **Booking History**: Complete history with status tracking (Upcoming, Completed, Cancelled)
- **Real-time Status**: Live booking status with visual indicators
- **Multi-Channel Communication**: Message, email, and call professionals directly
- **Video Conferencing**: One-click join for virtual sessions
- **Booking Management**:
  - **Reschedule**: Easily change appointment dates and times
  - **Cancellation**: Cancel bookings with cancellation tracking
  - **Session Notes**: Access and review session notes from professionals
  - **Receipt Download**: Download payment receipts for completed sessions
- **Review System**: Leave ratings and reviews for completed sessions
- **Quick Actions**: Mobile-responsive action buttons with tooltips

### 💼 Professional Features
- **Professional Dashboard**: Dedicated dashboard for service providers
- **Availability Management**: Control your schedule and availability
- **Rating System**: Track your ratings and reviews
- **Client Management**: View and manage client bookings

### 🎨 Modern UI/UX
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **Dark/Light Theme**: Support for both light and dark modes
- **Accessible**: Built with accessibility in mind using Radix UI components

### 🧭 Navigation System
- **Smooth Scrolling**: Navigate between sections with smooth scroll animations
- **Smart Routing**: Client-side routing with Wouter for instant page transitions
- **Protected Routes**: Automatic redirects for unauthenticated users
- **Breadcrumb Navigation**: Clear "Back" buttons on all pages
- **Footer Navigation**: Comprehensive footer links for easy access
- **Header Menu**: Fixed header with dropdown user menu
- **CTA Integration**: Call-to-action buttons throughout the site
- **Mobile-Friendly**: Touch-optimized navigation for mobile devices

## � Quick Start

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn**
- **PostgreSQL** (optional - uses in-memory storage by default)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/proconnect.git
   cd proconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   # Create a .env file in the root directory
   DATABASE_URL=postgresql://user:password@localhost:5432/proconnect
   SESSION_SECRET=your-secret-key-here
   PORT=5000
   ```

4. **Push database schema** (if using PostgreSQL)
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Wouter** - Lightweight routing
- **TanStack Query** - Server state management
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **Drizzle ORM** - TypeScript ORM
- **PostgreSQL** - Database (optional)
- **bcryptjs** - Password hashing
- **express-session** - Session management

### Build Tools
- **Vite** - Next-generation frontend tooling
- **esbuild** - Fast JavaScript bundler

## � Project Structure

```
proconnect/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions
│   │   └── assets/         # Images and static assets
│   └── index.html
├── server/                 # Backend Express application
│   ├── routes/             # API routes
│   │   └── auth.js         # Authentication endpoints
│   ├── index.js            # Server entry point
│   ├── db.js               # Database connection
│   └── vite.js             # Vite integration
├── shared/                 # Shared code between client/server
│   └── schema.js           # Database schema
└── package.json
```

## � API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:client       # Start only Vite dev server

# Production
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes to database
```

## 🎯 Usage

### For Clients

1. **Register an account** by clicking "Join Now"
2. **Browse professionals** on the homepage
3. **Book a session** with your preferred expert
4. **Manage bookings** from your profile dashboard
5. **Track history** in the "My Bookings" page

### For Professionals

1. **Register as a Professional** during sign-up
2. **Complete your profile** with expertise and availability
3. **Manage bookings** through the professional dashboard
4. **Track ratings** and client feedback
5. **Update availability** as needed

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ Secure session management
- ✅ HTTP-only cookies
- ✅ CSRF protection
- ✅ Input validation
- ✅ SQL injection prevention via Drizzle ORM

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database (optional - uses in-memory storage if not provided)
DATABASE_URL=postgresql://user:password@localhost:5432/proconnect

# Session Secret (change in production!)
SESSION_SECRET=your-super-secret-key-here

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

## 🚧 Development Mode

In development mode without a database:
- Uses **in-memory storage** for users
- Data is lost on server restart
- Perfect for testing and development
- No PostgreSQL setup required

## � Production Deployment

### With Database

1. **Set up PostgreSQL database**
2. **Set environment variables**
3. **Push database schema**
   ```bash
   npm run db:push
   ```
4. **Build and start**
   ```bash
   npm run start
   ```

### Deploy to Cloud

ProConnect can be deployed to:
- **Vercel** (recommended for frontend + serverless)
- **Railway** (full-stack with database)
- **Render** (full-stack with database)
- **Heroku** (full-stack with database)

## 🧭 Navigation System

### Overview
All navigation elements are fully functional across the ProConnect platform with smooth scrolling and smart routing.

### Navigation Features

#### Header Navigation (Home Page)
- **Find Experts** → Smooth scroll to experts section
- **How it Works** → Smooth scroll to how section
- **For Business** → Smooth scroll to business section
- **ProConnect Logo** → Navigate to homepage (/)
- **User Menu** (when logged in):
  - Profile → /profile
  - My Bookings → /bookings
  - Logout → Logout and redirect
- **Log In / Join Now** → Navigate to /auth

#### Main Sections
- **Search Experts Button** → Scroll to experts section
- **Get Started for Free** → Navigate to /auth
- **Talk to Sales** → Scroll to footer
- **View All Experts** → Scroll to experts section
- **Expert Cards** → Navigate to /book/:id

#### Footer Navigation
- **Platform Links**: Find Experts, How it Works, Pricing, Mobile App
- **Company Links**: About Us, Careers, Success Stories, Contact
- **Legal Links**: Privacy Policy, Terms of Service, Cookie Settings

### Page Routes

| Route | Page | Access Level |
|-------|------|-------------|
| `/` | Home | Public |
| `/auth` | Login/Register | Public |
| `/profile` | User Profile | Protected (requires login) |
| `/bookings` | Booking History | Protected (requires login) |
| `/book/:id` | Booking Flow | Public |
| `/success` | Booking Confirmation | Public |

### Navigation Types

1. **Route Navigation**: Uses Wouter's `setLocation()` for page changes
2. **Smooth Scrolling**: Uses `scrollIntoView({ behavior: 'smooth' })` for within-page navigation
3. **Protected Routes**: Automatic redirect to /auth for unauthenticated users

## 🎨 Logo & Branding

### Custom Logo Design
ProConnect features a custom-designed logo with a modern sparkle icon that replaces the default Replit symbol.

#### Logo Files
- **Favicon**: `client/public/favicon.svg` (32×32px) - Browser tab icon
- **Main Logo**: `client/public/logo.svg` (200×200px) - High-resolution logo
- **Apple Touch Icon**: `client/public/apple-touch-icon.svg` (180×180px) - iOS icon
- **Web Manifest**: `client/public/manifest.json` - PWA configuration

#### Brand Colors
```css
Primary Indigo:  #4F46E5
Bright Indigo:   #6366F1
Primary Purple:  #7C3AED
Theme Color:     #4F46E5 (used in mobile browsers)
```

#### Logo Design Elements
- **Central Star**: 8-pointed sparkle representing excellence
- **Accent Circles**: Four circles representing connections
- **Small Twinkles**: Additional sparkle effects for quality
- **Gradient Background**: Linear gradient from indigo to purple

#### Where the Logo Appears
- Browser tab icon (favicon)
- Bookmarks and history
- iOS home screen (when saved)
- Android home screen (PWA install)
- Social media shares
- Progressive Web App icon

### PWA Support
ProConnect can be installed as a Progressive Web App with:
- Custom app icon
- Standalone display mode
- App shortcuts (Find Experts, My Bookings)
- Theme color integration

## 🧪 Testing Guide

### Quick Navigation Test
1. **Homepage**
   - Click "Find Experts" → Should scroll to experts section
   - Click "Search Experts" → Should scroll to experts section
   - Click "Get Started for Free" → Should navigate to /auth
   - Click expert card → Should navigate to /book/:id

2. **Authentication**
   - Register new account → Should redirect to homepage
   - Login → Should redirect to homepage
   - Access /profile without login → Should redirect to /auth

3. **Booking Flow**
   - Select professional → Navigate to booking page
   - Select date and time → Progress to step 2
   - Complete booking → Navigate to success page
   - Click "Return Home" → Navigate to homepage

4. **User Features** (Logged In)
   - Click user avatar → Open dropdown menu
   - Navigate to Profile → View profile page
   - Navigate to Bookings → View bookings page
   - Click "New Booking" → Return to homepage
   - Logout → Navigate to /auth

### Logo Test
1. **Clear Browser Cache**: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
2. **Hard Reload**: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
3. **Check Tab Icon**: Should see purple sparkle icon (✨)
4. **Check Theme Color**: Mobile browser UI should be indigo/purple

### Browser Compatibility
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (Desktop & iOS)
- ✅ All modern browsers

## 📝 Documentation Quick Links

All documentation is consolidated in this README:
- **Features**: See sections above
- **Navigation**: See Navigation System section
- **Logo & Branding**: See Logo & Branding section
- **Testing**: See Testing Guide section
- **API**: See API Endpoints section
- **Deployment**: See Production Deployment section

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourname)

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons

## � Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x400/4F46E5/ffffff?text=Homepage)

### Authentication
![Login/Register](https://via.placeholder.com/800x400/4F46E5/ffffff?text=Authentication)

### User Profile
![User Profile](https://via.placeholder.com/800x400/4F46E5/ffffff?text=User+Profile)

### Booking History
![Bookings](https://via.placeholder.com/800x400/4F46E5/ffffff?text=Booking+History)

---

<div align="center">
  <p>Made with ❤️ by Suriya</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
