import { IgApiClient, DirectThreadEntity, DirectThreadFeedResponseItemsItem } from 'instagram-private-api'
import { User, IUser } from '../../models'

export const messageAllInbox = async (ig: IgApiClient) => {
  const inbox = await getInbox(ig)

  for (const thread of inbox) {
    const user = await getThreadUser(thread)
    const message = `Good Night Queen ❤ ${user.messageCount > 0 ? '#' + (+user.messageCount + 1) : ''}`
    await sendMessage(thread, message)
    user.messageCount = +user.messageCount + 1
    await user.save()
  }
}

export const getInbox = async (ig: IgApiClient) => {
  const chatFeed = ig.feed.directInbox()
  const inbox: DirectThreadEntity[] = [...(await chatFeed.records())]

  while (chatFeed.isMoreAvailable()) {
    const records = await chatFeed.records()
    inbox.push(...records)
  }

  return inbox
}

export const sendMessage = async (thread: DirectThreadEntity, message: string) => {
  await thread.broadcastText(message)
}

export const getThreadUser = async (thread: DirectThreadEntity): Promise<IUser> => {
  let user = await User.findOne({ threadId: thread.threadId })
  if (!user) {
    user = new User({ threadId: thread.threadId })
    await user.save()
  }

  return user
}

export const replyUnreadMessages = async (ig: IgApiClient) => {
  const inbox = await getInbox(ig)
  console.log(inbox)
  for (const thread of inbox) {
    let shouldReply = false
    let userMessages = ''

    const threadInbox = await ig.feed.directThread({ thread_id: thread.threadId, oldest_cursor: '0' }).request()
    const latestMessages = threadInbox.thread.items.reverse()
    latestMessages.forEach(function (message: DirectThreadFeedResponseItemsItem) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (message?.is_sent_by_viewer) {
        shouldReply = false
      } else {
        shouldReply = true
        if (message.item_type === 'text') userMessages += message.text + '\n'
      }
    })

    if (shouldReply) {
      // TODO: Integrate ChatGPT Here
      await sendMessage(thread, 'hello world')
    }
  }
}
