import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'
import { getExperimenterId } from '../model'
import { getQuestionById } from '../../questionnaires/model'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionExperimenter = 'experimenters'
const collectionAnswer = 'answer_note'

async function getAnswerNote(uxerId, projectId, realExperId) {
  const experimenterId = await getExperimenterId(uxerId, projectId, realExperId)
  let answer = []
  return new Promise((resolve, reject) => {
    const ref = db.collection(collectionUxer).doc(uxerId)
      .collection(collectionProject).doc(projectId)
      .collection(collectionExperimenter).doc(experimenterId)
      .collection(collectionAnswer).orderBy('updated_at').get()
    resolve(ref)
  }).then(result => {
    return new Promise((resolve, reject) => {
      let numberOfAnswer = 0
      if (result.docs.length !== 0) {
        result.forEach(async snapshot => {
          numberOfAnswer++
          const question = await getQuestionById(uxerId, projectId, snapshot.data().question_key)
          answer.push({
            answer: {
              id: snapshot.id,
              question: question.data().question,
              answer: snapshot.data().answer,
              created_at: snapshot.data().created_at,
              updated_at: snapshot.data().updated_at,
            }
          })

          if (numberOfAnswer === answer.length) {
            resolve(answer)
          }
        })
      } else {
        resolve(answer)
      }
    })
  })
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