// Native builds get the config from google-services.json GoogleService-Info.plist
import firebase from 'firebase/compat/app';
import {
  KLOTTI_APP_API_KEY,
  KLOTTI_APP_AUTH_DOMAIN,
  KLOTTI_APP_PROJECT_ID,
  KLOTTI_APP_STORAGE_BUCKET,
  KLOTTI_APP_MESSAGING_SENDER_ID,
  KLOTTI_APP_APP_ID
} from '@env';

export const firebaseConfig = {
  apiKey: KLOTTI_APP_API_KEY,
  authDomain: KLOTTI_APP_AUTH_DOMAIN,
  projectId: KLOTTI_APP_PROJECT_ID,
  storageBucket: KLOTTI_APP_STORAGE_BUCKET,
  messagingSenderId: KLOTTI_APP_MESSAGING_SENDER_ID,
  appId: KLOTTI_APP_APP_ID
};

const initializeApp = () => {
  firebase.initializeApp(firebaseConfig);
};

export default initializeApp;
