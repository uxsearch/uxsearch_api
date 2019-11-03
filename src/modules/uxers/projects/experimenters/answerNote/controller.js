import { getAnswerNote, createAnswer, updateAnswer } from 'api/modules/uxers/projects/experimenters/answerNote/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  getOne: async (req, res) => {
    const uxerId = req.user.uid
    const projectId = req.params.proj_id
    const experimenterId = req.params.exper_id
    const noteId = req.params.note_id
    const answer = await getAnswerNote(uxerId, projectId, experimenterId, noteId)
    res.send(answer)
  },
  update: async (req, res) => {
    const uxerId = req.user.uid
    const projectId = req.params.proj_id
    const experimenterId = req.params.exper_id
    const { answers } = req.body
    if (_.isArray(answers)) {
      await updateAnswer(uxerId, projectId, experimenterId, answers)
      res.status(200).send({ status: statusCallback.SUCCESS })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  }
}