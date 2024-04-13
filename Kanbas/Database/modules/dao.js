import model from "./model.js"

export const updateModule = (mid, module) => model.findOneAndUpdate({_id: mid}, {$set: module}, {new: true})
export const deleteModule = (mid) => model.deleteOne({_id: mid})
export const createModule = (module) => {delete module._id; return model.create(module)}
export const findModulesForCourse = (cid) => model.find({course: cid})

