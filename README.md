# CollabStudy - Collaborative Study Platform

A modern, dark-themed collaborative study platform built with Angular and Material Design, featuring Google Classroom-inspired UI.

## Features

- 🎨 Dark theme by default with Material Design components
- 👥 Study rooms management
- 📅 Session scheduling and calendar
- 📝 Notes sharing and collaboration
- 💬 Real-time chat system
- 🔔 Notification system
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: Angular 20+, Angular Material, TypeScript
- **Styling**: CSS Variables, Material Design Dark Theme
- **Icons**: Material Icons
- **Build**: Angular CLI with ESBuild

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/collabstudy.git
   cd collabstudy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy the environment template
   cp .env.example .env
   
   # Edit .env file with your configuration
   # Update API endpoints, database credentials, etc.
   ```

4. **Development Server**
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

## Support

For support and questions, please open an issue in the GitHub repository.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
