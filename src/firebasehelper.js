import firebase from './firebase-config'

const db = firebase.firestore()

const auth = firebase.auth

export {
  db,
  auth
}