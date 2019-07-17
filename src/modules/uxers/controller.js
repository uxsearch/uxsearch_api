import { getAll } from 'api/modules/uxers/model'

export default {
  getAll: async (req, res) => {
    const uxers = await getAll()
    res.send(uxers)
  }
}