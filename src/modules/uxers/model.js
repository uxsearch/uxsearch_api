import firebase from 'api/firebase-config'
import { db, bucket } from 'api/firebasehelper'

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

async function uploadProfileImg(file) {
  const metadata = {
    contentType: 'image/jpg'
  }

  return new Promise((resolve, rejects) => {
    if (file.buffer instanceof Buffer === false) {
      throw new Error('Invalide Object Buffer')
    }
    const fileBuffer = Buffer.from(file.buffer)

    const blobStream = bucket.file('profile_img/' + file.originalname).createWriteStream({
      metadata: {
        contentType: metadata.contentType
      }
    })

    blobStream.on('error', (err) => {
      throw new Error(err)
    })

    blobStream.on('finish', () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/profile_img%2F${file.originalname}?alt=media`
      resolve(publicUrl)
    })

    blobStream.end(fileBuffer)
  }).then(result => {
    return result
  })
}

async function deleteUxer(uxerId) {
  const ref = await db.collection(collectionUxer).doc(uxerId).delete()
  if (ref === undefined) return 0
  else return 1
}

export { getAll, getUxerById, createUxer, updateUxer, uploadProfileImg, deleteUxer }
