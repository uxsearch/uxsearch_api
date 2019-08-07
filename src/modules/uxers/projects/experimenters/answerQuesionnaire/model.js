import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionExperimenter = 'experimenters'
const collectionAnswer = 'answer_questionnaire'

async function getAnswerQuestion(uxerId, projectId, experimenterId, questionId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperimenter).doc(experimenterId)
    .collection(collectionAnswer).where('question_key', '==', questionId).get()
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
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionExperimenter).doc(experimenterId)
    .collection(collectionAnswer).add({ question_key, answer, created_at })
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

export { getAnswerQuestion, createAnswer }