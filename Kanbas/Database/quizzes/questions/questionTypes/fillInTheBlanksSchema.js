import mongoose from "mongoose"

const fillInTheBlanksSchema = new mongoose.Schema({
	// The array should be ordered as the answers appear in the question
	answers: {
		type: [{type: String, required: true}],
		validator: {
			validator: function(v) {
				return v.length >= 1
			},
			message: 'answers must have at least 1 element. Was given an array of {VALUE} elements'
		},
		default: ['New Answer']
	}
})

export default fillInTheBlanksSchema
