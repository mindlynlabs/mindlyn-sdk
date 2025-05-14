import { useState, useRef, KeyboardEvent, useEffect, MouseEvent, useMemo } from 'react'

import { ArrowUpIcon } from '@/assets/icons/ArrowUpIcon'
import { Button } from '@/components/ui/Button'
import { useChatContext } from '@/contexts/chat'
import { useSendChatMessage } from '@/hooks/useSendChatMessage'
import { isMobile } from '@/lib/isMobile'
import { cn } from '@/lib/utils'

export function ChatInput() {
  const [inputHtml, setInputHtml] = useState<string>('')
  const inputRef = useRef<HTMLDivElement>(null)
  const { pending } = useChatContext()
  const handleSendChatMessage = useSendChatMessage()

  const emptyInputHtml = useMemo(() => getEmptyInputHtml(inputHtml), [inputHtml])
  const inputText = useMemo(() => parseInputHtmlToText(inputHtml), [inputHtml])

  const handleInput = () => {
    if (!inputRef.current) return

    setInputHtml(inputRef.current.innerHTML)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isMobile()) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = () => {
    if (!inputText) return

    handleSendChatMessage(inputText)

    setInputHtml('')

    if (!inputRef.current) return
    inputRef.current.innerHTML = ''

    if (isMobile()) return
    inputRef.current.focus()
  }

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!inputRef.current) return

    if (!(e.target as HTMLElement).closest('button')) {
      inputRef.current.focus()
    }
  }

  const initialFocusDone = useRef(false)
  useEffect(() => {
    if (!inputRef.current) return

    if (isMobile()) {
      if (initialFocusDone.current) return
      inputRef.current.focus()
      initialFocusDone.current = true
    } else {
      inputRef.current.focus()
    }
  }, [pending])

  return (
    <div className='sticky bottom-0 md:pb-4 p-safe-bottom'>
      <div
        className='relative z-10 mx-auto w-full max-w-2xl border bg-accent rounded-t-[28px] md:rounded-[28px] p-2 sm:p-3 flex items-center gap-2 cursor-text'
        onClick={handleContainerClick}
      >
        <div className='flex flex-col flex-1 relative'>
          {emptyInputHtml && (
            <div className='absolute left-3 top-2 text-muted-foreground pointer-events-none text-sm sm:text-base select-none'>
              Type your message
            </div>
          )}

          <div
            ref={inputRef}
            className={cn(
              'flex-1 outline-none max-h-[150px] overflow-auto text-sm sm:text-base break-all px-3 my-2 min-h-[24px]',
              pending && 'pointer-events-none opacity-50',
            )}
            contentEditable={!pending && 'plaintext-only'}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            translate='no'
            suppressContentEditableWarning
          />

          <div className='flex justify-end'>
            <Button
              onClick={handleSend}
              disabled={pending || !inputText}
              variant='default'
              size='icon'
              className='rounded-full'
            >
              <ArrowUpIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function parseInputHtmlToText(html: string): string {
  return html
    .replace(/<div><br><\/div>/g, '\n')
    .replace(/<div>/g, '\n')
    .replace(/<\/div>/g, '')
    .replace(/<br>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim()
}

function getEmptyInputHtml(html: string): boolean {
  return html === '' || html === '<br>' || html === '<div><br></div>'
}
