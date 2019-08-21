import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionUxer = 'uxers'

async function getAll() {
  const ref = await db.collection(collectionUxer).get()
  let uxers = []
  ref.forEach(snapshot => {
    uxers = [...uxers, {
      id: snapshot.id,
      data: snapshot.data()
    }]
  })
  return uxers
}

async function getUxerById(uxerId) {
  const ref = await db.collection(collectionUxer).doc(uxerId).get()
  let uxer = {
    data: ref.data()
  }
  return uxer
}

async function createUxer({ name, company }) {
  const created_at = new Date()
  const updated_at = new Date()
  const ref = await db.collection(collectionUxer).add({ name, company, created_at, updated_at })
  const snapshot = await db.collection(collectionUxer).doc(ref.id).get()
  let uxer = {
    id: snapshot.id,
    data: snapshot.data()
  }
  return uxer
}

async function updateUxer(uxerId, { name, company }) {
  const updated_at = new Date()
  const ref = await db.collection(collectionUxer).doc(uxerId).set({ name, company, updated_at }, { merge: true })
  const snapshot = await db.collection(collectionUxer).doc(uxerId).get()
  let uxer = {
    id: snapshot.id,
    data: snapshot.data()
  }
  return uxer
}

async function deleteUxer(uxerId) {
  const ref = await db.collection(collectionUxer).doc(uxerId).delete()
  if(ref === undefined) return 0
  else return 1
}

export { getAll, getUxerById, createUxer, updateUxer, deleteUxer }
