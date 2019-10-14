import { getQuestionnaire, getNote, updateQuestionnaire, updateNote } from 'api/modules/uxers/projects/questionnaires/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  getQuestionnaire: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const questionnaires = await getQuestionnaire(uxerId, projectId)
    res.send(questionnaires)
  },
  getNote: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const notes = await getNote(uxerId, projectId)
    res.send(notes)
  },
  updateQuestionnaire: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const questions = req.body

    if (_.isArray(questions)) {
      const updateQuestion = await updateQuestionnaire(uxerId, projectId, questions)
      res.status(200).send({ status: updateQuestion ? statusCallback.SUCCESS : statusCallback.ERROR, updateQuestion })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  },
  updateNote: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const questions = req.body

    if (_.isArray(questions)) {
      const updateQuestion = await updateNote(uxerId, projectId, questions)
      res.status(200).send({ status: updateQuestion ? statusCallback.SUCCESS : statusCallback.ERROR, updateQuestion })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  }
}