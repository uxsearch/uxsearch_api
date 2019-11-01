import firebase from 'api/firebase-config'
import { db, bucket } from 'api/firebasehelper'

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

async function getProjectByPath(uxerId, generate_url) {
  generate_url = 'https://uxsearch.cf/' + generate_url + '/'
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject)
    .where('link_url', '==', generate_url)
    .get()
  let project = undefined
  ref.forEach(snapshot => {
    project = {
      id: snapshot.id,
      data: snapshot.data()
    }
  })
  return project
}

async function updateProject(uxerId, projectId, { name, cover_url, description }) {
  const updated_at = new Date()
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId).set({ name, cover_url, description, updated_at }, { merge: true })
  const snapshot = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId).get()
  let project = {
    id: snapshot.id,
    data: snapshot.data()
  }
  return project
}

async function uploadCoverImage(file) {
  const metadata = {
    contentType: 'image/jpg'
  }

  return new Promise((resolve, rejects) => {
    if (file.buffer instanceof Buffer === false) {
      throw new Error('Invalide Object Buffer')
    }
    const fileBuffer = Buffer.from(file.buffer)

    const blobStream = bucket.file('cover_img/' + file.originalname).createWriteStream({
      metadata: {
        contentType: metadata.contentType
      }
    })

    blobStream.on('error', (err) => {
      throw new Error(err)
    })

    blobStream.on('finish', () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/all_videos%2F${file.originalname}?alt=media`
      resolve(publicUrl)
    })

    blobStream.end(fileBuffer)
  }).then(result => {
    return result
  })
}


async function createProject(uxerId, { name, description, cover_url, file_url }) {
  const created_at = new Date()
  const updated_at = new Date()
  const link_url = 'https://uxsearch.cf/' + Math.random().toString(36).substring(7) + '/'
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).add({ name, cover_url, description, file_url, link_url, created_at, updated_at })
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

export { getProjectByUxerId, getOneProject, getProjectByPath, createProject, uploadCoverImage, updateProject, deleteProject }