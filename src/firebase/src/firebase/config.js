import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB0lBPdaJtgiXfwJhnZGlyiBKARef_6ISg',
  authDomain: 'best-choice-beauty-home.firebaseapp.com',
  projectId: 'best-choice-beauty-home',
  storageBucket: 'best-choice-beauty-home.firebasestorage.app',
  messagingSenderId: '1041353753033',
  appId: '1:1041353753033:web:f41f893c87d63e7f576818',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);