import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import {
  ServerConfig,
  ClientMessage,
  ServerMessage,
  User,
  JoinRoomMessage,
  SendMessageMessage,
  TypingIndicatorMessage,
} from './types';

interface ClientConnection {
  id: string;
  ws: WebSocket;
  user: User | null;
  roomId: string | null;
}

export class ChatServer {
  private wss: WebSocketServer | null = null;
  private connections: Map<string, ClientConnection> = new Map();
  private rooms: Map<string, Set<string>> = new Map();
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = {
      maxConnections: 100,
      ...config,
    };
  }

  start(): void {
    this.wss = new WebSocketServer({ port: this.config.port });

    this.wss.on('connection', (ws: WebSocket) => {
      this.handleConnection(ws);
    });

    console.log(`WebSocket server started on port ${this.config.port}`);
  }

  handleConnection(ws: WebSocket): void {
    // Check connection limit
    if (this.connections.size >= (this.config.maxConnections || 100)) {
      const errorMsg: ServerMessage = {
        type: 'error',
        payload: {
          code: 'MAX_CONNECTIONS',
          message: 'Server has reached maximum connections',
        },
      };
      ws.send(JSON.stringify(errorMsg));
      ws.close();
      return;
    }

    // Create new connection
    const clientId = uuidv4();
    const connection: ClientConnection = {
      id: clientId,
      ws,
      user: null,
      roomId: null,
    };

    this.connections.set(clientId, connection);
    console.log(`Client connected: ${clientId}`);

    // Setup message handler
    ws.on('message', (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString()) as ClientMessage;
        this.handleMessage(clientId, message);
      } catch (error) {
        console.error('Invalid message format:', error);
        const errorMsg: ServerMessage = {
          type: 'error',
          payload: {
            code: 'INVALID_MESSAGE',
            message: 'Invalid message format',
          },
        };
        ws.send(JSON.stringify(errorMsg));
      }
    });

    // Setup close handler
    ws.on('close', () => {
      this.handleDisconnect(clientId);
    });

    // Setup error handler
    ws.on('error', (error) => {
      console.error(`WebSocket error for client ${clientId}:`, error);
      this.handleDisconnect(clientId);
    });
  }

  handleDisconnect(clientId: string): void {
    const connection = this.connections.get(clientId);
    if (!connection) {
      return;
    }

    console.log(`Client disconnected: ${clientId}`);

    // Remove from room if joined
    if (connection.roomId && connection.user) {
      const room = this.rooms.get(connection.roomId);
      if (room) {
        room.delete(clientId);

        // Notify other users in the room
        const remainingUsers = this.getUsersInRoom(connection.roomId);
        const userLeftMsg: ServerMessage = {
          type: 'user_left',
          payload: {
            userId: connection.user.id,
            users: remainingUsers,
          },
        };
        this.broadcast(connection.roomId, userLeftMsg, clientId);

        // Clean up empty room
        if (room.size === 0) {
          this.rooms.delete(connection.roomId);
        }
      }
    }

    // Remove connection
    this.connections.delete(clientId);
  }

  handleMessage(clientId: string, message: ClientMessage): void {
    const connection = this.connections.get(clientId);
    if (!connection) {
      return;
    }

    switch (message.type) {
      case 'join':
        this.handleJoinRoom(clientId, message);
        break;
      case 'message':
        this.handleChatMessage(clientId, message);
        break;
      case 'typing':
        this.handleTypingIndicator(clientId, message);
        break;
      case 'leave':
        this.handleLeaveRoom(clientId);
        break;
      default:
        console.error('Unknown message type:', message);
    }
  }

  broadcast(roomId: string, message: ServerMessage, excludeClientId?: string): void {
    const room = this.rooms.get(roomId);
    if (!room) {
      return;
    }

    const messageStr = JSON.stringify(message);
    room.forEach((clientId) => {
      if (clientId !== excludeClientId) {
        const connection = this.connections.get(clientId);
        if (connection && connection.ws.readyState === WebSocket.OPEN) {
          connection.ws.send(messageStr);
        }
      }
    });
  }

  private getUsersInRoom(roomId: string): User[] {
    const room = this.rooms.get(roomId);
    if (!room) {
      return [];
    }

    const users: User[] = [];
    room.forEach((clientId) => {
      const connection = this.connections.get(clientId);
      if (connection?.user) {
        users.push(connection.user);
      }
    });

    return users;
  }

  private handleJoinRoom(clientId: string, message: JoinRoomMessage): void {
    const connection = this.connections.get(clientId);
    if (!connection) {
      return;
    }

    const { username, roomId } = message.payload;

    // Validate username
    if (!username || username.length < 2 || username.length > 20) {
      const errorMsg: ServerMessage = {
        type: 'error',
        payload: {
          code: 'INVALID_USERNAME',
          message: 'Username must be between 2 and 20 characters',
        },
      };
      connection.ws.send(JSON.stringify(errorMsg));
      return;
    }

    // Create user
    const userId = uuidv4();
    const user: User = {
      id: userId,
      username,
      isTyping: false,
    };

    // Update connection
    connection.user = user;
    connection.roomId = roomId;

    // Add to room
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    this.rooms.get(roomId)!.add(clientId);

    // Get all users in room
    const users = this.getUsersInRoom(roomId);

    // Send welcome message to the joining user
    const welcomeMsg: ServerMessage = {
      type: 'welcome',
      payload: {
        userId,
        users,
      },
    };
    connection.ws.send(JSON.stringify(welcomeMsg));

    // Notify other users in the room
    const userJoinedMsg: ServerMessage = {
      type: 'user_joined',
      payload: {
        user,
        users,
      },
    };
    this.broadcast(roomId, userJoinedMsg, clientId);

    console.log(`User ${username} (${userId}) joined room ${roomId}`);
  }

  private handleChatMessage(clientId: string, message: SendMessageMessage): void {
    const connection = this.connections.get(clientId);
    if (!connection || !connection.user || !connection.roomId) {
      return;
    }

    const { content, tempId } = message.payload;

    // Validate message content
    if (!content || content.length === 0 || content.length > 1000) {
      const errorMsg: ServerMessage = {
        type: 'error',
        payload: {
          code: 'INVALID_MESSAGE',
          message: 'Message must be between 1 and 1000 characters',
        },
      };
      connection.ws.send(JSON.stringify(errorMsg));
      return;
    }

    // Create message
    const messageId = uuidv4();
    const timestamp = Date.now();

    // Send acknowledgment to sender
    const ackMsg: ServerMessage = {
      type: 'message_ack',
      payload: {
        tempId,
        messageId,
      },
    };
    connection.ws.send(JSON.stringify(ackMsg));

    // Broadcast message to all users in room
    const newMsg: ServerMessage = {
      type: 'message',
      payload: {
        id: messageId,
        userId: connection.user.id,
        username: connection.user.username,
        content,
        timestamp,
      },
    };
    this.broadcast(connection.roomId, newMsg);

    console.log(`Message from ${connection.user.username}: ${content}`);
  }

  private handleTypingIndicator(clientId: string, message: TypingIndicatorMessage): void {
    const connection = this.connections.get(clientId);
    if (!connection || !connection.user || !connection.roomId) {
      return;
    }

    const { isTyping } = message.payload;

    // Update user typing status
    connection.user.isTyping = isTyping;

    // Broadcast typing indicator to other users
    const typingMsg: ServerMessage = {
      type: 'user_typing',
      payload: {
        userId: connection.user.id,
        username: connection.user.username,
        isTyping,
      },
    };
    this.broadcast(connection.roomId, typingMsg, clientId);
  }

  private handleLeaveRoom(clientId: string): void {
    this.handleDisconnect(clientId);
  }

  stop(): void {
    if (this.wss) {
      this.wss.close();
      console.log('WebSocket server stopped');
    }
  }
}
