// ============================================================================
// User and Message Types
// ============================================================================

export interface User {
  id: string;
  username: string;
  isTyping: boolean;
}

export interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
  status: 'sending' | 'sent' | 'failed';
}

// ============================================================================
// WebSocket Configuration and State
// ============================================================================

export interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export interface WebSocketState {
  isConnected: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
  error: Error | null;
}

export interface UseWebSocketReturn {
  state: WebSocketState;
  sendMessage: (message: ClientMessage) => void;
  disconnect: () => void;
}

// ============================================================================
// Chat State Management
// ============================================================================

export interface ChatState {
  messages: Message[];
  users: User[];
  currentUser: User | null;
}

export interface UseChatStateReturn {
  state: ChatState;
  addMessage: (message: Message) => void;
  updateMessageStatus: (messageId: string, status: Message['status']) => void;
  setUsers: (users: User[]) => void;
  setUserTyping: (userId: string, isTyping: boolean) => void;
}

// ============================================================================
// Server Types
// ============================================================================

export interface ServerConfig {
  port: number;
  maxConnections?: number;
}

export interface ClientConnection {
  id: string;
  ws: WebSocket;
  user: User;
  roomId: string;
}

// ============================================================================
// Message Protocol - Client to Server
// ============================================================================

export interface JoinRoomMessage {
  type: 'join';
  payload: {
    username: string;
    roomId: string;
  };
}

export interface SendMessageMessage {
  type: 'message';
  payload: {
    content: string;
    tempId: string; // Client-generated ID for optimistic updates
  };
}

export interface TypingIndicatorMessage {
  type: 'typing';
  payload: {
    isTyping: boolean;
  };
}

export interface LeaveRoomMessage {
  type: 'leave';
  payload: Record<string, never>;
}

export type ClientMessage =
  | JoinRoomMessage
  | SendMessageMessage
  | TypingIndicatorMessage
  | LeaveRoomMessage;

// ============================================================================
// Message Protocol - Server to Client
// ============================================================================

export interface WelcomeMessage {
  type: 'welcome';
  payload: {
    userId: string;
    users: User[];
  };
}

export interface NewMessage {
  type: 'message';
  payload: {
    id: string;
    userId: string;
    username: string;
    content: string;
    timestamp: number;
  };
}

export interface MessageAckMessage {
  type: 'message_ack';
  payload: {
    tempId: string;
    messageId: string;
  };
}

export interface UserJoinedMessage {
  type: 'user_joined';
  payload: {
    user: User;
    users: User[];
  };
}

export interface UserLeftMessage {
  type: 'user_left';
  payload: {
    userId: string;
    users: User[];
  };
}

export interface UserTypingMessage {
  type: 'user_typing';
  payload: {
    userId: string;
    username: string;
    isTyping: boolean;
  };
}

export interface ErrorMessage {
  type: 'error';
  payload: {
    code: string;
    message: string;
  };
}

export type ServerMessage =
  | WelcomeMessage
  | NewMessage
  | MessageAckMessage
  | UserJoinedMessage
  | UserLeftMessage
  | UserTypingMessage
  | ErrorMessage;

// ============================================================================
// Local Storage
// ============================================================================

export interface ChatLocalStorage {
  username: string;
  userId?: string;
  lastRoomId?: string;
}

// ============================================================================
// Component Props
// ============================================================================

export interface ChatContainerProps {
  roomId?: string;
  className?: string;
}

export interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onTyping: () => void;
  disabled: boolean;
}

export interface UserListProps {
  users: User[];
  currentUserId: string;
}

export interface ConnectionStatusProps {
  status: 'connected' | 'disconnected' | 'reconnecting';
  onlineCount: number;
}

export interface JoinChatFormProps {
  onJoin: (username: string) => void;
}
