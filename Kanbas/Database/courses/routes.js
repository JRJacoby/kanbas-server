import * as dao from "./dao.js"

export default function CourseRoutes(app) {
	app.get("/api/courses", async (req, res) => {
		const courses = await dao.findAllCourses();
		res.send(courses);
	})

	app.post("/api/courses", async (req, res) => {
		const course = await dao.createCourse(req.body)
		res.send(course)
	})

	app.delete("/api/courses/:id", async (req, res) => {
		const status = await dao.deleteCourse(req.params.id)
		res.json(status)
	})

	app.put("/api/courses/:id", async (req, res ) => {
		const status = await dao.updateCourse(req.params.id, req.body)
		res.json(status)
	})

	app.get("/api/courses/:id", async (req, res) => {
		const course = await dao.getCourseById(req.params.id)
		if (!course) {
			res.status(404).send("Course not found")
			return
		}
		res.send(course)
	})

	app.get("/api/courses/enrollments/:cid", async (req, res) => {
		const enrollments = await dao.findEnrollmentsForCourse(req.params.cid)
		res.send(enrollments)
	})
}
