# CollabStudy - Collaborative Study Platform

A modern, collaborative study platform built with Angular and Node.js, featuring real-time chat, note sharing, session scheduling, and room management. Designed with Google Classroom-inspired dark theme for a professional and comfortable study experience.

## 🚀 Features

### Frontend (Angular)
- **Modern Dark Theme**: Google Classroom-inspired design with Material Design
- **Session Calendar**: Interactive calendar for scheduling and viewing study sessions
- **Room Management**: Create and join study rooms with different subjects
- **Real-time Chat**: Live messaging within study rooms
- **Note Sharing**: Upload and share study materials with room members
- **Notifications**: Stay updated with room activities and session reminders
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Backend (Node.js + Express)
- **RESTful API**: Complete backend API for all application features
- **Real-time Communication**: Socket.IO integration for live features
- **MongoDB Integration**: Robust database management with Mongoose
- **File Upload**: Multer integration for note and material uploads
- **User Authentication**: JWT-based secure authentication system

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 20.3.x with standalone components
- **UI Library**: Angular Material with custom dark theme
- **Styling**: CSS3 with CSS Variables for theming
- **Icons**: Material Icons
- **Build**: Angular CLI with ESBuild

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.IO for live features
- **File Upload**: Multer middleware
- **Development**: Nodemon for auto-restart

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- Angular CLI
- Git

### Frontend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/collabstudy.git
   cd collabstudy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   API_BASE_URL=http://localhost:5000/api
   SOCKET_URL=http://localhost:5000
   NODE_ENV=development
   ```

4. **Start the development server**:
   ```bash
   ng serve
   # or
   npm start
   ```
   Navigate to `http://localhost:4200`

### Backend Setup
1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Backend Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   Edit `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/collabstudy
   PORT=5000
   JWT_SECRET=your_secure_jwt_secret
   CORS_ORIGIN=http://localhost:4200
   ```

4. **Start MongoDB and run backend**:
   ```bash
   # Start MongoDB (varies by OS)
   mongod
   
   # Start backend server
   npm run dev
   ```
   Backend API available at `http://localhost:5000`

## 🎨 Dark Theme Features

- **Google Classroom Inspired Design**: Professional and clean interface
- **Material Design 3**: Latest design system with dark theme support
- **Custom Color Palette**: Purple (#bb86fc) and teal (#03dac6) accents
- **Consistent Theming**: CSS variables for easy theme customization
- **Accessibility**: High contrast ratios and proper color combinations

## 📁 Project Structure

```
collabstudy/
├── src/app/                  # Angular application
│   ├── chat/                 # Chat functionality
│   ├── notes/                # Notes management
│   ├── rooms/                # Study rooms
│   ├── sessions/             # Session calendar
│   └── notifications/        # Notifications
├── backend/                  # Node.js backend
│   ├── routes/               # API routes
│   ├── models/              # Database models
│   └── server.js            # Express server
├── .env.example             # Environment template
└── README.md               # This file
```
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`

5. **Build for Production**
   ```bash
   ng build --configuration production
   ```

## Project Structure

```
src/
├── app/
│   ├── layout/                 # Main layout component with navigation
│   ├── rooms/                  # Study rooms module
│   ├── sessions/               # Session management module
│   ├── notes/                  # Notes sharing module
│   ├── chat/                   # Chat system module
│   └── notifications/          # Notification system
├── environments/               # Environment configurations
└── styles.css                 # Global dark theme styles
```

## Environment Variables

The application uses the following environment variables (see `.env.example`):

- `API_BASE_URL` - Backend API endpoint
- `DB_*` - Database configuration
- `JWT_SECRET` - JWT authentication secret
- `GOOGLE_CLIENT_ID` - Google OAuth configuration
- Feature flags for enabling/disabling modules

## Dark Theme

The application features a comprehensive dark theme using CSS variables:

- Primary color: `#bb86fc` (Material Design Purple)
- Secondary color: `#03dac6` (Material Design Teal)
- Background: `#121212` (Material Design Dark Surface)
- All Material components are themed for dark mode

## Development Guidelines

1. **Component Structure**: Use standalone components with Angular 20+
2. **Styling**: Use CSS variables from the global theme
3. **Icons**: Use Material Icons for consistency
4. **Responsive**: Design mobile-first with Material breakpoints

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
