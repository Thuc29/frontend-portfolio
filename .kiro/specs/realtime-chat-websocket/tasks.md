# Implementation Plan - Real-time Chat với WebSocket

- [x] 1. Cài đặt dependencies và setup project structure





  - Cài đặt ws, uuid và types tương ứng
  - Tạo folder structure cho chat components và utilities
  - Tạo file types.ts với tất cả TypeScript interfaces
  - Setup environment variables trong .env.local
  - _Requirements: 6.1_

- [x] 2. Implement WebSocket server





  - [x] 2.1 Tạo ChatServer class với connection management


    - Viết class ChatServer với Map để quản lý connections và rooms
    - Implement handleConnection method để accept WebSocket connections
    - Implement handleDisconnect method để cleanup khi client disconnect
    - _Requirements: 6.1, 6.3_
  

  - [x] 2.2 Implement message routing và broadcasting

    - Viết handleMessage method để xử lý messages từ clients
    - Implement broadcast method để gửi messages đến tất cả clients trong room
    - Xử lý các message types: join, message, typing, leave
    - _Requirements: 6.2, 6.4_
  

  - [x] 2.3 Tạo custom Next.js server với WebSocket support

    - Tạo file server.js để run Next.js với WebSocket server
    - Integrate ChatServer vào custom server
    - Setup port và configuration
    - _Requirements: 6.1_

- [x] 3. Implement useWebSocket custom hook



  - [x] 3.1 Tạo WebSocket connection logic


    - Viết useWebSocket hook với WebSocket connection setup
    - Implement connection state management (connected, disconnected, reconnecting)
    - Handle WebSocket events: onopen, onclose, onerror, onmessage
    - _Requirements: 1.1, 1.2_
  

  - [x] 3.2 Implement auto-reconnect logic




    - Viết reconnection logic với exponential backoff
    - Track số lần reconnect attempts
    - Implement max reconnect attempts limit (5 lần)
    - _Requirements: 1.3, 1.4, 1.5_

  
  - [ ] 3.3 Implement message sending và event handlers
    - Viết sendMessage function để gửi messages qua WebSocket
    - Implement message queue cho offline messages
    - Handle connection status changes
    - _Requirements: 2.1_

- [ ] 4. Implement useChatState custom hook
  - Tạo useChatState hook với useReducer để quản lý chat state
  - Implement actions: addMessage, updateMessageStatus, setUsers, setUserTyping
  - Viết reducer logic để handle state updates
  - Implement message history limit (200 messages)
  - _Requirements: 2.2, 3.1, 3.2, 4.1_

- [ ] 5. Implement JoinChatForm component
  - [ ] 5.1 Tạo form UI để nhập username
    - Viết JoinChatForm component với input field và button
    - Style component với Tailwind CSS
    - Add Framer Motion animations cho form
    - _Requirements: 5.1_
  
  - [ ] 5.2 Implement validation và local storage
    - Validate username (2-20 ký tự)
    - Lưu username vào localStorage khi join
    - Load username từ localStorage nếu đã có
    - _Requirements: 5.2, 5.3, 5.4_

- [ ] 6. Implement MessageList component
  - [ ] 6.1 Tạo message display UI
    - Viết MessageList component để hiển thị danh sách messages
    - Style messages với Tailwind (phân biệt own messages vs others)
    - Hiển thị username và timestamp cho mỗi message
    - _Requirements: 3.2, 3.4_
  
  - [ ] 6.2 Implement auto-scroll logic
    - Implement auto-scroll đến message mới nhất
    - Detect khi user đang scroll lên xem history
    - Disable auto-scroll khi user đang xem old messages
    - _Requirements: 3.3, 3.5_
  
  - [ ] 6.3 Add message animations
    - Add fade-in animation cho new messages với Framer Motion
    - Implement smooth scroll behavior
    - Add loading states cho messages đang gửi
    - _Requirements: 2.2, 2.3_

