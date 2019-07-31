import { getProjectByUxerId } from 'api/modules/uxers/projects/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  getProjectByUxerId: async (req, res) => {
    const uxerId = req.params.id
    const projects = await getProjectByUxerId(uxerId)
    res.send(projects)
  }
}