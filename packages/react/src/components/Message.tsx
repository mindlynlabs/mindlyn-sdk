import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

import { MessageAction } from '@/components/MessageAction'
import { MessageBubble } from '@/components/MessageBubble'
import { ChatMessage } from '@/lib/types'
import { cn } from '@/lib/utils'

type Props = {
  message: ChatMessage
}

export function Message({ message }: Props) {
  const authorUser = message.author === 'USER'
  const action = !authorUser && message.type === 'ACTION' && !!message.action

  return (
    <MessageBubble user={authorUser}>
      <div
        className={cn(
          'text-sm sm:text-base prose prose-sm prose-invert break-words max-w-none',
          '[&_pre]:break-words [&_pre]:whitespace-pre-wrap [&_pre]:overflow-x-auto',
          '[&_code]:break-words [&_code]:whitespace-pre-wrap',
          '[&_a]:break-words [&_a]:overflow-hidden',
          '[&_img]:max-w-full [&_img]:h-auto',
          '[&_table]:overflow-x-auto [&_table]:block [&_table]:min-w-0 [&_table]:w-full',
          '[&_ul]:break-words [&_ol]:break-words',
          '[&_blockquote]:break-words',
          '[&_ul]:list-disc [&_ul]:pl-5',
        )}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{message.content}</ReactMarkdown>
      </div>

      {action && <MessageAction message={message} />}
    </MessageBubble>
  )
}
