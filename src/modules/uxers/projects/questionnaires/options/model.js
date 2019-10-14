import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'
import _ from 'lodash'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionQuestionnaire = 'questionnaires'
const collectionOption = 'options'

async function getOptions(uxerId, projectId, questionId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).doc(questionId).collection(collectionOption).orderBy('updated_at').get()
  let options = []
  ref.forEach(snapshot => {
    options.push({
      id: snapshot.id,
      data: snapshot.data()
    })
  })
  return options
}

async function getOptionId(uxerId, projectId, questionId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).doc(questionId).collection(collectionOption).get()
  let optionId = []
  ref.forEach(snapshot => {
    optionId.push(snapshot.id)
  })
  return optionId
}

async function createOneOption(uxerId, projectId, questionId, { option, created_at, updated_at }) {
  return await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).doc(questionId)
    .collection(collectionOption).add({ option, created_at, updated_at })
}

async function createOption(uxerId, projectId, questionId, options) {
  if (_.isArray(options)) {
    for (var i = 0; i < options.length; i++) {
      const created_at = new Date()
      const updated_at = new Date()
      const { option } = options[i]

      await createOneOption(uxerId, projectId, questionId, { option, created_at, updated_at })
    }
  } else {
    const created_at = new Date()
    const updated_at = new Date()
    const { option } = options

    await createOneOption(uxerId, projectId, questionId, { option, created_at, updated_at })
  }
}

async function updateOption(uxerId, projectId, questionId, options) {
  const allOptionId = await getOptionId(uxerId, projectId, questionId)
  for (var i = 0; i < options.length; i++) {
    const updated_at = new Date()
    const { optionId, option } = options[i]
    if (optionId !== undefined) {
      var index = allOptionId.indexOf(optionId)
      if (index > -1) {
        allOptionId.splice(index, 1)
      }
      await db.collection(collectionUxer).doc(uxerId)
        .collection(collectionProject).doc(projectId)
        .collection(collectionQuestionnaire).doc(questionId)
        .collection(collectionOption).doc(optionId)
        .set({ option, updated_at }, { merge: true })
    } else if (optionId === undefined) {
      await createOption(uxerId, projectId, questionId, options[i])
    }
  }
  if (allOptionId.length > 0) {
    for (var j = 0; j < allOptionId.length; j++) {
      await deleteOption(uxerId, projectId, questionId, allOptionId[j])
    }
  }
}

async function deleteOption(uxerId, projectId, questionId, optionId) {
  await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).doc(questionId)
    .collection(collectionOption).doc(optionId).delete()
}

async function deleteAllOptionOfQuestion(uxerId, projectId, questionId) {
  const allOptionId = await getOptionId(uxerId, projectId, questionId)
  for(var i = 0; i < allOptionId.length; i++) {
    await db.collection(collectionUxer).doc(uxerId)
      .collection(collectionProject).doc(projectId)
      .collection(collectionQuestionnaire).doc(questionId)
      .collection(collectionOption).doc(allOptionId[i]).delete()
  }
}

export { getOptions, deleteAllOptionOfQuestion, createOption, updateOption }