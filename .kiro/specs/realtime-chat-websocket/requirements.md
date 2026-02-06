# Requirements Document

## Introduction

Tính năng Real-time Chat với WebSocket cho phép người dùng giao tiếp trực tiếp với nhau trong thời gian thực. Hệ thống sử dụng WebSocket để thiết lập kết nối hai chiều giữa client và server, đảm bảo tin nhắn được gửi và nhận ngay lập tức mà không cần phải refresh trang.

## Glossary

- **Chat System**: Hệ thống chat tổng thể bao gồm cả client và server components
- **WebSocket Connection**: Kết nối hai chiều liên tục giữa client và server
- **Chat Client**: Ứng dụng React/Next.js chạy trên trình duyệt của người dùng
- **Chat Server**: Server xử lý WebSocket connections và routing tin nhắn
- **Message**: Đối tượng dữ liệu chứa nội dung tin nhắn, người gửi, và timestamp
- **User**: Người dùng tham gia vào chat session
- **Chat Room**: Không gian chat nơi nhiều người dùng có thể giao tiếp
- **Connection Status**: Trạng thái kết nối WebSocket (connected, disconnected, reconnecting)

## Requirements

### Requirement 1

**User Story:** Là một người dùng, tôi muốn kết nối đến chat server qua WebSocket, để có thể gửi và nhận tin nhắn trong thời gian thực

#### Acceptance Criteria

1. WHEN người dùng mở trang chat, THE Chat Client SHALL thiết lập WebSocket connection đến Chat Server
2. WHEN WebSocket connection được thiết lập thành công, THE Chat Client SHALL hiển thị trạng thái "Connected" cho người dùng
3. IF WebSocket connection bị ngắt, THEN THE Chat Client SHALL tự động thử kết nối lại sau 3 giây
4. WHILE WebSocket connection đang trong trạng thái reconnecting, THE Chat Client SHALL hiển thị trạng thái "Reconnecting..." cho người dùng
5. WHEN WebSocket connection thất bại sau 5 lần thử, THE Chat Client SHALL hiển thị thông báo lỗi "Unable to connect to chat server"

### Requirement 2

**User Story:** Là một người dùng, tôi muốn gửi tin nhắn văn bản, để có thể giao tiếp với người khác trong chat room

#### Acceptance Criteria

1. WHEN người dùng nhập tin nhắn và nhấn Enter hoặc nút Send, THE Chat Client SHALL gửi tin nhắn qua WebSocket connection
2. THE Chat Client SHALL hiển thị tin nhắn đã gửi trong chat interface ngay lập tức với trạng thái "sending"
3. WHEN Chat Server xác nhận đã nhận tin nhắn, THE Chat Client SHALL cập nhật trạng thái tin nhắn thành "sent"
4. THE Chat Client SHALL xóa nội dung input field sau khi gửi tin nhắn thành công
5. IF WebSocket connection không khả dụng, THEN THE Chat Client SHALL vô hiệu hóa nút Send và hiển thị thông báo "Cannot send message while disconnected"

### Requirement 3

**User Story:** Là một người dùng, tôi muốn nhận tin nhắn từ người khác trong thời gian thực, để có thể theo dõi cuộc trò chuyện

#### Acceptance Criteria

1. WHEN Chat Server gửi tin nhắn mới qua WebSocket, THE Chat Client SHALL hiển thị tin nhắn trong chat interface ngay lập tức
2. THE Chat Client SHALL hiển thị tên người gửi và timestamp cho mỗi tin nhắn
3. THE Chat Client SHALL tự động scroll xuống tin nhắn mới nhất khi nhận được tin nhắn mới
4. THE Chat Client SHALL phân biệt tin nhắn của người dùng hiện tại và tin nhắn từ người khác bằng cách hiển thị ở các vị trí khác nhau
5. WHEN người dùng đang scroll lên xem tin nhắn cũ, THE Chat Client SHALL không tự động scroll xuống khi có tin nhắn mới

### Requirement 4

**User Story:** Là một người dùng, tôi muốn thấy ai đang online trong chat room, để biết được ai có thể trả lời tin nhắn của tôi

#### Acceptance Criteria

1. WHEN người dùng kết nối vào chat room, THE Chat Client SHALL hiển thị danh sách người dùng đang online
2. WHEN người dùng mới tham gia chat room, THE Chat Client SHALL cập nhật danh sách online users và hiển thị thông báo "[Username] joined the chat"
3. WHEN người dùng rời khỏi chat room, THE Chat Client SHALL cập nhật danh sách online users và hiển thị thông báo "[Username] left the chat"
4. THE Chat Client SHALL hiển thị số lượng người dùng đang online trong chat room
5. THE Chat Client SHALL hiển thị indicator "typing..." khi người dùng khác đang gõ tin nhắn

### Requirement 5

**User Story:** Là một người dùng, tôi muốn nhập tên hiển thị trước khi vào chat, để người khác biết tôi là ai

#### Acceptance Criteria

1. WHEN người dùng truy cập trang chat lần đầu, THE Chat Client SHALL hiển thị form nhập tên hiển thị
2. THE Chat Client SHALL yêu cầu tên hiển thị có độ dài từ 2 đến 20 ký tự
3. WHEN người dùng nhập tên hợp lệ và nhấn Join, THE Chat Client SHALL lưu tên vào local storage và thiết lập WebSocket connection
4. THE Chat Client SHALL sử dụng tên đã lưu cho các lần truy cập tiếp theo
5. THE Chat Client SHALL cho phép người dùng thay đổi tên hiển thị thông qua settings menu

### Requirement 6

**User Story:** Là một developer, tôi muốn có WebSocket server để xử lý connections và routing tin nhắn, để hệ thống chat có thể hoạt động

#### Acceptance Criteria

1. THE Chat Server SHALL chấp nhận WebSocket connections từ Chat Client
2. WHEN Chat Server nhận tin nhắn từ một client, THE Chat Server SHALL broadcast tin nhắn đó đến tất cả clients đang kết nối trong cùng chat room
3. THE Chat Server SHALL theo dõi danh sách clients đang kết nối và thông tin người dùng của họ
4. WHEN client kết nối hoặc ngắt kết nối, THE Chat Server SHALL thông báo cho tất cả clients khác về sự thay đổi này
5. THE Chat Server SHALL xử lý tối thiểu 100 concurrent connections mà không bị giảm hiệu suất đáng kể
