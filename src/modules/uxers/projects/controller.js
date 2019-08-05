import { getProjectByUxerId, getOneProject, createProject, updateProject } from 'api/modules/uxers/projects/model'
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
  },
  getOne: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const projects = await getOneProject(uxerId, projectId)
    res.send(projects)
  },
  update: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const {name, cover_url} = req.body
    if(_.isString(name) && _.isString(cover_url)) {
      const projects = await updateProject(uxerId, projectId, {name, cover_url})
      res.send({ status: projects ? statusCallback.SUCCESS : statusCallback.ERROR, projects })
    } else {
      res.send({ status : statusCallback.ERROR })
    }
  },
  create: async (req, res) => {
    const uxerId = req.params.id
    const {name, cover_url, file_url} = req.body
    if(_.isString(name) && _.isString(cover_url) && _.isString(file_url)) {
      const link_url = 'https://uxsearch.io/' + Math.random().toString(36).substring(7) + '/'
      const projects = await createProject(uxerId, {name, cover_url, file_url, link_url})
      res.send({ status: projects ? statusCallback.SUCCESS : statusCallback.ERROR, projects })
    } else {
      res.send({ status : statusCallback.ERROR })
    }
  }
}