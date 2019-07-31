import { getQuestionnaire } from 'api/modules/uxers/projects/questionnaires/model'
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
  }
}