import { MESSAGES_STORE_KEY, THREAD_ID_STORE_KEY, PROD } from '@/constants'
import { ChatMessage } from '@/lib/types'

export const messagesStore = createLocalStorageState<ChatMessage[]>(MESSAGES_STORE_KEY, [])
export const threadIdStore = createLocalStorageState<string | null>(THREAD_ID_STORE_KEY, null)

export const appIdStore = createMemoryState<string | null>(null)

export type Store<T> = {
  get(): T
  set(value: T): void
  clear(): void
}

function createLocalStorageState<T>(key: string, defaultValue: T): Store<T> {
  return {
    get() {
      try {
        const stored = localStorage.getItem(key)

        return stored !== null ? (JSON.parse(stored) as T) : defaultValue
      } catch {
        return defaultValue
      }
    },
    set(value) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        if (!PROD) {
          console.error(`[Mindlyn] Error saving "${key}" to localStorage:`, error)
        }
      }
    },
    clear() {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        if (!PROD) {
          console.error(`[Mindlyn] Error clearing "${key}" from localStorage:`, error)
        }
      }
    },
  }
}

function createMemoryState<T>(initialValue: T): Store<T> {
  let value = initialValue
  return {
    get() {
      return value
    },
    set(newValue) {
      value = newValue
    },
    clear() {
      value = initialValue
    },
  }
}
