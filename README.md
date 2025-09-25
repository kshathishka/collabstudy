# CollabStudy - Collaborative Study Platform

A modern, full-stack collaborative study platform built with Angular and Node.js, featuring real-time chat, note sharing, session scheduling, and room management. Designed with Google Classroom-inspired dark theme for a professional and comfortable study experience.

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
- **Email Integration**: Nodemailer for notifications and verification
- **Rate Limiting**: Protection against abuse and spam
- **Logging**: Comprehensive logging with Winston

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
- **Authentication**: JWT with bcrypt
- **Email**: Nodemailer
- **Development**: Nodemon for auto-restart

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- Git

### Full Stack Setup
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd collabstudy
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd collabstudy-backend
   npm install
   cd ..
   ```

### Environment Configuration

#### Frontend Environment
1. **Create frontend environment file**:
   ```bash
   cp .env.example .env
   ```
   
2. **Edit `.env` with your configuration**:
   ```env
   API_BASE_URL=http://localhost:5000/api
   SOCKET_URL=http://localhost:5000
   NODE_ENV=development
   ```

#### Backend Environment
1. **Create backend environment file**:
   ```bash
   cd collabstudy-backend
   cp .env.example .env
   cd ..
   ```
   
2. **Edit `collabstudy-backend/.env`** with your configuration:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/collabstudy
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # JWT Authentication
   JWT_SECRET=your_very_secure_jwt_secret_here
   JWT_EXPIRE=7d
   
   # CORS
   CORS_ORIGIN=http://localhost:4200
   
   # File Upload
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH=./uploads
   
   # Email (Optional - for notifications)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

### Running the Application

#### Option 1: Run Both Servers Separately

1. **Start Backend Server**:
   ```bash
   cd collabstudy-backend
   npm run dev
   ```
   Backend API available at `http://localhost:5000`

2. **Start Frontend Server** (in new terminal):
   ```bash
   ng serve
   # or
   npm start
   ```
   Frontend available at `http://localhost:4200`

#### Option 2: Run Concurrently (Recommended)
1. **Install concurrently** (if not already installed):
   ```bash
   npm install -g concurrently
   ```

2. **Run both servers**:
   ```bash
   # From root directory
   concurrently "cd collabstudy-backend && npm run dev" "ng serve"
   ```

### Database Setup

1. **Install MongoDB**:
   - Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud database)

2. **Start MongoDB**:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   # or
   brew services start mongodb-community
   ```

3. **Verify connection**:
   - MongoDB should be running on `mongodb://localhost:27017`
   - Database `collabstudy` will be created automatically

## 🎨 Dark Theme Features

- **Google Classroom Inspired Design**: Professional and clean interface
- **Material Design 3**: Latest design system with dark theme support
- **Custom Color Palette**: Purple (#bb86fc) and teal (#03dac6) accents
- **Consistent Theming**: CSS variables for easy theme customization
- **Accessibility**: High contrast ratios and proper color combinations

## 📁 Project Structure

```
collabstudy/                     # Root directory (Frontend)
├── src/app/                     # Angular application
│   ├── chat/                    # Real-time chat functionality
│   │   ├── chat-room/          # Chat room component
│   │   └── chat.module.ts      # Chat module
│   ├── notes/                   # Notes management
│   │   ├── note-list/          # Note listing component
│   │   ├── note-upload/        # File upload component
│   │   └── notes.module.ts     # Notes module
│   ├── rooms/                   # Study rooms management
│   │   ├── room-create/        # Room creation
│   │   ├── room-detail/        # Room details view
│   │   ├── room-list/          # Room listing
│   │   └── rooms.module.ts     # Rooms module
│   ├── sessions/                # Session calendar
│   │   ├── session-calendar/   # Calendar component
│   │   ├── session-detail/     # Session details
│   │   └── sessions.module.ts  # Sessions module
│   └── notifications/           # Notifications system
│       ├── notification-list/  # Notification listing
│       └── notifications.module.ts
├── collabstudy-backend/         # Backend directory
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   ├── middleware/             # Express middleware
│   ├── utils/                  # Utility functions
│   ├── uploads/                # File upload directory
│   ├── server.js               # Express server entry point
│   ├── package.json            # Backend dependencies
│   └── .env.example            # Backend environment template
├── .env.example                # Frontend environment template
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## 🔧 Development Workflow

### Frontend Development
```bash
# Start development server with hot reload
ng serve

# Run tests
ng test

# Build for production
ng build --configuration production

# Lint code
ng lint
```

### Backend Development
```bash
# Navigate to backend
cd collabstudy-backend

# Start development server with nodemon
npm run dev

# Run tests (if available)
npm test

# Start production server
npm start
```

### Full Stack Development
```bash
# Install concurrently for running both servers
npm install -g concurrently

# Run both frontend and backend
concurrently "cd collabstudy-backend && npm run dev" "ng serve"
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create new room
- `GET /api/rooms/:id` - Get room details
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room
- `POST /api/rooms/:id/join` - Join room

### Sessions
- `GET /api/sessions` - Get user sessions
- `POST /api/sessions` - Create session
- `GET /api/sessions/:id` - Get session details
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session

### Notes
- `GET /api/notes/:roomId` - Get room notes
- `POST /api/notes` - Upload note
- `DELETE /api/notes/:id` - Delete note

### Chat
- Socket.IO events for real-time messaging
- `join-room` - Join chat room
- `send-message` - Send message
- `receive-message` - Receive message

## ⚙️ Environment Configuration

### Frontend (.env)
```env
API_BASE_URL=http://localhost:5000/api
SOCKET_URL=http://localhost:5000
NODE_ENV=development
```

### Backend (collabstudy-backend/.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/collabstudy

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_secure_secret
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:4200

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## 🎨 Dark Theme Customization

The application uses CSS variables for theming:

```css
:root {
  --primary-color: #bb86fc;
  --secondary-color: #4caf50;
  --background-color: #121212;
  --surface-color: #1e1e1e;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
}
```

## 📚 Development Guidelines

1. **Component Structure**: Use standalone components with Angular 20+
2. **Styling**: Use CSS variables from the global theme
3. **Icons**: Use Material Icons for consistency
4. **Responsive**: Design mobile-first with Material breakpoints
5. **TypeScript**: Strict type checking enabled
6. **Environment**: Separate configurations for dev/prod

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
ng build --configuration production

# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
# Set production environment variables
# Start production server
npm start
```

### Docker Deployment (Optional)
```dockerfile
# Dockerfile example for containerized deployment
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support and questions, please open an issue in the GitHub repository.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
