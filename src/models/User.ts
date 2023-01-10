import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  messageCount: number
  threadId: string
}

const userSchema = new Schema({
  threadId: {
    type: Schema.Types.String,
    required: true,
  },
  messageCount: { type: Schema.Types.Number, default: 0 },
})

export const User = model<IUser>('User', userSchema)
