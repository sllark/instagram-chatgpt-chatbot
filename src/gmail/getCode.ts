import { google } from 'googleapis'
import axios from '../utils/axios'

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

export const getCode = async () => {
  try {
    const { token } = await oAuth2Client.getAccessToken()
    const response = await axios.get('/messages', {
      params: { maxResults: 1, q: 'from:instagram.com  is:unread  subject:"verify your account"' },
      headers: {
        'Authorization': `Bearer ${token} `,
        'Content-type': 'application/json',
      },
    })

    if (response.data && response.data.messages && response.data.messages[0]) {
      const code = await ExtractCodeFromMessage(response.data.messages[0]?.id, token)
      if (code) {
        await TrashMessage(response.data.messages[0]?.id, token)
      }

      return code
    } else return 0
  } catch (error) {
    console.log(error)
    return error
  }
}

export const ExtractCodeFromMessage = async (messageId: string, token: string | null | undefined) => {
  try {
    const response = await axios.get(`/messages/${messageId}`, {
      headers: {
        'Authorization': `Bearer ${token} `,
        'Content-type': 'application/json',
      },
    })

    let code
    const message = response.data.snippet.split(' ')
    message.forEach((word: string) => {
      if (!isNaN(parseInt(word)) && typeof parseInt(word) === 'number' && word.length === 6) code = parseInt(word)
    })

    return code
  } catch (error) {
    return error
  }
}

export const TrashMessage = async (messageId: string, token: string | null | undefined) => {
  try {
    return await axios.get(`/messages/${messageId}/trash`, {
      headers: {
        'Authorization': `Bearer ${token} `,
        'Content-type': 'application/json',
      },
    })
  } catch (error) {
    return error
  }
}
