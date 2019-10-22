import express from 'express'
import uxersController from 'api/modules/uxers/controller'
import projectController from 'api/modules/uxers/projects/controller'
import experimentController from 'api/modules/uxers/projects/experimenters/controller'
import questionnaireController from 'api/modules/uxers/projects/questionnaires/controller'
import optionController from 'api/modules/uxers/projects/questionnaires/options/controller'
import answerQuestionController from 'api/modules/uxers/projects/experimenters/answerQuesionnaire/controller'
import answerNoteController from 'api/modules/uxers/projects/experimenters/answerNote/controller'

const router = express.Router()

router.get('/', uxersController.getAll)
router.get('/:id', uxersController.getUxerById)
router.post('/add', uxersController.create)
router.put('/:id/update', uxersController.update)
router.delete('/delete', uxersController.delete)

router.get('/:id/projects', projectController.getProjectByUxerId)
router.get('/:id/project/:proj_id', projectController.getOne)
router.post('/:id/project/add', projectController.create)
router.put('/:id/project/:proj_id/update', projectController.update)
router.delete('/:id/project/delete', projectController.delete)

router.get('/:id/project/:proj_id/experimenters', experimentController.getAll)
router.get('/:id/project/:proj_id/experimenter/:exper_id', experimentController.getOne)
router.post('/:id/project/:proj_id/record', experimentController.createRecord)
router.post('/:id/project/:proj_id/upload', experimentController.uploadData)
router.delete('/:id/project/:proj_id/experimenter/:exper_id', experimentController.delete)

router.get('/:id/project/:proj_id/questionnaire', questionnaireController.getQuestionnaire)
router.put('/:id/project/:proj_id/updatequestionnaire', questionnaireController.updateQuestionnaire)
router.get('/:id/project/:proj_id/test-note', questionnaireController.getNote)
router.put('/:id/project/:proj_id/updatenote', questionnaireController.updateNote)
router.delete('/:id/project/:proj_id/delete-question', questionnaireController.delete)
router.delete('/:id/project/:proj_id/question/:questionId/delete-option', optionController.delete)

router.get('/:id/project/:proj_id/experimenter/:exper_id/answers-questionnaire', answerQuestionController.getAnswerQuestionnaire)
router.put('/:id/project/:proj_id/experimenter/:exper_id/answer-question/update', answerQuestionController.update)
router.get('/:id/project/:proj_id/experimenter/:exper_id/note/:note_id/answer', answerNoteController.getOne)
router.put('/:id/project/:proj_id/experimenter/:exper_id/answer-note/update', answerNoteController.update)

export default router