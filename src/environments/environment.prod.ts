export const environment = {
  production: true,
  apiBaseUrl: 'https://your-api-domain.com/api',
  appName: 'CollabStudy',
  appVersion: '1.0.0',
  features: {
    notifications: true,
    chat: true,
    fileSharing: true,
    videoCalls: true
  },
  upload: {
    maxFileSize: 5242880, // 5MB
    allowedTypes: ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png']
  },
  auth: {
    tokenExpiryTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    googleClientId: 'your_production_google_client_id'
  },
  api: {
    timeout: 30000,
    retryAttempts: 3
  }
};