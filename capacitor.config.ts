import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'bakex-web',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    GoogleAuth:{
     "scopes":["profile","email"],
     "serverClientId":"502494569954-tkfub3k8re3p65qejt3p0m615nqt2vic.apps.googleusercontent.com",
     "forceCodeForRefreshToken":true
    }
 }
};

export default config;
