import { getAll, getUxerById, createUxer, updateUxer, uploadProfileImg, deleteUxer } from 'api/modules/uxers/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}


export default {
  getAll: async (req, res) => {
    const uxers = await getAll()
    res.send(uxers)
  },
  getUxerById: async (req, res) => {
    const id = req.params.id
    const uxers = await getUxerById(id)
    res.send(uxers)
  },
  update: async (req, res) => {
    const id = req.params.id
    const { name, company } = req.body
    if (_.isString(name) && _.isString(company)) {
      const uxers = await updateUxer(id, { name, company })
      res.send({ status: uxers ? statusCallback.SUCCESS : statusCallback.ERROR, uxers })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  },
  upload: async (req, res) => {
    const { file } = req.files
    const upload = await uploadProfileImg(file[0])
    res.status(201).send({ status: statusCallback.SUCCESS, img_url: upload })
  },
  create: async (req, res) => {
    const { name, company } = req.body
    if (_.isString(name) && _.isString(company)) {
      const uxers = await createUxer({ name, company })
      res.status(201).send({ status: uxers ? statusCallback.SUCCESS : statusCallback.ERROR, uxers })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  },
  delete: async (req, res) => {
    const { uxerId } = req.body
    const haveUxers = await deleteUxer(uxerId)
    res.send({ status: haveUxers === 0 ? statusCallback.SUCCESS : statusCallback.ERROR })
  }
}