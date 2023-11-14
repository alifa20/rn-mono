import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';

import serviceAccount from '../../dev.json';

const app = initializeApp({
  // @ts-ignore
  credential: cert(serviceAccount),
  storageBucket: 'klotti-app-dev.appspot.com'
});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const bucket = storage.bucket();
export const auth = getAuth();
