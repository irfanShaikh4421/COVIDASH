import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseApp = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messageingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const storage = firebase.storage();

export { storage, firebaseApp as default };
