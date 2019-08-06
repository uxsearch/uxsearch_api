import { getExperimenterTest } from 'api/modules/uxers/projects/experimenters/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  getAll: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const experimenters = await getExperimenterTest(uxerId, projectId)
    res.send(experimenters)
  },
}