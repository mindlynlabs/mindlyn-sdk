import { PropsWithChildren, useState } from 'react'

import { messagesStore, threadIdStore } from '@/lib/stores'
import { ChatMessage } from '@/lib/types'

import { ChatContext } from './ChatContext'

export function ChatProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => messagesStore.get())
  const [threadId, setThreadId] = useState<string | null>(() => threadIdStore.get())
  const [pending, setPending] = useState(false)

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => {
      const next = [...prev, message]
      messagesStore.set(next)
      return next
    })
  }

  const updateMessage = (messageId: string, payload: Partial<ChatMessage>) => {
    setMessages((prev) => {
      const next = prev.map((message) => (message.id !== messageId ? message : { ...message, ...payload }))
      messagesStore.set(next)
      return next
    })
  }

  const handleSetThreadId = (threadId: string | null) => {
    setThreadId(threadId)
    threadIdStore.set(threadId)
  }

  const deleteChat = () => {
    setMessages([])
    messagesStore.clear()
    setThreadId(null)
    threadIdStore.clear()
    setPending(false)
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        updateMessage,
        threadId,
        setThreadId: handleSetThreadId,
        pending,
        setPending,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
