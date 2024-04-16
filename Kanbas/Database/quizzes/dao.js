import model from "./model.js"

export const findQuizzesByCourseId = (courseId) => model.find({course: courseId})
export const findQuizById = (quizId) => model.findById(quizId)
export const createQuiz = (quiz) => {delete quiz._id; return model.create(quiz)}
export const updateQuiz = (quizId, quiz) => model.findOneAndUpdate({_id: quizId}, {$set: quiz}, {new: true})
export const deleteQuiz = (quizId) => model.deleteOne({_id: quizId})
export const findQuizzesByCourseIdAndType = (courseId, quizType) => model.find({course: courseId, quizType: quizType})
export const findQuizzesByCourseIdAndGroup = (courseId, assignmentGroup) => model.find({course: courseId, assignmentGroup: assignmentGroup})

export const findQuestionById = (quizId, questionId) => {
	return model.findbyId(quizId).then(quiz => {
		return quiz.questions.find(question => question._id === questionId)})
}

export const updateQuestion = (quizId, questionId, question) => {
	return model.findById(quizId).then(quiz => {
		const index = quiz.questions.findIndex(question => question._id === questionId)
		quiz.questions[index] = question
		return quiz.save()
	})
}

export const createQuestion = (quizId, question) => {
	return model.findById(quizId).then(quiz => {
		console.log(`adding question ${JSON.stringify(question)} to quiz ${quizId}`)
		quiz.questions.push(question)
		return quiz.save()
	})
}
