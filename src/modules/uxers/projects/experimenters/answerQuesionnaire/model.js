import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'
import { getExperimenterId } from '../model'
import { getQuestionById } from '../../questionnaires/model'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionExperimenter = 'experimenters'
const collectionAnswer = 'answer_questionnaire'

async function getAnswerQuestion(uxerId, projectId, experimenterId) {
  let answer = []
  return new Promise((resolve, reject) => {
    const ref = db.collection(collectionUxer).doc(uxerId)
      .collection(collectionProject).doc(projectId)
      .collection(collectionExperimenter).doc(experimenterId)
      .collection(collectionAnswer).get()
    resolve(ref)
  }).then(result => {
    return new Promise((resolve, reject) => {
      let numberOfAnswer = 0
      result.forEach(async snapshot => {
        numberOfAnswer++
        const question = await getQuestionById(uxerId, projectId, snapshot.data().question_key)
        answer.push({
          answer: {
            id: snapshot.id,
            question: question.data().question,
            answer: snapshot.data().answer,
            created_at: snapshot.data().created_at
          },
        })

        if (numberOfAnswer === answer.length) {
          resolve(answer)
        }
      })
    })
  })
}

async function updateAnswer(uxerId, projectId, realExperId, answers) {
  const experimenterId = await getExperimenterId(uxerId, projectId, realExperId)
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