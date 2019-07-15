import firebase from 'firebase'
import admin from 'firebase-admin'
// import functions from 'firebase-functions'
//const app = admin.initializeApp();

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uxsearchcloud-cc545.firebaseio.com"
});

// Add the Firebase products that you want to use
require("firebase/auth")
require("firebase/firestore")

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKr4jJ3tZ6S2BIDn0O2dau5ZVNgeMjzf8",
  authDomain: "uxsearchcloud-cc545.firebaseapp.com",
  databaseURL: "https://uxsearchcloud-cc545.firebaseio.com",
  projectId: "uxsearchcloud-cc545",
  storageBucket: "uxsearchcloud-cc545.appspot.com",
  messagingSenderId: "493858978770",
  appId: "1:493858978770:web:d59b0c3e3bc98198"
};

const db = admin.firestore()

export { firebase, db }

