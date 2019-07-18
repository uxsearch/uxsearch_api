import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionName = 'experimenters'

async function getAll() {
  const ref = await db.collection(collectionName).get()
  let experimenters = []
  ref.forEach(snapshot => {
    experimenters = [...experimenters, {
      'id': snapshot.id,
      'data': snapshot.data()
    }]
  })
  return experimenters
}

async function getExperimentById( experimentId ) {
  const ref = await db.collection(collectionName).doc(experimentId).get()
  let experimenter = {
    'data': ref.data()
  }
  return experimenter
}

async function createExperimenter({ name, age, gender, tel, email, province, country, job, educate, lifestyle }) {
  const created_at = new Date()
  const ref = await db.collection(collectionName).add({ name, age, gender, tel, email, province, country, job, educate, lifestyle, created_at })
  const snapshot = await db.collection(collectionName).doc(ref.id).get()
  let experimenter = {
    'id': snapshot.id,
    'data': snapshot.data()
  }
  return experimenter
}

export { getAll, getExperimentById, createExperimenter }