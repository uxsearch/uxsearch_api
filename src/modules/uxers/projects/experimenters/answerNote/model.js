import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionExperimenter = 'experimenters'
const collectionAnswer = 'answer_note'

async function getAnswerNote(uxerId, projectId, experimenterId, noteId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperimenter).doc(experimenterId)
    .collection(collectionAnswer).where('question_key', '==', noteId).get()
  let answer = []
  ref.forEach(snapshot => {
    answer.push({
      id: snapshot.id,
      data: snapshot.data()
    })
  })
  return answer
}

async function createAnswer(uxerId, projectId, experimenterId, { question_key, answer }) {
  const created_at = new Date()
  const updated_at = new Date()
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperimenter).doc(experimenterId)
    .collection(collectionAnswer).add({ question_key, answer, created_at, updated_at })
  const snapshot = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperimenter).doc(experimenterId)
    .collection(collectionAnswer).doc(ref.id).get()
  let answerData = {
    id: snapshot.id,
    data: snapshot.data()
  }
  return answerData
}

async function updateAnswer(uxerId, projectId, experimenterId, answerId, { question_key, answer }) {
  const updated_at = new Date()
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperimenter).doc(experimenterId)
    .collection(collectionAnswer).doc(answerId).set({ question_key, answer, updated_at }, {merge: true})
  const snapshot = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperimenter).doc(experimenterId)
    .collection(collectionAnswer).doc(answerId).get()
  let answerData = {
    id: snapshot.id,
    data: snapshot.data()
  }
  return answerData
}

export { getAnswerNote, createAnswer, updateAnswer }