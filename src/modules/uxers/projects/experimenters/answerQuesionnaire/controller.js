import { getAnswerQuestion } from 'api/modules/uxers/projects/experimenters/answerQuesionnaire/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  getOneAnswer: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const experimenterId = req.params.exper_id
    const questionId = req.params.quest_id
    const answer = await getAnswerQuestion(uxerId, projectId, experimenterId, questionId)
    res.send(answer)
  }
}