import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useChatContext } from '@/contexts/chat'
import { useConfigContext } from '@/contexts/config'
import { ChatAction, ChatMessage } from '@/lib/types'

type Props = {
  message: ChatMessage
}

export function MessageAction({ message }: Props) {
  const action = message?.action as ChatAction

  const { updateMessage } = useChatContext()
  const { onAction, renderMessageExtra } = useConfigContext()
  const [pending, setPending] = useState(false)

  const handleMessageCancelled = () => {
    updateMessage(message.id, { action: { ...action, status: 'CANCELLED' } })
  }

  const handleConfirmClick = async () => {
    setPending(true)
    try {
      const result = await onAction?.(action)

      const meta = result?.meta
      const status = result?.status || 'CONFIRMED'

      updateMessage(message.id, { meta, action: { ...action, status } })
    } catch {
      handleMessageCancelled()
    } finally {
      setPending(false)
    }
  }

  const messageExtra = useMemo(() => renderMessageExtra?.(message), [message, renderMessageExtra])

  return (
    <div className='flex flex-col gap-2'>
      <div>
        {action.status === 'PENDING' ? (
          <div className='flex gap-2'>
            <Button
              size='sm'
              variant='secondary'
              className='border-primary border w-18'
              onClick={handleMessageCancelled}
              pending={pending}
            >
              Cancel
            </Button>
            <Button size='sm' className='w-18' onClick={handleConfirmClick} pending={pending}>
              Confirm
            </Button>
          </div>
        ) : (
          <div className='flex gap-2 text-xs sm:text-sm items-center'>
            <Badge variant={action.status === 'CONFIRMED' ? 'success' : 'destructive'}>
              {action.status === 'CONFIRMED' ? 'Confirmed' : 'Cancelled'}
            </Badge>
          </div>
        )}
      </div>
      {messageExtra && <div className='flex flex-col'>{messageExtra}</div>}
    </div>
  )
}
