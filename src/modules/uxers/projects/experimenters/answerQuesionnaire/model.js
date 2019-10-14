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

async function updateAnswer(uxerId, projectId, experimenterId, answers) {
  for (var i = 0; i < answers.length; i++) {
    const { question_key, answer } = answers[i]
    const created_at = new Date()
    await db.collection(collectionUxer).doc(uxerId)
      .collection(collectionProject).doc(projectId)
      .collection(collectionExperimenter).doc(experimenterId)
      .collection(collectionAnswer).add({ question_key, answer, created_at })
  }
}

export { getAnswerQuestion, updateAnswer }