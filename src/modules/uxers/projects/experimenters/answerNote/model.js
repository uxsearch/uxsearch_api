import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'
import { getExperimenterId } from '../model'

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

async function createAnswer(uxerId, projectId, experimenterId, valueAnswer) {
  const created_at = new Date()
  const updated_at = new Date()
  const { question_key, answer } = valueAnswer

  await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperimenter).doc(experimenterId)
    .collection(collectionAnswer).add({ question_key, answer, created_at, updated_at })
}

async function updateAnswer(uxerId, projectId, realExperId, answers) {
  const experimenterId = await getExperimenterId(uxerId, projectId, realExperId)
  for (var i = 0; i < answers.length; i++) {
    const updated_at = new Date()
    const { answerId, answer } = answers[i]
    if (answerId === '' || answerId === undefined) {
      await createAnswer(uxerId, projectId, experimenterId, answers[i])
    } else if (answerId !== undefined) {
      await db.collection(collectionUxer).doc(uxerId)
        .collection(collectionProject).doc(projectId)
        .collection(collectionExperimenter).doc(experimenterId)
        .collection(collectionAnswer).doc(answerId)
        .set({ answer, updated_at }, { merge: true })
    }
  }
}

export { getAnswerNote, createAnswer, updateAnswer }