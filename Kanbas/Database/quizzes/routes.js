import * as dao from "./dao.js"
import {quizTypes, assignmentGroups} from "./schema.js"
import {questionTypes} from "./questions/questionSchema.js"

function QuizRoutes(app) {
	app.put("/api/quizzes/:qid", async (req, res) => {
		const {qid} = req.params
		const newQuiz = await dao.updateQuiz(qid, req.body)
		res.json(newQuiz)
	})

	app.delete("/api/quizzes/:qid", async (req, res) => {
		const {qid} = req.params
		const status = await dao.deleteQuiz(qid)
		res.json(status)
	})

	app.post("/api/quizzes/:qid", async (req, res) => {
		const {qid} = req.params
		const status = await dao.createQuestion(qid, req.body)
		res.json(status)
	})

	app.post("/api/courses/:cid/quizzes", async (req, res) => {
		const {cid} = req.params
		const status = await dao.createQuiz({course: cid})
		res.json(status)
	})

	app.get("/api/courses/:cid/quizzes", async (req, res) => {
		const {type} = req.query
		if (type) {
			const quizzes = await dao.findQuizzesByCourseIdAndType(req.params.cid, type)
			res.json(quizzes)
			return
		}

		const {group} = req.query
		if (group) {
			const quizzes = await dao.findQuizzesByCourseIdAndGroup(req.params.cid, group)
			res.json(quizzes)
			return
		}

		const {cid} = req.params
		const quizzes = await dao.findQuizzesByCourseId(cid)
		res.json(quizzes)
	})

	app.get("/api/quizzes/:qid/:quid", async (req, res) => {
		const {qid, quid} = req.params
		const question = await dao.findQuestionById(qid, quid)
		res.json(question)
	})

	app.put("/api/quizzes/:qid/:quid", async (req, res) => {
		const {qid, quid} = req.params
		const newQuestion = await dao.updateQuestion(qid, quid, req.body)
		res.json(newQuestion)
	})

	app.get("/api/quizzes/:qid", async (req, res) => {
		const {qid} = req.params
		const quiz = await dao.findQuizById(qid)
		const quizObject = quiz.toObject( {virtuals: true})
		res.json(quizObject)
	})

	app.get("/api/quizTypes", async (req, res) => {
		res.json(quizTypes)
	})

	app.get("/api/quizAssignmentGroups", async (req, res) => {
		res.json(assignmentGroups)
	})

	app.get("/api/quizQuestionTypes", async (req, res) => {
		res.json(questionTypes)
	})
}

export default QuizRoutes
