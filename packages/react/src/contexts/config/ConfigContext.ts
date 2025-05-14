import { createContext, useContext } from 'react'

import { MindlyConfig } from '@/lib/types'

export const ConfigContext = createContext<MindlyConfig>({
  appId: '',
})

export const useConfigContext = () => useContext(ConfigContext)
