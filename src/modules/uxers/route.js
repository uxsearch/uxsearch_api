import express from 'express'
import uxersController from 'api/modules/uxers/controller'
import projectController from 'api/modules/uxers/projects/controller'
import experimentController from 'api/modules/uxers/projects/experimenters/controller'
import questionnaireController from 'api/modules/uxers/projects/questionnaires/controller'
import optionController from 'api/modules/uxers/projects/questionnaires/options/controller'
import answerQuestionController from 'api/modules/uxers/projects/experimenters/answerQuesionnaire/controller'
import answerNoteController from 'api/modules/uxers/projects/experimenters/answerNote/controller'

import requireAuth from 'api/middleware/requireAuth'

const router = express.Router()

// router.get('/:id', requireAuth, uxersController.getUxerById)
// router.post('/add', requireAuth, uxersController.create)
router.put('/:id/update', requireAuth, uxersController.update)
router.delete('/delete', requireAuth, uxersController.delete)

router.get('/:id/projects', requireAuth, projectController.getProjectByUxerId)
router.get('/:id/:url', projectController.getOneByPath)
router.get('/:id/project/:proj_id', projectController.getOne)
router.post('/:id/project/upload', requireAuth, projectController.upload)
router.post('/:id/project/add', requireAuth, projectController.create)
router.put('/:id/project/:proj_id/update', requireAuth, projectController.update)
router.delete('/:id/project/delete', requireAuth, projectController.delete)

router.get('/:id/project/:proj_id/experimenters', requireAuth, experimentController.getAll)
router.get('/:id/project/:proj_id/experimenter/:exper_id', requireAuth, experimentController.getOne)
router.post('/:id/project/:proj_id/record', experimentController.createRecord)
router.post('/:id/project/:proj_id/upload', experimentController.uploadData)
router.delete('/:id/project/:proj_id/experimenter/:exper_id', requireAuth, experimentController.delete)

router.get('/:id/project/:proj_id/questionnaire', questionnaireController.getQuestionnaire)
router.put('/:id/project/:proj_id/updatequestionnaire', requireAuth, questionnaireController.updateQuestionnaire)
router.get('/:id/project/:proj_id/test-note', requireAuth, questionnaireController.getNote)
router.put('/:id/project/:proj_id/updatenote', requireAuth, questionnaireController.updateNote)
router.delete('/:id/project/:proj_id/delete-question', requireAuth, questionnaireController.delete)
router.delete('/:id/project/:proj_id/question/:questionId/delete-option', requireAuth, optionController.delete)

router.get('/:id/project/:proj_id/experimenter/:exper_id/answers-questionnaire', answerQuestionController.getAnswerQuestionnaire)
router.put('/:id/project/:proj_id/experimenter/:exper_id/answer-question/update', answerQuestionController.update)
router.get('/:id/project/:proj_id/experimenter/:exper_id/answer-note', requireAuth, answerNoteController.getAnswerNote)
router.put('/:id/project/:proj_id/experimenter/:exper_id/answer-note/update', requireAuth, answerNoteController.update)

export default router