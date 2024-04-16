import mongoose from "mongoose"

export const questionTypes = ['trueFalse', 'multipleChoice', 'fillInTheBlanks']

const questionSchema = new mongoose.Schema({
	// Explicitly include _id as a field so question documents that are
	// nested inside quiz documents are automatically assigned an _id
	_id: {type: mongoose.Schema.Types.ObjectId, auto: true},
	title: {type: String, required: true, default: 'New Question Title'},
	questionText: {type: String, required: true, default: 'New Question Text'},

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
}, {discriminatorKey: 'questionType'})

export default questionSchema
