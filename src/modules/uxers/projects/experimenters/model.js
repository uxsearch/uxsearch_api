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

export { getExperimenterTest }