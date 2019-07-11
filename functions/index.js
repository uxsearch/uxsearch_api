//const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');

//The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
//admin.initializeApp(functions.config().firebase);

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uxsearchcloud-cc545.firebaseio.com"
});


// Get a database reference to our posts
var db = admin.database();

exports.experimenter = 
functions.https.onRequest((request, response) => {
  if(request.method === 'GET'){
     var ref = db.ref("experimenters");

     ref.once("value", function(snapshot) {
       response.contentType('application/json');
       response.send(JSON.stringify(snapshot.val()));
       response.send(value);
     });
  }
});