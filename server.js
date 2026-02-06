const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);
const wsPort = parseInt(process.env.WS_PORT || '3001', 10);

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Dynamic import for TypeScript module
let ChatServer;

app.prepare().then(async () => {
  // Import ChatServer (works with both dev and production)
  try {
    const module = await import('./lib/chat/websocket-server.js');
    ChatServer = module.ChatServer;
  } catch (err) {
    console.error('Failed to load ChatServer:', err);
    process.exit(1);
  }

  // Create HTTP server for Next.js
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Start Next.js server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Next.js ready on http://${hostname}:${port}`);
  });

  // Start WebSocket server
  const chatServer = new ChatServer({
    port: wsPort,
    maxConnections: parseInt(process.env.WS_MAX_CONNECTIONS || '100', 10),
  });

  chatServer.start();

  // Graceful shutdown
  const shutdown = () => {
    console.log('\nShutting down servers...');
    chatServer.stop();
    server.close(() => {
      console.log('Servers closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
});
