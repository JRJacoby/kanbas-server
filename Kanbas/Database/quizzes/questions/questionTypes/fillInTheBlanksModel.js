import questionModel from "../questionModel.js"
import fillInTheBlanksSchema from "./fillInTheBlanksSchema.js"

const fillInTheBlanksModel = questionModel.discriminator("FillInTheBlanksModel", fillInTheBlanksSchema)

export default fillInTheBlanksModel

