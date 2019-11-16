import firebase from 'api/firebase-config'
import { db } from 'api/firebasehelper'
import { getAllNoteId, getQuestionById } from 'api/modules/uxers/projects/questionnaires/model'
import { getAllExperimenterKey, getTimeRecord } from 'api/modules/uxers/projects/experimenters/model'
import { getAllAnswerByQuestionId } from 'api/modules/uxers/projects/experimenters/answerNote/model'

async function getSummarizeNote(uxerId, projectId, callback) {
  let summaryState = {
    allExper: 0,
    takeNoteExper: 0,
    summary: []
  }
  const questionsId = await getAllNoteId(uxerId, projectId)
  if (questionsId.length !== 0) {
    const experimentersKey = await getAllExperimenterKey(uxerId, projectId)
    summaryState.allExper = experimentersKey.length
    if (experimentersKey.length !== 0) {
      questionsId.forEach(async question => {
        const questionData = await getQuestionById(uxerId, projectId, question.id)
        if (questionData.data.question.type_form === 'textbox') {

          summaryState.summary.push({
            questionId: questionData.id,
            question: questionData.data.question.question,
            type_form: questionData.data.question.type_form,
            answer: []
          })
        } else if (questionData.data.question.type_form === 'multiple' || questionData.data.question.type_form === 'checkbox') {

          let optionArr = []
          let answerArr = []
          questionData.data.options.forEach((option, index) => {
            optionArr.push(option.data.option)
            answerArr.push(0)
          })
          summaryState.summary.push({
            questionId: questionData.id,
            question: questionData.data.question.question,
            type_form: questionData.data.question.type_form,
            options: optionArr,
            answer: answerArr
          })
        }

        if (questionsId.length === summaryState.summary.length) {
          const summarize = await getAllAnswerByQuestionId(uxerId, projectId, experimentersKey, questionsId)
          summaryState.takeNoteExper = summarize.numberTakeNote
          if (summarize.numberTakeNote !== 0) {
            summarize.answers.forEach((sum, index) => {
              summaryState.summary.forEach(state => {
                if (sum.questionId === state.questionId) {
                  if (state.type_form === 'textbox') {
                    state.answer = [...state.answer, sum.answer]
                  } else if (state.type_form === 'multiple') {
                    const indexData = state.options.indexOf(sum.answer)
                    state.answer[indexData]++
                  } else if (state.type_form === 'checkbox') {
                    sum.answer.forEach(answer => {
                      const indexData = state.options.indexOf(answer)
                      state.answer[indexData]++
                    })
                  }
                }
              })
              if (index === summarize.answers.length - 1) {
                callback && callback(summaryState)
              }
            })
          } else {
            callback && callback(summaryState)
          }
        }
      })
    } else {
      callback && callback(summaryState)
    }
  }
  else {
    callback && callback(summaryState)
  }
}

async function getAverageRecordTime(uxerId, projectId, callback) {
  let recordTime = []
  const experimentersKey = await getAllExperimenterKey(uxerId, projectId)
  if (experimentersKey.length !== 0) {
    experimentersKey.forEach(async key => {
      const timeDuration = await getTimeRecord(uxerId, projectId, key)
      recordTime.push(timeDuration)

      if (recordTime.length === experimentersKey.length) {
        let avgTime = 0
        for (let i = 0; i < recordTime.length; i++) {
          const newValue = Math.floor(recordTime[i])
          avgTime = avgTime + newValue
        }

        avgTime = avgTime / recordTime.length

        if (avgTime > 60) {
          let timeFormat
          if (Math.floor(avgTime / 60) === 1) {
            if (Math.floor(avgTime % 60) === 1) {
              timeFormat = Math.floor(avgTime / 60) + ' minute ' + Math.floor(avgTime % 60) + ' second'
            }
            timeFormat = Math.floor(avgTime / 60) + ' minute ' + Math.floor(avgTime % 60) + ' seconds'
          } else {
            if (Math.floor(avgTime % 60) === 1) {
              timeFormat = Math.floor(avgTime / 60) + ' minutes ' + Math.floor(avgTime % 60) + ' second'
            }
            timeFormat = Math.floor(avgTime / 60) + ' minutes ' + Math.floor(avgTime % 60) + ' seconds'
          }
          callback && callback(timeFormat)
        } else {
          const timeFormat = Math.floor(avgTime % 60) + ' seconds'
          callback && callback(timeFormat)
        }
      }
    })
  }
}

export { getSummarizeNote, getAverageRecordTime }