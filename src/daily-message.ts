import 'dotenv/config'
import { IgApiClient, IgCheckpointError } from 'instagram-private-api'
import mongoose from 'mongoose'
import { login, messageAllInbox, verificationChallenge } from './instagram/helpers'
import Bluebird from 'bluebird'

mongoose.set('strictQuery', false)

const ig = new IgApiClient()
ig.state.proxyUrl = process.env.IG_PROXY as string

const startApp = async () => {
  await login(ig)

  return Bluebird.try(async () => {
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
  process.exit(0)
})
