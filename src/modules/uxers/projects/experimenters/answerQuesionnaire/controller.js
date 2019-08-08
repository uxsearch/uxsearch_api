import { getAnswerQuestion, createAnswer } from 'api/modules/uxers/projects/experimenters/answerQuesionnaire/model'
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
    const questionId = req.params.quest_id
    const answer = await getAnswerQuestion(uxerId, projectId, experimenterId, questionId)
    res.send(answer)
  },
  create: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const experimenterId = req.params.exper_id
    const { question_key, answer } = req.body
    if(_.isString(question_key) && _.isString(answer)) {
      const answerQuestion = await createAnswer(uxerId, projectId, experimenterId, { question_key, answer })
      res.send({ status: answerQuestion ? statusCallback.SUCCESS : statusCallback.ERROR, answer: answerQuestion})
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  }
}