import { deleteOption } from 'api/modules/uxers/projects/questionnaires/options/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  delete: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const questionId = req.params.questionId
    const { optionId } = req.body

    const haveOption = await deleteOption(uxerId, projectId, questionId, optionId)
    res.send({ status: haveProject === 0 ? statusCallback.SUCCESS : statusCallback.ERROR })
  }
}