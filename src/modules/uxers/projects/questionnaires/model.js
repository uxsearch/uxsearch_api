import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'
import { getOptions, createOption, updateOption, deleteAllOptionOfQuestion } from './options/model'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionQuestionnaire = 'questionnaires'

async function getAllQuestionnaire(uxerId, projectId) {
  return await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire)
    .orderBy('updated_at', 'asc')
    .get()
}

async function getQuestionnaire(uxerId, projectId) {
  let questionnaires = []
  return new Promise((resolve, reject) => {
    const ref = getAllQuestionnaire(uxerId, projectId)
    resolve(ref)
  }).then(result => {
    return new Promise((resolve, reject) => {
      let numberOfQuestionnaire = 0
      result.forEach(async (snapshot) => {
        if (snapshot.data().type_question === 'questionnaire') {
          numberOfQuestionnaire++
          const options = getOptions(uxerId, projectId, snapshot.id)
          questionnaires.push({
            id: snapshot.id,
            data: {
              question: snapshot.data(),
              options: await options,
            }
          })

          if (questionnaires.length === numberOfQuestionnaire) {
            resolve(questionnaires)
          }
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
    const ref = getAllQuestionnaire(uxerId, projectId)
    resolve(ref)
  }).then(result => {
    return new Promise((resolve, reject) => {
      let numberOfNote = 0
      result.forEach(async (snapshot) => {
        if (snapshot.data().type_question === 'note') {
          numberOfNote++
          const options = getOptions(uxerId, projectId, snapshot.id)
          notes.push({
            id: snapshot.id,
            data: {
              question: snapshot.data(),
              options: await options,
            }
          })
          if (notes.length === numberOfNote) {
            resolve(notes)
          }
        }
      })
    }).then(result => {
      return result
    })
  })
}

async function getAllNoteId(uxerId, projectId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire)
    .where('type_question', '==', 'note')
    .get()
  let noteId = []
  ref.forEach(snapshot => {
    noteId.push(snapshot.id)
  })
  return noteId
}

async function createQuesitonnaire(uxerId, projectId, questions) {
  const type_question = 'questionnaire'

  for (var i = 0; i < questions.length; i++) {
    const created_at = new Date()
    const updated_at = new Date()
    const { question, type_form, options } = questions[i]
    const ref = await db.collection(collectionUxer).doc(uxerId)
      .collection(collectionProject).doc(projectId)
      .collection(collectionQuestionnaire).add({ question, type_form, type_question, created_at, updated_at })

    for (var j = 0; j < options.length; j++) {
      await createOption(uxerId, projectId, ref.id, options[j])
    }
  }
  return await getQuestionnaire(uxerId, projectId)
}

async function createNote(uxerId, projectId, questions) {
  const created_at = new Date()
  const updated_at = new Date()
  const type_question = 'note'

  const { question, type_form, options } = questions
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire)
    .add({ question, type_form, type_question, created_at, updated_at })
  await createOption(uxerId, projectId, ref.id, options)

  return await getNote(uxerId, projectId)
}

async function updateNote(uxerId, projectId, questions) {
  const allNoteId = await getAllNoteId(uxerId, projectId)
  for (var i = 0; i < questions.length; i++) {
    const updated_at = new Date()
    const { questionId, question, type_form, options } = questions[i]
    if (questionId !== undefined) {
      var index = allNoteId.indexOf(questionId)
      if (index > -1) {
        allNoteId.splice(index, 1)
      }
      await db.collection(collectionUxer).doc(uxerId)
        .collection(collectionProject).doc(projectId)
        .collection(collectionQuestionnaire).doc(questionId)
        .set({ question, type_form, updated_at }, { merge: true })
      await updateOption(uxerId, projectId, questionId, options)
    } else if (questionId === undefined) {
      await createNote(uxerId, projectId, questions[i])
    }
  }
  if (allNoteId.length > 0) {
    for (var j = 0; j < allNoteId.length; j++) {
      await deleteAllOptionOfQuestion(uxerId, projectId, allNoteId[j])
      await deleteNote(uxerId, projectId, allNoteId[j])
    }
  }

  return await getNote(uxerId, projectId)
}

async function deleteNote(uxerId, projectId, questionId) {
  await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).doc(questionId).delete()
}

export { getQuestionnaire, getNote, createQuesitonnaire, createNote, updateNote }