import { API_URL } from '@/constants'
import { appIdStore } from '@/lib/stores'
import { ChatMessage, Nullable } from '@/lib/types'

export type SendMessageData = {
  content: string
  threadId?: Nullable<string>
}
export type SendMessageResponse = {
  threadId: string
  message: ChatMessage
}

export async function sendMessage(data: SendMessageData): Promise<SendMessageResponse> {
  const response = await fetch(`${API_URL}/agent/send-message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ appId: appIdStore.get(), ...data }),
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.error || response.statusText)
  }

  return payload
}
