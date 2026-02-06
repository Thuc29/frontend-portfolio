# Design Document - Real-time Chat với WebSocket

## Overview

Hệ thống real-time chat sẽ được xây dựng với kiến trúc client-server sử dụng WebSocket protocol. Client side sẽ là React component tích hợp vào Next.js app hiện tại, trong khi server side sẽ sử dụng Next.js API Routes với WebSocket support hoặc standalone Node.js server với ws library.

**Công nghệ chính:**
- Client: React 19, Next.js 16, TypeScript
- WebSocket Library: ws (Node.js) hoặc native WebSocket API (browser)
- State Management: React hooks (useState, useEffect, useReducer)
- Styling: Tailwind CSS (đã có sẵn)
- Animations: Framer Motion (đã có sẵn)

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser Client                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Chat UI Component                                      │ │
│  │  - Message List                                         │ │
│  │  - Input Form                                           │ │
│  │  - User List                                            │ │
│  │  - Connection Status                                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│  ┌────────────────────────▼──────────────────────────────┐ │
│  │  WebSocket Client Hook (useWebSocket)                  │ │
│  │  - Connection management                               │ │
│  │  - Message sending/receiving                           │ │
│  │  - Auto-reconnect logic                                │ │
│  │  - Event handlers                                      │ │
│  └────────────────────────┬──────────────────────────────┘ │
└─────────────────────────────┼────────────────────────────────┘
                              │ WebSocket Protocol
                              │ (ws:// or wss://)
┌─────────────────────────────▼────────────────────────────────┐
│                      WebSocket Server                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Connection Manager                                     │ │
│  │  - Client connections map                              │ │
│  │  - User session management                             │ │
│  │  - Room management                                     │ │
│  └────────────────────────┬──────────────────────────────┘ │
│                           │                                  │
│  ┌────────────────────────▼──────────────────────────────┐ │
│  │  Message Router                                        │ │
│  │  - Broadcast messages                                  │ │
│  │  - Handle user events                                  │ │
│  │  - Typing indicators                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Deployment Options

**Option 1: Next.js API Route với Custom Server (Recommended)**
- Tạo custom server.js sử dụng ws library
- Chạy cùng Next.js app
- Dễ deploy trên VPS hoặc dedicated server

**Option 2: Separate WebSocket Server**
- WebSocket server độc lập chạy trên port khác
- Next.js app chạy bình thường
- Linh hoạt hơn cho scaling

## Components and Interfaces

### Client Components

#### 1. ChatContainer Component
```typescript
interface ChatContainerProps {
  roomId?: string;
  className?: string;
}

// Main container component quản lý toàn bộ chat UI
```

#### 2. MessageList Component
```typescript
interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
  status: 'sending' | 'sent' | 'failed';
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

// Hiển thị danh sách tin nhắn với auto-scroll
```

#### 3. MessageInput Component
```typescript
interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onTyping: () => void;
  disabled: boolean;
}

// Input form để gửi tin nhắn
```

#### 4. UserList Component
```typescript
interface User {
  id: string;
  username: string;
  isTyping: boolean;
}

interface UserListProps {
  users: User[];
  currentUserId: string;
}

// Hiển thị danh sách người dùng online
```

#### 5. ConnectionStatus Component
```typescript
interface ConnectionStatusProps {
  status: 'connected' | 'disconnected' | 'reconnecting';
  onlineCount: number;
}

// Hiển thị trạng thái kết nối
```

#### 6. JoinChatForm Component
```typescript
interface JoinChatFormProps {
  onJoin: (username: string) => void;
}

// Form nhập tên trước khi join chat
```

### Custom Hooks

#### useWebSocket Hook
```typescript
interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

interface WebSocketState {
  isConnected: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
  error: Error | null;
}

interface UseWebSocketReturn {
  state: WebSocketState;
  sendMessage: (message: any) => void;
  disconnect: () => void;
}

function useWebSocket(
  config: WebSocketConfig,
  onMessage: (data: any) => void
): UseWebSocketReturn;

// Hook quản lý WebSocket connection với auto-reconnect
```

#### useChatState Hook
```typescript
interface ChatState {
  messages: Message[];
  users: User[];
  currentUser: User | null;
}

interface UseChatStateReturn {
  state: ChatState;
  addMessage: (message: Message) => void;
  updateMessageStatus: (messageId: string, status: Message['status']) => void;
  setUsers: (users: User[]) => void;
  setUserTyping: (userId: string, isTyping: boolean) => void;
}

function useChatState(): UseChatStateReturn;

// Hook quản lý chat state với reducer pattern
```

### Server Components

#### WebSocket Server
```typescript
interface ServerConfig {
  port: number;
  maxConnections?: number;
}

interface ClientConnection {
  id: string;
  ws: WebSocket;
  user: User;
  roomId: string;
}

class ChatServer {
  private connections: Map<string, ClientConnection>;
  private rooms: Map<string, Set<string>>;
  
  constructor(config: ServerConfig);
  start(): void;
  handleConnection(ws: WebSocket): void;
  handleMessage(clientId: string, message: any): void;
  broadcast(roomId: string, message: any, excludeClientId?: string): void;
  handleDisconnect(clientId: string): void;
}
```

## Data Models

### Message Protocol

#### Client → Server Messages

**1. Join Room**
```typescript
{
  type: 'join',
  payload: {
    username: string;
    roomId: string;
  }
}
```

**2. Send Message**
```typescript
{
  type: 'message',
  payload: {
    content: string;
    tempId: string; // Client-generated ID for optimistic updates
  }
}
```

**3. Typing Indicator**
```typescript
{
  type: 'typing',
  payload: {
    isTyping: boolean;
  }
}
```

**4. Leave Room**
```typescript
{
  type: 'leave',
  payload: {}
}
```

#### Server → Client Messages

**1. Welcome (Connection Established)**
```typescript
{
  type: 'welcome',
  payload: {
    userId: string;
    users: User[];
  }
}
```

**2. New Message**
```typescript
{
  type: 'message',
  payload: {
    id: string;
    userId: string;
    username: string;
    content: string;
    timestamp: number;
  }
}
```

**3. Message Acknowledgment**
```typescript
{
  type: 'message_ack',
  payload: {
    tempId: string;
    messageId: string;
  }
}
```

**4. User Joined**
```typescript
{
  type: 'user_joined',
  payload: {
    user: User;
    users: User[];
  }
}
```

**5. User Left**
```typescript
{
  type: 'user_left',
  payload: {
    userId: string;
    users: User[];
  }
}
```

**6. User Typing**
```typescript
{
  type: 'user_typing',
  payload: {
    userId: string;
    username: string;
    isTyping: boolean;
  }
}
```

**7. Error**
```typescript
{
  type: 'error',
  payload: {
    code: string;
    message: string;
  }
}
```

### Local Storage Schema

```typescript
interface ChatLocalStorage {
  username: string;
  userId?: string;
  lastRoomId?: string;
}

// Key: 'chat_user_data'
```

## Error Handling

### Client-Side Error Handling

1. **Connection Errors**
   - Hiển thị toast notification khi không thể kết nối
   - Auto-retry với exponential backoff (3s, 6s, 12s, 24s, 30s)
   - Sau 5 lần thử, hiển thị error message và nút "Retry"

2. **Message Send Failures**
   - Hiển thị tin nhắn với status "failed"
   - Cung cấp nút "Retry" cho từng tin nhắn failed
   - Lưu failed messages vào queue để retry sau khi reconnect

3. **Invalid Data**
   - Validate input trước khi gửi
   - Hiển thị error message cho invalid input
   - Prevent XSS bằng cách sanitize message content

### Server-Side Error Handling

1. **Connection Limits**
   - Reject connections khi đạt max limit
   - Gửi error message về client
   - Log rejected connections

2. **Invalid Messages**
   - Validate message format
   - Gửi error response về client
   - Log invalid messages để debug

3. **Disconnection Handling**
   - Clean up client data khi disconnect
   - Notify other users
   - Handle graceful shutdown

## Testing Strategy

### Unit Tests

1. **Custom Hooks**
   - Test useWebSocket với mock WebSocket
   - Test useChatState reducer logic
   - Test reconnection logic

2. **Utility Functions**
   - Message validation
   - Data sanitization
   - Timestamp formatting

### Integration Tests

1. **Client-Server Communication**
   - Test message flow từ client → server → clients
   - Test user join/leave events
   - Test typing indicators

2. **Reconnection Scenarios**
   - Test auto-reconnect sau disconnect
   - Test message queue khi offline
   - Test state sync sau reconnect

### E2E Tests (Optional)

1. **User Flows**
   - Join chat → send message → receive message
   - Multiple users chatting simultaneously
   - User disconnect và reconnect

### Manual Testing Checklist

- [ ] Kết nối WebSocket thành công
- [ ] Gửi và nhận tin nhắn real-time
- [ ] Auto-reconnect khi mất kết nối
- [ ] Typing indicators hoạt động
- [ ] User list cập nhật đúng
- [ ] UI responsive trên mobile
- [ ] Không có memory leaks khi long-running
- [ ] Handle 10+ concurrent users

## Performance Considerations

1. **Message Batching**
   - Batch multiple messages nếu gửi quá nhanh
   - Debounce typing indicators (300ms)

2. **Virtual Scrolling**
   - Implement virtual scrolling cho message list nếu có > 100 messages
   - Lazy load old messages

3. **Connection Pooling**
   - Server reuse connections
   - Implement heartbeat/ping-pong để detect dead connections

4. **Memory Management**
   - Limit message history (giữ 200 messages gần nhất)
   - Clean up event listeners khi unmount
   - Clear intervals/timeouts

## Security Considerations

1. **Input Sanitization**
   - Sanitize message content để prevent XSS
   - Validate username format
   - Limit message length (max 1000 characters)

2. **Rate Limiting**
   - Limit số messages per user (10 messages/second)
   - Limit typing indicator updates (1 update/300ms)

3. **Authentication (Future Enhancement)**
   - Hiện tại: Simple username-based
   - Tương lai: JWT token authentication
   - Session management

## UI/UX Design

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Chat Room                                    [●] 5     │ ← Header
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐ ┌──────────────────────┐   │
│ │                         │ │  Online Users (5)    │   │
│ │  Message List           │ │  ─────────────────── │   │
│ │                         │ │  • John (typing...)  │   │
│ │  [John]: Hello!         │ │  • Sarah             │   │
│ │  10:30 AM               │ │  • Mike              │   │
│ │                         │ │  • You               │   │
│ │       [You]: Hi! 👋     │ │  • Anna              │   │
│ │       10:31 AM          │ │                      │   │
│ │                         │ │                      │   │
│ │  [Sarah]: How are you?  │ │                      │   │
│ │  10:32 AM               │ │                      │   │
│ │                         │ │                      │   │
│ │  ▼ Auto-scroll          │ │                      │   │
│ └─────────────────────────┘ └──────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  John is typing...                                      │ ← Typing indicator
├─────────────────────────────────────────────────────────┤
│  [Type a message...]                          [Send]    │ ← Input
└─────────────────────────────────────────────────────────┘
```

### Responsive Design

- **Desktop (> 1024px)**: Side-by-side layout (messages + user list)
- **Tablet (768px - 1024px)**: Collapsible user list
- **Mobile (< 768px)**: Full-width messages, user list in modal

### Animations

- Message fade-in khi nhận tin nhắn mới
- Smooth scroll khi có tin nhắn mới
- Typing indicator pulse animation
- Connection status color transitions

## Implementation Phases

### Phase 1: Core Infrastructure
- WebSocket server setup
- Basic client connection
- Message protocol implementation

### Phase 2: UI Components
- Chat container và layout
- Message list với styling
- Input form

### Phase 3: Real-time Features
- Send/receive messages
- User list
- Typing indicators

### Phase 4: Polish & Optimization
- Auto-reconnect
- Error handling
- Performance optimization
- Animations

## Dependencies

### New Dependencies to Install

```json
{
  "dependencies": {
    "ws": "^8.18.0",
    "uuid": "^11.0.5"
  },
  "devDependencies": {
    "@types/ws": "^8.5.13",
    "@types/uuid": "^10.0.0"
  }
}
```

## File Structure

```
project/
├── app/
│   └── chat/
│       └── page.tsx                 # Chat page
├── components/
│   └── chat/
│       ├── ChatContainer.tsx        # Main container
│       ├── MessageList.tsx          # Message display
│       ├── MessageInput.tsx         # Input form
│       ├── UserList.tsx             # Online users
│       ├── ConnectionStatus.tsx     # Status indicator
│       └── JoinChatForm.tsx         # Join form
├── hooks/
│   ├── useWebSocket.ts              # WebSocket hook
│   └── useChatState.ts              # Chat state hook
├── lib/
│   ├── chat/
│   │   ├── types.ts                 # TypeScript types
│   │   ├── protocol.ts              # Message protocol
│   │   └── utils.ts                 # Utility functions
│   └── websocket-server.ts          # Server implementation
├── server.js                        # Custom Next.js server
└── .env.local                       # Environment variables
```

## Environment Variables

```env
# WebSocket Server
WS_PORT=3001
WS_MAX_CONNECTIONS=100

# Client
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```
