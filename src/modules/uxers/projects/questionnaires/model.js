import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'
import { getOptions, createOption } from './options/model'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionQuestionnaire = 'questionnaires'

async function getQuestionnaire(uxerId, projectId) {
  let questionnaires = []
  return new Promise((resolve, reject) => {
    const ref = db.collection(collectionUxer).doc(uxerId)
      .collection(collectionProject).doc(projectId)
      .collection(collectionQuestionnaire).where('type_question', '==', 'questionnaire')
      .get()
    resolve(ref)
  }).then(result => {
    return new Promise((resolve, reject) => {
      let i = 0
      result.forEach(async (snapshot) => {
        const options = getOptions(uxerId, projectId, snapshot.id)
        questionnaires.push({
          id: snapshot.id,
          data: {
            question: snapshot.data(),
            options: await options,
          }
        })
        i++

        if (i === result.size) {
          resolve(questionnaires)
        }
      })
    }).then(result => {
      return result
    })
  })
}

async function getNote(uxerId, projectId) {
  let notes = []
  return new Promise((resolve, reject) => {
    const ref = db.collection(collectionUxer).doc(uxerId)
      .collection(collectionProject).doc(projectId)
      .collection(collectionQuestionnaire).where('type_question', '==', 'note')
      .get()
    resolve(ref)
  }).then(result => {
    return new Promise((resolve, reject) => {
      let i = 0
      result.forEach(async (snapshot) => {
        const options = getOptions(uxerId, projectId, snapshot.id)
        notes.push({
          id: snapshot.id,
          data: {
            question: snapshot.data(),
            options: await options,
          }
        })
        i++

        if (i === result.size) {
          resolve(notes)
        }
      })
    }).then(result => {
      return result
    })
  })
}

async function createNote(uxerId, projectId, questions) {
  const created_at = new Date()
  const updated_at = new Date()
  const type_question = 'note'

  for (var i = 0; i < questions.length; i++) {
    const { question, type_form, option } = questions[i]
    const ref = await db.collection(collectionUxer).doc(uxerId)
      .collection(collectionProject).doc(projectId)
      .collection(collectionQuestionnaire).add({ question, type_form, type_question, created_at, updated_at })

    for (var j = 0; j < option.length; j++) {
      await createOption(uxerId, projectId, ref.id, option[j])
    }
  }
  return await getNote(uxerId, projectId)
}

export { getQuestionnaire, getNote, createNote }