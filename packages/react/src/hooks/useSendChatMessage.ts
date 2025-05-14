import { nanoid } from 'nanoid'
import { useCallback } from 'react'

import { sendMessage } from '@/api/sendMessage'
import { useChatContext } from '@/contexts/chat'

export function useSendChatMessage() {
  const { threadId, addMessage, setPending, setThreadId } = useChatContext()

  return useCallback(
    async (content: string) => {
      setPending(true)

      addMessage({
        id: nanoid(),
        content,
        type: 'TEXT',
        author: 'USER',
        createdAt: new Date().toISOString(),
      })

      try {
        const response = await sendMessage({ threadId, content })

        if (!threadId || response.threadId !== threadId) {
          setThreadId(response.threadId)
        }
        if (response.message) {
          addMessage(response.message)
        }
      } catch (error) {
        console.error('Error sending message:', error)

        addMessage({
          id: nanoid(),
          content: 'Something went wrong.',
          author: 'BOT',
          type: 'TEXT',
          createdAt: new Date().toISOString(),
        })
      } finally {
        setPending(false)
      }
    },
    [threadId, addMessage, setPending, setThreadId],
  )
}
