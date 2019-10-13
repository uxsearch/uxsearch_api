import { getQuestionnaire, getNote, createQuesitonnaire, createNote } from 'api/modules/uxers/projects/questionnaires/model'
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
  createQuestionnaire: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const questions = req.body

    if (_.isArray(questions)) {
      const createQuestion = await createQuesitonnaire(uxerId, projectId, questions)
      res.status(201).send({ status: createQuestion ? statusCallback.SUCCESS : statusCallback.ERROR, createQuestion })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  },
  createNote: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const questions = req.body

    if (_.isArray(questions)) {
      const createQuestion = await createNote(uxerId, projectId, questions)
      res.status(201).send({ status: createQuestion ? statusCallback.SUCCESS : statusCallback.ERROR, createQuestion })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  }
}