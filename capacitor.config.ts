import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'bake-joli-web-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    GoogleAuth:{
     "scopes":["profile","email"],
     "serverClientId":"134645042108-0k8a9fib5vtmqq32qeo9adaqa70vltuf.apps.googleusercontent.com",
     "forceCodeForRefreshToken":true
    }
  }
};

export default config;
