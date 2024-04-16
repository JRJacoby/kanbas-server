import mongoose from "mongoose"

const multipleChoiceSchema = new mongoose.Schema({
	choices: {
		type: [{type: String, required: true}],
		validate: {
			validator: function(v) {
				return v.length >= 2
			},
			message: 'choices must have at least 2 elements. Was given an array of {VALUE} elements'
		},
		default: ['New Choice 1', 'New Choice 2']
	},

	answer: {type: String, required: true}
})

export default multipleChoiceSchema
