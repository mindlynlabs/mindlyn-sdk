import { ChatBody } from '@/components/ChatBody'
import { ChatHeader } from '@/components/ChatHeader'
import { ChatInput } from '@/components/ChatInput'
import { ErrorBoundaryProvider } from '@/components/ErrorBoundaryProvider'
import { ChatProvider } from '@/contexts/chat'
import { ConfigProvider } from '@/contexts/config'
import { Dictionary, MindlyConfig } from '@/lib/types'

export type MindlynChatProps<PayloadData extends Dictionary = Dictionary, MetaData extends Dictionary = Dictionary> = {
  config: MindlyConfig<PayloadData, MetaData>
}

export function MindlynChat<PayloadData extends Dictionary = Dictionary, MetaData extends Dictionary = Dictionary>({
  config,
}: MindlynChatProps<PayloadData, MetaData>) {
  return (
    <div id='mindlyn'>
      <ErrorBoundaryProvider>
        <ConfigProvider config={config}>
          <ChatProvider>
            <div className='flex flex-col flex-1 w-full h-full'>
              <ChatHeader />
              <ChatBody />
              <ChatInput />
            </div>
          </ChatProvider>
        </ConfigProvider>
      </ErrorBoundaryProvider>
    </div>
  )
}
