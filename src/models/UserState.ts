import { Schema, model } from 'mongoose'

const userStateSchema = new Schema({
  data: {
    type: Schema.Types.String,
    get: function (data: string) {
      try {
        return JSON.parse(data)
      } catch (error) {
        return data
      }
    },
    set: function (data: object | string) {
      return typeof data === 'string' ? data : JSON.stringify(data)
    },
  },
})

export const UserState = model('UserState', userStateSchema)
