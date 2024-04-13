import mongoose from "mongoose"

const lessonSchema = new mongoose.Schema ({
	name: {type: String, required: true},
	description: {type: String, required: true},
	module: {type: mongoose.Schema.Types.ObjectId, ref: 'ModuleModel', required: true}
})

const moduleSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String, required: true},
	course: {type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel', required: true},
	lessons: [lessonSchema]
}, {collection: "modules"})

export default moduleSchema
