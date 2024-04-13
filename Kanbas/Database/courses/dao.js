import model from "./model.js"
import enrollmentModel from "../enrollments/model.js"

export const findAllCourses = () => model.find()
export const createCourse = (course) => {delete course._id; return model.create(course)}
export const deleteCourse = (courseId) => model.deleteOne({_id: courseId})
export const updateCourse = (courseId, course) => model.updateOne({_id: courseId}, {$set: course})
export const getCourseById = (courseId) => model.findById(courseId)
export const findEnrollmentsForCourse = (courseId) => enrollmentModel.find({course: courseId})

