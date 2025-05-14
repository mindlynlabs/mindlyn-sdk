import { useEffect, useRef } from 'react'

import { Message } from '@/components/Message'
import { MessageBubble } from '@/components/MessageBubble'
import { useChatContext } from '@/contexts/chat'
import { useConfigContext } from '@/contexts/config'

export function ChatBody() {
  const { welcomeMessage } = useConfigContext()
  const { messages, pending } = useChatContext()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const prevLengthRef = useRef<number | null>(null)

  useEffect(() => {
    const prevLength = prevLengthRef.current

    if ((prevLength === null && messages.length > 0) || (prevLength !== null && messages.length > prevLength)) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    prevLengthRef.current = messages.length
  }, [messages.length])

  return (
    <div className='flex-1 min-h-0 -mb-6 overflow-auto'>
      <div className='mx-auto w-full max-w-2xl flex px-3 md:px-0 flex-col pb-[calc(6rem+env(safe-area-inset-bottom))]'>
        <MessageBubble>{welcomeMessage}</MessageBubble>

        {messages.map((message) => (
          <Message key={[message.id, message.createdAt, message.author, message.type].join()} message={message} />
        ))}

        {pending && (
          <MessageBubble bubbleProps={{ className: 'animate-pulse' }}>
            <span className='typing-dots'>Thinking</span>
          </MessageBubble>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
