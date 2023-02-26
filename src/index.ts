import 'dotenv/config'
import { IgApiClient, AccountRepositoryLoginResponseLogged_in_user } from 'instagram-private-api'
import mongoose from 'mongoose'
import { login, replyUnreadMessages, messageAllInbox } from './instagram/helpers'

const ig = new IgApiClient()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let loggedInUser: AccountRepositoryLoginResponseLogged_in_user | null

const startApp = async () => {
  await login(ig)
  // loggedInUser = await getLoggedInUser()

  await replyUnreadMessages(ig)
  await messageAllInbox(ig)
}

mongoose.connect(process.env.MONGOURI || '', async function (error) {
  if (error) {
    console.log(error)
    return
  }

  console.log('connection established')
  await startApp()
})
