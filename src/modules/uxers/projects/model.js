import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionUxer = 'uxers'
const collectionProject = 'projects'

async function getProjectByUxerId(uxerId) {
  const ref = await db.collection(collectionUxer).doc(uxerId).collection(collectionProject).get()
  let projects = []
  ref.forEach(snapshot => {
    projects = [...projects, {
      id: snapshot.id,
      data: snapshot.data()
    }]
  })
  return projects
}

export { getProjectByUxerId }