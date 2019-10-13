import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionQuestionnaire = 'questionnaires'
const collectionOption = 'options'

async function getOptions(uxerId, projectId, questionId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).doc(questionId).collection(collectionOption).orderBy('created_at').get()
  let options = []
  ref.forEach(snapshot => {
    options.push({
      id: snapshot.id,
      data: snapshot.data()
    })
  })
  return options
}

async function createOption(uxerId, projectId, questionId, option) {
  const created_at = new Date()
  const updated_at = new Date()
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).doc(questionId)
    .collection(collectionOption).add({ option, created_at, updated_at })
}

async function deleteOption(uxerId, projectId, questionId, optionId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).collection(questionId)
    .collection(collectionOption).doc(optionId).delete()
  if (ref === undefined) return 0
  else return 1
}

export { getOptions, deleteOption, createOption }