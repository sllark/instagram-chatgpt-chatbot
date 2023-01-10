import mongoose from 'mongoose'

export const saveData = async (data: string | object, DataModel: mongoose.Model<{ data?: string }>) => {
  await DataModel.deleteMany({})
  const userState = await new DataModel({ data: data })
  await userState.save()
}
