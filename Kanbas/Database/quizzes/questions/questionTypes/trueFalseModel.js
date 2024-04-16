import questionModel from "../questionModel.js"
import trueFalseSchema from "./trueFalseSchema.js"

const trueFalseModel = questionModel.discriminator("TrueFalseModel", trueFalseSchema)

export default trueFalseModel

