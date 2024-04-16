import mongoose from "mongoose"

const trueFalseSchema = new mongoose.Schema({
	answer: {type: Boolean, required: true, default: true}
})

export default trueFalseSchema
