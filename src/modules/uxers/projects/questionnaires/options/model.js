import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionQuestionnaire = 'questionnaires'
const collectionOption = 'options'

async function getOptions(uxerId, projectId, questionId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).doc(questionId).collection(collectionOption).get()
  let options = []
  ref.forEach(snapshot => {
    options.push({
      id: snapshot.id,
      data: snapshot.data()
    })
  })
  return options
}

export { getOptions }