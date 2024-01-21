import {model, Schema} from "mongoose"

export interface User {
  _id: string
}

const schema = new Schema<User>({
  _id: {
    type: String,
    required: true
  }
}, {
  _id: false,
  timestamps: true,
  versionKey: false
})

export default model("User", schema);