import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

console.log('Environment variables:', process.env);

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log('Firebase Config:', firebaseConfig);

// Check if all required configuration values are present
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.databaseURL || 
    !firebaseConfig.projectId || !firebaseConfig.storageBucket || 
    !firebaseConfig.messagingSenderId || !firebaseConfig.appId) {
    console.error('Missing Firebase configuration. Available config:', firebaseConfig);
    throw new Error('Missing Firebase configuration. Please check your environment variables.');
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { database, storage };