import { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

type Props = PropsWithChildren & {
  user?: boolean
  containerClassName?: string
  containerProps?: HTMLAttributes<HTMLDivElement>
  bubbleProps?: HTMLAttributes<HTMLDivElement>
}

export function MessageBubble({ user, children, containerProps, bubbleProps }: Props) {
  return (
    <div {...containerProps} className={cn('flex py-2 md:py-5', user && 'justify-end', containerProps?.className)}>
      <div
        {...bubbleProps}
        className={cn(
          'rounded-3xl px-4 py-2 max-w-[85%] flex flex-col gap-3',
          user ? 'bg-primary text-primary-foreground' : 'bg-muted text-primary',
          bubbleProps?.className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
