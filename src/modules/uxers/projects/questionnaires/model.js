import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'
import { getOptions } from './options/model'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionQuestionnaire = 'questionnaires'

async function getQuestionnaire(uxerId, projectId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).where('type_question', '==', 'questionnaire').get()
  let questionnaires = []
  ref.forEach(snapshot => {
    questionnaires = [...questionnaires, {
      id: snapshot.id,
      data: snapshot.data()
    }]
  })
  return questionnaires
}

async function getNote(uxerId, projectId) {
  let notes = []
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).where('type_question', '==', 'note').get()
  ref.forEach(async snapshot => {
    const options = await getOptions(uxerId, projectId, snapshot.id)
    notes.push({
      id: snapshot.id,
      data: {
        question: snapshot.data(),
        options,
      }
    })
    console.log('loop: ', notes)
  })
  console.log('end: ', notes)
  return notes
}

export { getQuestionnaire, getNote }