import { IgApiClient } from 'instagram-private-api'
import { getCode } from '../../gmail'

export const verificationChallenge = async (ig: IgApiClient) => {
  // console.log(ig.state.checkpoint) // Checkpoint info here
  // console.log(ig.state.challengeUrl)
  await ig.challenge.selectVerifyMethod('1', true) // Requesting email verification
  const code = await getCode()
  console.log('Verification Code: ' + code)
  await ig.challenge.sendSecurityCode(code as number)
}
