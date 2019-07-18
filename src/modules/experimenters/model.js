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

export { getAll, getExperimentById }