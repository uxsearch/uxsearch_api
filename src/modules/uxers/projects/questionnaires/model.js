import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'
import { getOptions } from './options/model'
import { resolve } from 'dns';
import { rejects } from 'assert';
import { callbackify } from 'util';

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
  })
  .then(result => {
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

        if(i===result.size) {
          resolve(questionnaires)
        }
      })
    })
    .then(result => {
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
  })
  .then(result => {
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

        if(i===result.size) {
          resolve(notes)
        }
      })
    })
    .then(result => {
      return result
    })
  })
}

export { getQuestionnaire, getNote }