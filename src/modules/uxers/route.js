import express from 'express'
import uxersController from 'api/modules/uxers/controller'
import projectController from 'api/modules/uxers/projects/controller'
import experimentController from 'api/modules/uxers/projects/experimenters/controller'
import questionnaireController from 'api/modules/uxers/projects/questionnaires/controller'
import answerQuestionController from 'api/modules/uxers/projects/experimenters/answerQuesionnaire/controller'

const router = express.Router()

router.get('/', uxersController.getAll)
router.get('/:id', uxersController.getUxerById)
router.post('/add', uxersController.create)
router.put('/:id/edit', uxersController.update)

router.get('/:id/projects', projectController.getProjectByUxerId)
router.get('/:id/project/:proj_id', projectController.getOne)
router.post('/:id/project/add', projectController.create)
router.put('/:id/project/:proj_id/edit', projectController.update)

router.get('/:id/project/:proj_id/experimenters', experimentController.getAll)
router.post('/:id/project/:proj_id/record', experimentController.insertRecord)

router.get('/:id/project/:proj_id/questionnaire', questionnaireController.getQuestionnaire)
router.get('/:id/project/:proj_id/test-note', questionnaireController.getNote)

router.get('/:id/project/:proj_id/experimenter/:exper_id/questionnaire/:quest_id/answer', answerQuestionController.getOneAnswer)
router.post('/:id/project/:proj_id/experimenter/:exper_id/answer-question', answerQuestionController.createAnswer)

export default router