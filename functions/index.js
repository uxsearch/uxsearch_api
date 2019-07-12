const admin = require("firebase-admin");
const functions = require('firebase-functions');
//const app = admin.initializeApp();

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uxsearchcloud-cc545.firebaseio.com"
});

const firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

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
  

// Initialize Firebase
  //firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore

    // Initialize on Cloud Functions

        //const admin = require('firebase-admin');
        //const functions = require('firebase-functions');
  
//admin.initializeApp(functions.config().firebase);
        let db = admin.firestore();

    // Initialize on Google Cloud Platform

        // const admin = require('firebase-admin');
        // admin.initializeApp({
        //   credential: admin.credential.applicationDefault()
        // });
        // const db = admin.firestore();

// // Add data
// let docRef = db.collection('uxers').doc('PAaz0OPy0QLH4ETuJc2q');

// let setAdmin = docRef.set({
//   name: 'admin2',
//   id: '2',
//   company: 'KMUTT'
// });

// // Read data
// db.collection('uxers').get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   })
//   .catch((err) => {
//     console.log('Error getting documents', err);
//   });
  

// Set a document : Uxer Collection
let dataAdd = db.collection('uxers').add({
  name: 'admin2',
  id: '2',
  company: 'KMUTT',
  create: admin.firestore.Timestamp.fromDate(new Date('July 10, 2019'))
}).then(ref => {
    console.log('Added document with ID: ', ref.id);
  })
  console.log(dataAdd);

// Get a documment : Uxer Collection
let uxerRef = db.collection('uxers').doc('kaIwZlcUmoCr3Vh9Cmjj');
uxerRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  })
  console.log(uxerRef);


