import questionModel from "../questionModel.js"
import multipleChoiceSchema from "./multipleChoiceSchema.js"

const multipleChoiceModel = questionModel.discriminator("multipleChoice", multipleChoiceSchema)

export default multipleChoiceModel

