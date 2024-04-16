import mongoose from "mongoose"
import questionSchema from "./questions/questionSchema.js"

export const quizTypes = ['Graded Quiz', 'Practice Quiz', 'Graded Survey', 'Ungraded Survey']
export const assignmentGroups = ['Quizzes', 'Exams', 'Assignments', 'Projects']
const showCorrectAnswersOptions = ['Never', 'Immediately', 'After Last Attempt', 'After Grading']

const getEndOfDay = () => {
	const now = new Date()
	const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
	return endOfDay
}

const getStartOfDay = () => {
	const now = new Date()
	const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
	return startOfDay
}

const quizSchema = new mongoose.Schema({
	title: {type: String, required: true, default: 'New Quiz Title'},
	description: {type: String, required: true, default: 'New Quiz Description'},
	course: {type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel', required: true},
	published : {type: Boolean, required: true, default: false},

	quizType: {
		type: String,
		required: true,
		enum: quizTypes,
		default: 'Graded Quiz'
	},

	points: {
		type: Number,
		required: true,
		min: 0,
		validate: {
			validator: Number.isInteger,
			message: 'points must be an integer. Was given {VALUE}'
		},
		default: 100
	},

	assignmentGroup: {
		type: String,
		required: true,
		enum: assignmentGroups,
		default: 'Quizzes'
	},

	shuffleAnswers: {type: Boolean, required: true, default: true},

	timeLimit: {
		type: Number,
		required: true,
		min: 1,
		validate: {
			validator: Number.isInteger,
			message: 'timeLimit must be an integer. Was given {VALUE}'
		},
		default: 20
	},

	multipleAttempts: {type: Boolean, required: true, default: false},

	showCorrectAnswers: {
		type: String,
		required: true,
		enum: showCorrectAnswersOptions,
		default: 'Never'
	},

	accessCode: {
		type: String,
		validate: {
			validator: function(v) {
				return v.length > 0
			}
		}
	},

	oneQuestionAtATime: {type: Boolean, required: true, default: true},
	webcamRequired: {type: Boolean, required: true, default: false},
	lockdownBrowserRequired: {type: Boolean, required: true, default: false},
	lockQuestionsAfterAnswering: {type: Boolean, required: true, default: false},
	requiredToViewResults: {type: Boolean, required: true, default: false},
	viewResponses: {type: String, required: true, default: 'Always'},

	dueDate: {type: Date, required: true, default: getEndOfDay()},

	availableDate: {
		type: Date,
		required: true,
		validate: {
			validator: function(v) {
				return v <= this.dueDate
			},
			message: 'availableDate must be before or on the dueDate'
		},
		default: getStartOfDay()
	},

	untilDate: {
		type: Date,
		required: true,
		validate: {
			validator: function(v) {
				return v >= this.dueDate
			},
			message: 'untilDate must be after or on the dueDate'
		},
		default: getEndOfDay()
	},

	questions: {type: [questionSchema], required: true, default: []},
}, {collection: "quizzes"})

quizSchema.pre('validate', function(next) {
	if (this.availableDate > this.dueDate) {
		this.invalidate('availableDate', 'availableDate must be before or on the dueDate')
	}

	if (this.untilDate < this.dueDate) {
		this.invalidate('untilDate', 'untilDate must be after or on the dueDate')
	}

	next()
})

quizSchema.virtual('availability').get(function() {
	let availability
	const now = new Date()
	if (now > this.untilDate) {
		availability = 'Closed'
	} else if (now < this.availableDate) {
		availability = `Not available until ${this.availableDate.toLocaleDateString()}`
	} else {
		availability = 'Available'
	}

	return availability
})

export default quizSchema
