import mongoose from "mongoose"

export const questionTypes = ['trueFalse', 'multipleChoice', 'fillInTheBlanks']

const questionSchema = new mongoose.Schema({
	title: {type: String, required: true, default: 'New Question Title'},
	questionText: {type: String, required: true, default: 'New Question Text'},

	questionNum: {
		type: Number,
		required: true,
		min: 0,
		validate: {
			validator: Number.isInteger,
			message: 'questionNum must be an integer. Was given {VALUE}'
		},
		default: 0
	},

	points: {
		type: Number,
		required: true,
		min: 0,
		validate: {
			validator: Number.isInteger,
			message: 'points must be an integer. Was given {VALUE}'
		},
		default: 10
	},

	questionType: {
		type: String,
		required: true,
		enum: questionTypes,
		default: 'multipleChoice'
	},
}, { collection: 'questions', discriminatorKey: 'questionType'})

export default questionSchema
