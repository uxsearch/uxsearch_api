import { getProjectByUxerId, getOneProject, getProjectByPath, createProject, uploadCoverImage, updateProject, deleteProject } from 'api/modules/uxers/projects/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  getProjectByUxerId: async (req, res) => {
    const uxerId = req.user.uid
    const projects = await getProjectByUxerId(uxerId)
    res.send(projects)
  },
  getOne: async (req, res) => {
    const uxerId = req.params.id
    const projectId = req.params.proj_id
    const projects = await getOneProject(uxerId, projectId)
    res.send(projects)
  },
  getOneByPath: async (req, res) => {
    const uxerId = req.params.id
    const generate_url = req.params.url
    const project = await getProjectByPath(uxerId, generate_url)
    res.send(project)
  },
  update: async (req, res) => {
    const uxerId = req.user.uid
    const projectId = req.params.proj_id
    const { name, cover_url, description } = req.body
    if (_.isString(name) && _.isString(cover_url)) {
      const projects = await updateProject(uxerId, projectId, { name, cover_url, description })
      res.send({ status: projects ? statusCallback.SUCCESS : statusCallback.ERROR, projects })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  },
  upload: async (req, res) => {
    const { file } = req.files
    const upload = await uploadCoverImage(file[0])
    res.status(201).send({ status: statusCallback.SUCCESS, cover_url: upload })
  },
  create: async (req, res) => {
    const uxerId = req.user.uid
    const { name, cover_url, description, file_url } = req.body
    if (_.isString(name) && _.isString(cover_url) && _.isString(file_url)) {
      const projects = await createProject(uxerId, { name, cover_url, description, file_url })
      res.status(201).send({ status: projects ? statusCallback.SUCCESS : statusCallback.ERROR, projects })
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  },
  delete: async (req, res) => {
    const uxerId = req.user.uid
    const { projectId } = req.body
    const haveProject = await deleteProject(uxerId, projectId)
    res.send({ status: haveProject === 0 ? statusCallback.SUCCESS : statusCallback.ERROR })
  }
}