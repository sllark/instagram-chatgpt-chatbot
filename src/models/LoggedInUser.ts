import { Schema, model } from 'mongoose'

const LoggedInUserSchema = new Schema({
  data: {
    type: Schema.Types.String,
    set: function (data: object | string) {
      return typeof data === 'string' ? data : JSON.stringify(data)
    },
  },
})

export const LoggedInUser = model('LoggedInUser', LoggedInUserSchema)
