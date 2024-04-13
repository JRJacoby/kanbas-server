import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	number: {type: String, required: true},
	// These are probably better stored at Date types in a professional envrionment but the 
	// Example data we were given already is stored as strings and storing them as string
	// simplifies things by not having to convert to an HTML-friendly format with every DAO method
	startDate: {type: String, required: true},
	endDate: {type: String, required: true},
	image: {type: String, required: true}
}, {collection: "courses"})

export default courseSchema
