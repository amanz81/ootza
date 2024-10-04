import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBWjrfjDggV25xIzYO0h6u5rH0SsK-l_QE",
    authDomain: "ootza-f1f9a.firebaseapp.com",
    databaseURL: "https://ootza-f1f9a-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "ootza-f1f9a",
    storageBucket: "ootza-f1f9a.appspot.com",
    messagingSenderId: "589649800807",
    appId: "1:589649800807:web:0dfcb9ba45df26f014aec2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { database, storage };