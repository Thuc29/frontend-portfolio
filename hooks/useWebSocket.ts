import { useEffect, useRef, useState, useCallback } from 'react';
import type {
  WebSocketConfig,
  WebSocketState,
  UseWebSocketReturn,
  ClientMessage,
  ServerMessage,
} from '@/lib/chat/types';

export function useWebSocket(
  config: WebSocketConfig,
  onMessage: (data: ServerMessage) => void
): UseWebSocketReturn {
  const [state, setState] = useState<WebSocketState>({
    isConnected: false,
    connectionStatus: 'disconnected',
    error: null,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const messageQueueRef = useRef<ClientMessage[]>([]);
  const isIntentionalCloseRef = useRef(false);
  const connectRef = useRef<(() => void) | null>(null);

  const {
    url,
    maxReconnectAttempts = 5,
  } = config;

  // Calculate exponential backoff delay
  const getReconnectDelay = useCallback(() => {
    const attempt = reconnectAttemptsRef.current;
    const delays = [3000, 6000, 12000, 24000, 30000]; // 3s, 6s, 12s, 24s, 30s
    return delays[Math.min(attempt, delays.length - 1)];
  }, []);

  // Connect to WebSocket server
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      // Handle connection open
      ws.onopen = () => {
        console.log('[WebSocket] Connected');
        setState({
          isConnected: true,
          connectionStatus: 'connected',
          error: null,
        });
        reconnectAttemptsRef.current = 0;

        // Send queued messages
        while (messageQueueRef.current.length > 0) {
          const queuedMessage = messageQueueRef.current.shift();
          if (queuedMessage && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(queuedMessage));
          }
        }
      };

      // Handle incoming messages
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as ServerMessage;
          onMessage(data);
        } catch (error) {
          console.error('[WebSocket] Failed to parse message:', error);
        }
      };

      // Handle connection close
      ws.onclose = (event) => {
        console.log('[WebSocket] Disconnected', event.code, event.reason);
        setState({
          isConnected: false,
          connectionStatus: 'disconnected',
          error: null,
        });
        wsRef.current = null;

        // Auto-reconnect if not intentional close
        if (!isIntentionalCloseRef.current) {
          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            const delay = getReconnectDelay();
            console.log(
              `[WebSocket] Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current + 1}/${maxReconnectAttempts})`
            );
            setState({
              isConnected: false,
              connectionStatus: 'reconnecting',
              error: null,
            });

            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttemptsRef.current += 1;
              connectRef.current?.();
            }, delay);
          } else {
            console.error('[WebSocket] Max reconnect attempts reached');
            setState({
              isConnected: false,
              connectionStatus: 'disconnected',
              error: new Error('Unable to connect to chat server'),
            });
          }
        }
      };

      // Handle connection errors
      ws.onerror = (event) => {
        console.error('[WebSocket] Error:', event);
        setState((prev) => ({
          ...prev,
          error: new Error('WebSocket connection error'),
        }));
      };
    } catch (error) {
      console.error('[WebSocket] Failed to create connection:', error);
      setState({
        isConnected: false,
        connectionStatus: 'disconnected',
        error: error instanceof Error ? error : new Error('Connection failed'),
      });
    }
  }, [url, maxReconnectAttempts, getReconnectDelay, onMessage]);

  // Send message through WebSocket
  const sendMessage = useCallback((message: ClientMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify(message));
      } catch (error) {
        console.error('[WebSocket] Failed to send message:', error);
        // Queue message for retry
        messageQueueRef.current.push(message);
      }
    } else {
      // Queue message if not connected
      console.log('[WebSocket] Queueing message (not connected)');
      messageQueueRef.current.push(message);
    }
  }, []);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    isIntentionalCloseRef.current = true;
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setState({
      isConnected: false,
      connectionStatus: 'disconnected',
      error: null,
    });
  }, []);

  // Store connect function in ref
  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  // Initialize connection on mount
  useEffect(() => {
    isIntentionalCloseRef.current = false;
    
    // Use setTimeout to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      connect();
    }, 0);

    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutId);
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    state,
    sendMessage,
    disconnect,
  };
}
