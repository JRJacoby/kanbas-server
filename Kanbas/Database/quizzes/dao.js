import model from "./model.js"
import questionModel from "./questions/questionModel.js"
import mcModel from "./questions/questionTypes/multipleChoiceModel.js"
import fbModel from "./questions/questionTypes/fillInTheBlanksModel.js"
import tfModel from "./questions/questionTypes/trueFalseModel.js"

const modelMap = {
	"multipleChoice": mcModel,
	"fillInTheBlanks": fbModel,
	"trueFalse": tfModel
}

export const findQuizById = async (quizId) => {
	let quiz = await model.findById(quizId).populate("questions")
	return quiz
}
export const findQuizzesByCourseId = (courseId) => model.find({course: courseId}).populate("questions")
export const findQuizzesByCourseIdAndType = (courseId, quizType) => model.find({course: courseId, quizType: quizType}).populate("questions")
export const findQuizzesByCourseIdAndGroup = (courseId, assignmentGroup) => model.find({course: courseId, assignmentGroup: assignmentGroup}).populate("questions")

export const createQuiz = (quiz) => {delete quiz._id; return model.create(quiz)}
export const updateQuiz = (quizId, quiz) => model.findOneAndUpdate({_id: quizId}, {$set: quiz}, {new: true})
export const deleteQuiz = async (quizId) => {
	let quiz = await model.findById(quizId)
	let questions = quiz.questions

	await questionModel.deleteMany({_id: {$in: questions}})

	return await model.deleteOne({_id: quizId})
}

export const findQuestionById = (questionId) => questionModel.findById(questionId)
export const updateQuestion = async (questionId, question) => {
	console.log(`updateQuestion incoming question: ${JSON.stringify(question)}`)
	let oldQuestion = await questionModel.findById(questionId)
	console.log(`oldQuestion: ${JSON.stringify(oldQuestion)}`)
	const specificModel = modelMap[question.questionType]

	if (oldQuestion.questionType == question.questionType) {
		console.log(`same question type`)
		return specificModel.findOneAndUpdate({_id: questionId}, {$set: question}, {new: true})
	}

	console.log(`different question type`)
	question._id = questionId
	await questionModel.deleteOne({_id: questionId})
	await specificModel.create(question)

	return questionModel.findOneAndUpdate({_id: questionId}, {$set: question}, {new: true})
}
export const createQuestion = async (quizId, question) => {
	delete question._id

	const questionModel = modelMap[question.questionType]
	delete question.questionType
	const newQuestion = await questionModel.create(question)
	console.log(`newQuestion returned in dao ${JSON.stringify(newQuestion)}`)

	await model.updateOne({_id: quizId}, {$push: {questions: newQuestion._id}})
	return await model.findById(quizId).populate("questions")
}
