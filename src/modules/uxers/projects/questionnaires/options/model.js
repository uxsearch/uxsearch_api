import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionQuestionnaire = 'questionnaires'
const collectionOption = 'options'

async function getOptions(uxerId, projectId, questionId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).doc(questionId).collection(collectionOption).orderBy('updated_at').get()
  let options = []
  ref.forEach(snapshot => {
    options.push({
      id: snapshot.id,
      data: snapshot.data()
    })
  })
  return options
}

async function createOption(uxerId, projectId, questionId, options) {
  for (var i = 0; i < options.length; i++) {
    const created_at = new Date()
    const updated_at = new Date()
    const { option } = options[i]
    await db.collection(collectionUxer).doc(uxerId)
      .collection(collectionProject).doc(projectId)
      .collection(collectionQuestionnaire).doc(questionId)
      .collection(collectionOption).add({ option, created_at, updated_at })
  }
}

async function updateOption(uxerId, projectId, questionId, options) {
  const newOptions = []
  for (var i = 0; i < options.length; i++) {
    const updated_at = new Date()
    const { optionId, option } = options[i]
    if (optionId !== undefined) {
      await db.collection(collectionUxer).doc(uxerId)
        .collection(collectionProject).doc(projectId)
        .collection(collectionQuestionnaire).doc(questionId)
        .collection(collectionOption).doc(optionId)
        .set({ option, updated_at }, { merge: true })
    } else if (optionId === undefined) {
      newOptions.push(options[i])
    }
    if (i === options.length - 1) {
      await createOption(uxerId, projectId, questionId, newOptions)
    }
  }
}

async function deleteOption(uxerId, projectId, questionId, optionId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).collection(questionId)
    .collection(collectionOption).doc(optionId).delete()
  if (ref === undefined) return 0
  else return 1
}

export { getOptions, deleteOption, createOption, updateOption }