- [ ] 7. Implement MessageInput component
  - [ ] 7.1 Tạo input form UI
    - Viết MessageInput component với textarea và send button
    - Style component với Tailwind CSS
    - Handle Enter key để send message
    - _Requirements: 2.1_
  
  - [ ] 7.2 Implement message sending logic
    - Implement onSendMessage handler
    - Clear input sau khi send thành công
    - Disable input khi disconnected
    - _Requirements: 2.1, 2.4, 2.5_
  
  - [ ] 7.3 Implement typing indicator
    - Detect khi user đang typing
    - Debounce typing events (300ms)
    - Send typing indicator qua WebSocket
    - _Requirements: 4.5_

- [ ] 8. Implement UserList component
  - Viết UserList component để hiển thị online users
  - Style component với Tailwind CSS
  - Hiển thị số lượng users online
  - Hiển thị typing indicator cho users đang typing
  - Highlight current user trong list
  - _Requirements: 4.1, 4.4, 4.5_

- [ ] 9. Implement ConnectionStatus component
  - Viết ConnectionStatus component để hiển thị connection status
  - Style với colors khác nhau cho mỗi status (green/yellow/red)
  - Hiển thị số users online
  - Add pulse animation cho reconnecting state
  - _Requirements: 1.2, 1.4, 1.5_

- [ ] 10. Implement ChatContainer component
  - [ ] 10.1 Tạo main container và layout
    - Viết ChatContainer component integrate tất cả sub-components
    - Implement responsive layout (desktop/tablet/mobile)
    - Setup grid/flex layout cho messages và user list
    - _Requirements: 1.1_
  
  - [ ] 10.2 Wire up WebSocket connection và state management
    - Integrate useWebSocket hook
    - Integrate useChatState hook
    - Handle message protocol (parse incoming, format outgoing)
    - Connect all event handlers
    - _Requirements: 1.1, 2.1, 3.1_
  
  - [ ] 10.3 Implement user join/leave notifications
    - Handle user_joined events từ server
    - Handle user_left events từ server
    - Hiển thị system messages cho join/leave events
    - Update user list khi có changes
    - _Requirements: 4.2, 4.3_

- [ ] 11. Tạo chat page và integrate vào app
  - Tạo app/chat/page.tsx
  - Import và render ChatContainer
  - Add page metadata và title
  - Setup conditional rendering (JoinChatForm vs ChatContainer)
  - _Requirements: 1.1, 5.1_

- [ ] 12. Implement error handling và recovery
  - [ ] 12.1 Client-side error handling
    - Implement error toast notifications
    - Handle message send failures với retry button
    - Implement failed message queue
    - _Requirements: 1.5, 2.5_
  
  - [ ] 12.2 Server-side error handling
    - Validate incoming messages
    - Handle connection limits
    - Implement graceful error responses
    - Add error logging
    - _Requirements: 6.5_

- [ ] 13. Implement security và validation
  - Sanitize message content để prevent XSS
  - Validate username format
  - Implement message length limit (1000 characters)
  - Add rate limiting cho messages (10/second)
  - Debounce typing indicators
  - _Requirements: 2.1, 5.2_

- [ ] 14. Performance optimizations
  - Implement message history limit (200 messages)
  - Add cleanup cho event listeners trong useEffect
  - Implement heartbeat/ping-pong cho server
  - Optimize re-renders với React.memo nếu cần
  - _Requirements: 6.5_

- [ ]* 15. Testing và documentation
  - [ ]* 15.1 Write unit tests
    - Test useWebSocket hook với mock WebSocket
    - Test useChatState reducer logic
    - Test utility functions (validation, sanitization)
    - _Requirements: All_
  
  - [ ]* 15.2 Manual testing
    - Test với multiple browser tabs (simulate multiple users)
    - Test reconnection scenarios
    - Test trên mobile devices
    - Verify không có memory leaks
    - _Requirements: All_
