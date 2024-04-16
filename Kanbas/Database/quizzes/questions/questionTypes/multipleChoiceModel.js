import questionModel from "../questionModel.js"
import multipleChoiceSchema from "./multipleChoiceSchema.js"

const multipleChoiceModel = questionModel.discriminator("MultipleChoiceModel", multipleChoiceSchema)

export default multipleChoiceModel

