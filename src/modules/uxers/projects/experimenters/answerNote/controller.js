import { getAnswerNote, createAnswer, updateAnswer } from 'api/modules/uxers/projects/experimenters/answerNote/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  getOne: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const experimenterId = req.params.exper_id
    const noteId = req.params.note_id
    const answer = await getAnswerNote(uxerId, projectId, experimenterId, noteId)
    res.send(answer)
  },
  update: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const experimenterId = req.params.exper_id
    const answerId = req.params.ans_id
    const { question_key, answer } = req.body
    if (_.isString(answer)) {
      const answerNote = await updateAnswer(uxerId, projectId, experimenterId, answerId, { question_key, answer })
      res.send({ status: answerNote ? statusCallback.SUCCESS : statusCallback.ERROR, answer: answerNote })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  },
  create: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const experimenterId = req.params.exper_id
    const { question_key, answer } = req.body
    if (_.isString(question_key) && _.isString(answer)) {
      const answerNote = await createAnswer(uxerId, projectId, experimenterId, { question_key, answer })
      res.send({ status: answerNote ? statusCallback.SUCCESS : statusCallback.ERROR, answer: answerNote })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  }
}