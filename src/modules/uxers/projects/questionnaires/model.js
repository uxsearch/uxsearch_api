import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'

const collectionUxer = 'uxers'
const collectionProject = 'projects'
const collectionQuestionnaire = 'questionnaires'

async function getQuestionnaire (uxerId, projectId) {
  const ref = await db.collection(collectionUxer).doc(uxerId)
    .collection(collectionProject).doc(projectId)
    .collection(collectionQuestionnaire).where('type_question', '==', 'questionnaire').get()
  let questionnaires = []
  ref.forEach(sanpshot => {
    questionnaires = [...questionnaires, {
      id: sanpshot.id,
      data: sanpshot.data()
    }]
  })
  console.log(questionnaires)
  return questionnaires
}

export { getQuestionnaire }