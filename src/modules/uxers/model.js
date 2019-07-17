import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionName = 'uxers'

export async function getAll() {
  const query = await db.collection(collectionName).get()
  let user = []
  query.forEach(snapshot => {
    user = [...user, { id: snapshot.id, data: snapshot.data()}]
  })
  return user
}

// export async function createUxer() {

// }
