import { getSummarizeNote } from 'api/modules/uxers/projects/summarize/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  getSumNote: (req, res) => {
    const uxerId = req.user.uid
    const projectId = req.params.proj_id
    getSummarizeNote(uxerId, projectId, (data) => {
      res.send(data)
    })
  }
}