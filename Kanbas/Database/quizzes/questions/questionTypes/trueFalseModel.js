import questionModel from "../questionModel.js"
import trueFalseSchema from "./trueFalseSchema.js"

const trueFalseModel = questionModel.discriminator("trueFalse", trueFalseSchema)

export default trueFalseModel

