import * as dao from "./dao.js"

function ModuleRoutes(app) {
	app.put("/api/modules/:mid", async (req, res) => {
		const {mid} = req.params
		const status = await dao.updateModule(mid, req.body)
		res.json(status)
	})

	app.delete("/api/modules/:mid", async (req, res) => {
		const {mid} = req.params
		const status = await dao.deleteModule(mid)
		res.json(status)
	})

	app.post("/api/courses/:cid/modules", async (req, res) => {
		const {cid} = req.params
		const module = req.body
		module.course = cid
		const newModule = await dao.createModule(module)
		res.json(newModule)
	})

	app.get("/api/courses/:cid/modules", async (req, res) => {
		const {cid} = req.params
		const modules = await dao.findModulesForCourse(cid)
		res.json(modules)
	})
}

export default ModuleRoutes
