import express from 'express'
import uxersController from 'api/modules/uxers/controller'
import projectController from 'api/modules/uxers/projects/controller'
import experimentController from 'api/modules/uxers/projects/experimenters/controller'
import questionnaireController from 'api/modules/uxers/projects/questionnaires/controller'
import answerQuestionController from 'api/modules/uxers/projects/experimenters/answerQuesionnaire/controller'
import answerNoteController from 'api/modules/uxers/projects/experimenters/answerNote/controller'

const router = express.Router()

router.get('/', uxersController.getAll)
router.get('/:id', uxersController.getUxerById)
router.post('/add', uxersController.create)
router.put('/:id/update', uxersController.update)
router.delete('/:id/delete', uxersController.delete)

router.get('/:id/projects', projectController.getProjectByUxerId)
router.get('/:id/project/:proj_id', projectController.getOne)
router.post('/:id/project/add', projectController.create)
router.put('/:id/project/:proj_id/update', projectController.update)
router.delete('/:id/project/:proj_id/delete', projectController.delete)

router.get('/:id/project/:proj_id/experimenters', experimentController.getAll)
router.post('/:id/project/:proj_id/record', experimentController.createRecord)
router.delete('/:id/project/:proj_id/experimenter/:exper_id', experimentController.delete)

router.get('/:id/project/:proj_id/questionnaire', questionnaireController.getQuestionnaire)
router.get('/:id/project/:proj_id/test-note', questionnaireController.getNote)

router.get('/:id/project/:proj_id/experimenter/:exper_id/questionnaire/:quest_id/answer', answerQuestionController.getOne)
router.post('/:id/project/:proj_id/experimenter/:exper_id/answer-question/add', answerQuestionController.create)

router.get('/:id/project/:proj_id/experimenter/:exper_id/note/:note_id/answer', answerNoteController.getOne)
router.post('/:id/project/:proj_id/experimenter/:exper_id/answer-note/add', answerNoteController.create)
router.put('/:id/project/:proj_id/experimenter/:exper_id/answer/:ans_id/update', answerNoteController.update)

export default router