import { LoggedInUser, UserState } from '../../models'
import {
  AccountRepositoryLoginResponseLogged_in_user,
  IgApiClient,
  IgLoginRequiredError,
  IgCheckpointError,
} from 'instagram-private-api'
import { saveData } from './saveData'
import { setUserState } from './setUserState'
import Bluebird from 'bluebird'

export async function login(ig: IgApiClient) {
  await setUserState(ig)

  Bluebird.try(async () => {
    await ig.account.currentUser()
  })
    .catch(IgLoginRequiredError, async () => {
      console.log('================== error: login_required ========================')
      await newLoginRequest(ig)
    })
    .catch(IgCheckpointError, async () => {
      console.log(ig.state.checkpoint) // Checkpoint info here
      console.log(ig.state.challengeUrl)
      // await ig.challenge.auto(true) // Requesting sms-code or click "It was me" button
      // console.log(ig.state.checkpoint) // Challenge info here
      // console.log(await ig.challenge.sendSecurityCode(code))
    })
    .catch((e) => console.log('Could not resolve checkpoint:', e, e.stack))
}

export async function newLoginRequest(ig: IgApiClient) {
  ig.state.generateDevice(process.env.IG_USERNAME || '')
  const loggedInUser = await ig.account.login(process.env.IG_USERNAME || '', process.env.IG_PASSWORD || '')
  const state = await ig.state.serialize()
  await saveData(state, UserState)
  await saveData(loggedInUser, LoggedInUser)
}

export const getLoggedInUser = async (): Promise<AccountRepositoryLoginResponseLogged_in_user | null> => {
  const data = (await LoggedInUser.findOne())?.data
  return data ? JSON.parse(data) : null
}
