import firebase from 'firebase'
import admin from 'firebase-admin'

import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://uxsearchcloud-cc545.firebaseio.com"
});

const firebaseConfig = {
  apiKey: "AIzaSyCKr4jJ3tZ6S2BIDn0O2dau5ZVNgeMjzf8",
  authDomain: "uxsearchcloud-cc545.firebaseapp.com",
  databaseURL: "https://uxsearchcloud-cc545.firebaseio.com",
  projectId: "uxsearchcloud-cc545",
  storageBucket: "uxsearchcloud-cc545.appspot.com",
  messagingSenderId: "493858978770",
  appId: "1:493858978770:web:d59b0c3e3bc98198"
};

firebase.initializeApp(firebaseConfig);

export default firebase

