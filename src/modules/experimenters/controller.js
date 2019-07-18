import { getAll, getExperimentById } from 'api/modules/experimenters/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  getAll: async (req, res) => {
    const experimenters = await getAll()
    res.send(experimenters)
  },
  getExperimentById: async (req, res) => {
    const id = req.params.id
    const experimenter = await getExperimentById(id)
    res.send(experimenter)
  }
}