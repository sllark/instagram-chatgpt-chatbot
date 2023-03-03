import { IgApiClient } from 'instagram-private-api'
import { UserState } from '../../models'
// import { newLoginRequest } from './login'

export const setUserState = async (igClient: IgApiClient) => {
  const data = (await UserState.findOne())?.data
  if (data) await igClient.state.deserialize(data)
  // else await newLoginRequest(igClient)
}
