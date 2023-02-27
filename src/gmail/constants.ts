export const generateConfig = (url: string, accessToken: string | null | undefined) => {
  return {
    method: 'get',
    url: url,
    headers: {
      'Authorization': `Bearer ${accessToken} `,
      'Content-type': 'application/json',
    },
  }
}

export const auth = {
  type: 'OAuth2',
  user: 'abdulrehman.6ab@gmail.com',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
}

export const mailOptions = {
  from: 'Abdul <abdulrehman.6ab@gmail.com>',
  to: 'sid.cd.varma@gmail.com',
  subject: 'Gmail API NodeJS',
}
