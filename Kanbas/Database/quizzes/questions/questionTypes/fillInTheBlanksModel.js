import questionModel from "../questionModel.js"
import fillInTheBlanksSchema from "./fillInTheBlanksSchema.js"

const fillInTheBlanksModel = questionModel.discriminator("fillInTheBlanks", fillInTheBlanksSchema)

export default fillInTheBlanksModel

