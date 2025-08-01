// Configuration for the app

export const CONFIG = {
  // Backend URLs to try in order
  BACKEND_URLS: [
    'http://192.168.0.140:5000',
    'http://localhost:5000',
    'http://127.0.0.1:5000'
  ],
  
  // API endpoints
  ENDPOINTS: {
    PREDICT: '/predict',
    PING: '/ping',
    HEALTH: '/'
  },
  
  // Timeout settings
  TIMEOUT: 30000, // 30 seconds
  
  // App settings
  APP_NAME: 'SkinOAI',
  VERSION: '1.0.0'
}; 