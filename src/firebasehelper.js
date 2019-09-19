require('dotenv').config()

import firebase from './firebase-config'
const { Storage } = require('@google-cloud/storage')

const db = firebase.firestore()
const auth = firebase.auth

const butketUrl = process.env.FIREBASE_BUCKET_URL
const storage = new Storage()
const bucket = storage.bucket(butketUrl)


export {
  db,
  auth,
  storage,
  bucket
}