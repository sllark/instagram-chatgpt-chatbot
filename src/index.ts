import 'dotenv/config'
import { IgApiClient, IgCheckpointError } from 'instagram-private-api'
import mongoose from 'mongoose'
import { login, replyUnreadMessages, messageAllInbox, verificationChallenge } from './instagram/helpers'
import Bluebird from 'bluebird'

mongoose.set('strictQuery', false)

const ig = new IgApiClient()

const startApp = async () => {
  await login(ig)

  Bluebird.try(async () => {
    await replyUnreadMessages(ig)
    await messageAllInbox(ig)
  })
    .catch(IgCheckpointError, async () => {
      await verificationChallenge(ig)
    })
    .catch((e) => console.log('Could not resolve checkpoint:', e, e.stack))
}

mongoose.connect(process.env.MONGOURI || '', async function (error) {
  if (error) {
    console.log(error)
    return
  }

  console.log('connection established')
  await startApp()
})
