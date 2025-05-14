import { PropsWithChildren } from 'react'

import { appIdStore } from '@/lib/stores'
import { Dictionary, MindlyConfig } from '@/lib/types'

import { ConfigContext } from './ConfigContext'

type Props<
  PayloadData extends Dictionary = Dictionary,
  MetaData extends Dictionary = Dictionary,
> = PropsWithChildren & {
  config: MindlyConfig<PayloadData, MetaData>
}

export function ConfigProvider<PayloadData extends Dictionary = Dictionary, MetaData extends Dictionary = Dictionary>({
  children,
  config,
}: Props<PayloadData, MetaData>) {
  appIdStore.set(config.appId)
  return <ConfigContext.Provider value={config as MindlyConfig}>{children}</ConfigContext.Provider>
}
