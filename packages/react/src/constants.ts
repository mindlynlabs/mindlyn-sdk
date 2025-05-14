export const PROD = process.env.NODE_ENV === 'production'
export const API_URL = 'https://api.mindlyn.io'

const LOCAL_STORAGE_PREFIX = 'mindlyn'
export const MESSAGES_STORE_KEY = `${LOCAL_STORAGE_PREFIX}/messages`
export const THREAD_ID_STORE_KEY = `${LOCAL_STORAGE_PREFIX}/threadId`
