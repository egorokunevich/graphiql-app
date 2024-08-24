// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD74mR_GNX6i_rwQ6CUmumHjo30WG0OzSg',
  authDomain: 'graphiql-api.firebaseapp.com',
  projectId: 'graphiql-api',
  storageBucket: 'graphiql-api.appspot.com',
  messagingSenderId: '423085171131',
  appId: '1:423085171131:web:a0164a3a429471d6cfa49e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
