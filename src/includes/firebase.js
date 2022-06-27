import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBFvAAe3ykIz_T7h8j2MGMSlVOS8WEAzJk',
  authDomain: 'kami-kyoku.firebaseapp.com',
  projectId: 'kami-kyoku',
  storageBucket: 'kami-kyoku.appspot.com',
  messagingSenderId: '297386879770',
  appId: '1:297386879770:web:7a56244f2e33d4d45c5aa3',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error: ${error.code}`);
});

const usersCollection = db.collection('users');
const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  usersCollection,
  commentsCollection,
};
