import { getExperimenterTest, createExperimentRecord } from 'api/modules/uxers/projects/experimenters/model'
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
  insertRecord: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const { experimenter_key, firstname, lastname, video_url, video_time, screen_url, screen_time } = req.body
    if (_.isString(experimenter_key) &&
    _.isString(firstname) &&
    _.isString(lastname) &&
    _.isString(video_url) &&
    _.isNumber(video_time) &&
    _.isString(screen_url) &&
    _.isNumber(screen_time)) {
      const record = await createExperimentRecord(uxerId, projectId, { experimenter_key, firstname, lastname, video_url, video_time, screen_url, screen_time })
      res.send({ status: record ? statusCallback.SUCCESS : statusCallback.ERROR, record })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  }
}