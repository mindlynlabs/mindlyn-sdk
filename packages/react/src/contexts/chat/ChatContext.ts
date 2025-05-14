import { createContext, useContext } from 'react'

import { ChatMessage } from '@/lib/types'

export type ChatContextType = {
  messages: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  updateMessage: (messageId: string, payload: Partial<ChatMessage>) => void

  threadId: string | null
  setThreadId: (threadId: string | null) => void

  pending: boolean
  setPending: (pending: boolean) => void

  deleteChat: () => void
}

export const ChatContext = createContext<ChatContextType>({
  messages: [],
  addMessage: () => {},
  updateMessage: () => {},
  threadId: null,
  setThreadId: () => {},
  pending: false,
  setPending: () => {},
  deleteChat: () => {},
})

export const useChatContext = () => useContext(ChatContext)
