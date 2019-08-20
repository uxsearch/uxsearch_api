import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionExperiment = 'experimenters'

async function getExperimenterTest(uxerId, projectId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperiment).get()
  let experimenters = []
  ref.forEach(snapshot => {
    experimenters.push({
      id: snapshot.id,
      data: snapshot.data()
    })
  })
  return experimenters
}

async function createExperimentRecord(uxerId, projectId, { experimenter_key, firstname, lastname, video_url, video_time, screen_url, screen_time }) {
  const created_at = new Date()
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperiment).add({ experimenter_key, firstname, lastname, video_url, video_time, screen_url, screen_time, created_at })
  const snapshot = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperiment).doc(ref.id).get()
  let record = {
    id: snapshot.id,
    data: snapshot.data()
  }
  return record
}

async function deleteExperimenter(uxerId, projectId, experId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperiment).doc(experId).delete()
  if(ref === undefined) return 0
  else return 1
}

export { getExperimenterTest, createExperimentRecord, deleteExperimenter }