import firebase from "firebase/app";
import "firebase/auth";
require("dotenv").config();

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID_FIREBASE,
  measurementId: process.env.REACT_MEASUREMENT_ID,
};
const firebaseConfig = {
  apiKey: "AIzaSyApSJV-xSDcNvM61A5NeTxxaU30zo9lq98",
  authDomain: "pothole-warning.firebaseapp.com",
  databaseURL: "https://pothole-warning-default-rtdb.firebaseio.com",
  projectId: "pothole-warning",
  storageBucket: "pothole-warning.appspot.com",
  messagingSenderId: "436918014223",
  appId: "1:436918014223:web:07ea8088163afa34ab2e7a",
  measurementId: "G-E0X81GCENT",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
