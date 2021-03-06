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
    .orderBy('updated_at')
    .get()
}

async function getQuestionById(uxerId, projectId, questionId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).doc(questionId)
    .get()
  let questionnaire = {}
  const options = getOptions(uxerId, projectId, ref.id)
  questionnaire = {
    id: ref.id,
    data: {
      question: ref.data(),
      options: await options,
    }
  }
  return questionnaire
}

async function getQuestionnaire(uxerId, projectId) {
  let questionnaires = []
  return new Promise((resolve, reject) => {
    const ref = getAllQuestionnaire(uxerId, projectId)
    resolve(ref)
  }).then(result => {
    if (result.docs.length !== 0) {
      return new Promise((resolve, reject) => {
        let numberOfQuestionnaire = 0
        let numberOfQuestion = 0
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
          numberOfQuestion++
          if (numberOfQuestion === result.docs.length) {
            if (questionnaires.length === 0) resolve(questionnaires)
          }
        })
      }).then(result => {
        return result
      })
    } else {
      return questionnaires
    }
  })
}

async function getAllQuestionnaireId(uxerId, projectId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire)
    .where('type_question', '==', 'questionnaire')
    .get()
  let questionnaireId = []
  ref.forEach(snapshot => {
    questionnaireId.push(snapshot.id)
  })
  return questionnaireId
}

async function getNote(uxerId, projectId) {
  let notes = []
  return new Promise((resolve, reject) => {
    const ref = getAllQuestionnaire(uxerId, projectId)
    resolve(ref)
  }).then(result => {
    if (result.docs.length !== 0) {
      return new Promise((resolve, reject) => {
        let numberOfNote = 0
        let numberOfQuestion = 0
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
          numberOfQuestion++
          if (numberOfQuestion === result.docs.length) {
            if (notes.length === 0) resolve(notes)
          }
        })
      }).then(result => {
        return result
      })
    } else {
      return notes
    }
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
    noteId.push({id: snapshot.id, updated_at: snapshot.data().updated_at})
  })
  noteId.sort((a, b) => {
    if (a.updated_at.seconds > b.updated_at.seconds) return 1
    else return -1
  })
  return noteId
}

async function createQuestion(uxerId, projectId, { question, type_form, type_question, created_at, updated_at }) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire)
    .add({ question, type_form, type_question, created_at, updated_at })

  return ref.id
}

async function createQuestionnaire(uxerId, projectId, questions) {
  const created_at = new Date()
  const updated_at = new Date()
  const type_question = 'questionnaire'
  const { question, type_form } = questions
  const ref = await createQuestion(uxerId, projectId, { question, type_form, type_question, created_at, updated_at })
  if (type_form === 'multiple' || type_form === 'checkbox') {
    const { options } = questions
    await createOption(uxerId, projectId, ref, options)
  }
  return await getQuestionnaire(uxerId, projectId)
}

async function createNote(uxerId, projectId, questions) {
  const created_at = new Date()
  const updated_at = new Date()
  const type_question = 'note'
  const { question, type_form } = questions
  const ref = await createQuestion(uxerId, projectId, { question, type_form, type_question, created_at, updated_at })
  if (type_form === 'multiple' || type_form === 'checkbox') {
    const { options } = questions
    await createOption(uxerId, projectId, ref, options)
  }
  return await getNote(uxerId, projectId)
}

async function updateNote(uxerId, projectId, questions) {
  for (var i = 0; i < questions.length; i++) {
    const updated_at = new Date()
    const { questionId, question, type_form, options } = questions[i]
    if (questionId === "" || questionId === undefined) {
      await createNote(uxerId, projectId, questions[i])
    } else if (questionId !== undefined) {
      await db.collection(collectionUxer).doc(uxerId)
        .collection(collectionProject).doc(projectId)
        .collection(collectionQuestionnaire).doc(questionId)
        .set({ question, type_form, updated_at }, { merge: true })
      await updateOption(uxerId, projectId, questionId, options)
    }
  }
  return await getNote(uxerId, projectId)
}

async function updateQuestionnaire(uxerId, projectId, questions) {
  for (var i = 0; i < questions.length; i++) {
    const updated_at = new Date()
    const { questionId, question, type_form, options } = questions[i]
    if (questionId === "" || questionId === undefined) {
      await createQuestionnaire(uxerId, projectId, questions[i])
    } else if (questionId !== undefined) {
      await db.collection(collectionUxer).doc(uxerId)
        .collection(collectionProject).doc(projectId)
        .collection(collectionQuestionnaire).doc(questionId)
        .set({ question, type_form, updated_at }, { merge: true })
      await updateOption(uxerId, projectId, questionId, options)
    }
  }
  return await getQuestionnaire(uxerId, projectId)
}

async function deleteQuestion(uxerId, projectId, questionId) {
  await deleteAllOptionOfQuestion(uxerId, projectId, questionId)
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).doc(questionId).delete()
  if (ref === undefined) return 0
  else return 1
}

export {
  getQuestionnaire,
  getNote,
  getAllQuestionnaireId,
  getAllNoteId,
  updateQuestionnaire,
  updateNote,
  deleteQuestion,
  getQuestionById
}