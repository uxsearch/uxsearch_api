import firebase from 'api/firebase-config'
import { db, bucket } from 'api/firebasehelper'
import { deleteExperimentProfile } from '../../../experimenters/model'

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

async function getExperimenterKey(uxerId, projectId, experId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperiment).doc(experId).get()
  return ref.data().experimenter_key
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

async function uploadFile(file) {
  const metadata = {
    contentType: 'video/webm'
  }

  return new Promise((resolve, rejects) => {
    if(file.buffer instanceof Buffer === false) {
      throw new Error('Invalide Object Buffer')
    }
    const fileBuffer = Buffer.from(file.buffer)
    
    const blobStream = bucket.file(file.originalname).createWriteStream({
      metadata: {
        contentType: metadata.contentType
      }
    })
        
    blobStream.on('error', (err) => {
      throw new Error(err)
    })

    blobStream.on('finish', () => {
      resolve()
    })

    blobStream.end(fileBuffer)
  })
}

async function deleteExperimenter(uxerId, projectId, experId) {
  const experKey = await getExperimenterKey(uxerId, projectId, experId)
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperiment).doc(experId).delete()

  const refExperimentProfile = await deleteExperimentProfile(experKey)
  if (ref === undefined && refExperimentProfile === 0) return 0
  else return 1
}

export { getExperimenterTest, createExperimentRecord, deleteExperimenter, uploadFile }