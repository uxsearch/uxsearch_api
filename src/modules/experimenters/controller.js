import { getAll, getExperimentById, createExperimenter } from 'api/modules/experimenters/model'
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
  },
  create: async (req, res) => {
    const { firstname, lastname, birthdate, gender, tel, email, province, country, job, educate } = req.body
    if (_.isString(firstname) && 
    _.isString(lastname) && 
    _.isString(birthdate) && 
    _.isString(gender) && 
    _.isString(tel) && 
    _.isString(email) && 
    _.isString(province) && 
    _.isString(country) && 
    _.isString(job) && 
    _.isString(educate)) {
      const experimenter = await createExperimenter ({ firstname, lastname, birthdate, gender, tel, email, province, country, job, educate })
      res.status(201).send({ status: experimenter ? statusCallback.SUCCESS : statusCallback.ERROR, experimenter})
    } else {
      res.send({ status : statusCallback.ERROR })
    }
  }
}