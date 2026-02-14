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
