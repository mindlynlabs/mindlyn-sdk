import { ReactNode } from 'react'

/** A value that may be null or undefined. */
export type Nullable<T> = null | undefined | T
/** A generic key–value map. */
export type Dictionary<T = unknown> = Record<string, T>

export type ActionStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'
export type MessageAuthor = 'USER' | 'BOT'
export type MessageType = 'TEXT' | 'ACTION'

/**
 * Payload for an action, containing a type and associated data.
 * @template Data — the shape of the payload data.
 */
export type ActionPayload<Data extends Dictionary = Dictionary> = {
  type: string
  data: Data
}

/**
 * Represents an action attached to a chat message.
 * @template Data — the type of data in the payload.
 */
export type ChatAction<Data extends Dictionary = Dictionary> = {
  status: ActionStatus
  payload: ActionPayload<Data>
}

/**
 * Data model for a single chat message.
 * @template PayloadData — type of action.payload.data
 * @template MetaData — type of optional meta attached to the message
 */
export type ChatMessage<PayloadData extends Dictionary = Dictionary, MetaData extends Dictionary = Dictionary> = {
  id: string
  content: string
  author: MessageAuthor
  type: MessageType
  action?: Nullable<ChatAction<PayloadData>>
  meta?: Nullable<MetaData>
  createdAt: string
}

export type OnActionResult<MetaData extends Dictionary = Dictionary> = {
  /** Optional metadata to attach to the message. */
  meta?: MetaData
  /** Optional status override for the action (e.g., CONFIRMED, CANCELLED). */
  status?: ActionStatus
}

/**
 * Configuration options for the Mindly chat SDK.
 * @template PayloadData — the type of data for action payloads.
 */
export type MindlyConfig<PayloadData extends Dictionary = Dictionary, MetaData extends Dictionary = Dictionary> = {
  /** Your application’s unique identifier. */
  appId: string
  /** Configuration options for the chat header. */
  header?: {
    /** Content to render on the left side of the header (e.g. your brand logo). */
    logo?: ReactNode
    /** Arbitrary React node rendered on the right side (buttons, login, menus, etc.). */
    right?: ReactNode
  }
  /** A welcome message rendered at the start of the chat. */
  welcomeMessage?: ReactNode
  /**
   * Called when an ACTION-type message is sent.
   * May return metadata that will be set on the ChatMessage.meta field.
   */
  onAction?: (
    action: ChatAction<PayloadData>,
  ) => OnActionResult<MetaData> | Promise<OnActionResult<MetaData> | undefined> | undefined
  /**
   * Render additional custom content for a given chat message.
   */
  renderMessageExtra?: (message: ChatMessage<PayloadData, MetaData>) => ReactNode
}
