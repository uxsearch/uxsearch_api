import { getAnswerQuestion, updateAnswer } from 'api/modules/uxers/projects/experimenters/answerQuesionnaire/model'
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
  update: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const experimenterId = req.params.exper_id
    const answers = req.body
    if(_.isArray(answers)) {
      await updateAnswer(uxerId, projectId, experimenterId, answers)
      res.send({ status: statusCallback.SUCCESS})
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  }
}