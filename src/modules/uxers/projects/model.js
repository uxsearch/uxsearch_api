import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionUxer = 'uxers'
const collectionProject = 'projects'

async function getProjectByUxerId(uxerId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).get()
  let projects = []
  ref.forEach(snapshot => {
    projects = [...projects, {
      id: snapshot.id,
      data: snapshot.data()
    }]
  })
  return projects
}

async function getOneProject(uxerId, projectId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId).get()
  let project = {
    id: ref.id,
    data: ref.data()
  }
  return project
}

async function getProjectByPath({ uxerId, generate_url }) {
  generate_url = 'https://uxsearch.cf/' + generate_url
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).where('link_url', '==', generate_url).get()
  let project = {
    id: ref.id,
    data: ref.data()
  }
  return project
}

async function updateProject(uxerId, projectId, { name, cover_url }) {
  const updated_at = new Date()
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId).set({ name, cover_url, updated_at }, { merge: true })
  const snapshot = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId).get()
  let project = {
    id: snapshot.id,
    data: snapshot.data()
  }
  return project
}

async function createProject(uxerId, { name, cover_url, file_url }) {
  const created_at = new Date()
  const updated_at = new Date()
  const link_url = 'https://uxsearch.cf/' + Math.random().toString(36).substring(7) + '/'
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).add({ name, cover_url, file_url, link_url, created_at, updated_at })
  const snapshot = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(ref.id).get()
  let project = {
    id: snapshot.id,
    data: snapshot.data()
  }
  return project
}

async function deleteProject(uxerId, projectId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId).delete()
  if (ref === undefined) return 0
  else return 1
}

export { getProjectByUxerId, getOneProject, getProjectByPath, createProject, updateProject, deleteProject }