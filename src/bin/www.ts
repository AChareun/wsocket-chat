#!/usr/bin/env node

import {WebSocketServerWrapper} from "../module/webSocket/webSocketServerWrapper";

/**
 * Module dependencies.
 */
require('dotenv').config();
import debug = require('debug');
import { createServer } from "http";
import {HttpError} from "http-errors";
import {Socket, Server} from "socket.io";

import app from '../app';

debug('wsocket-chat:server')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const httpServer = createServer(app);

/**
 * Create Socket.Io instance and listen.
 */

const io = new Server(httpServer);

const webSocketWrapper = new WebSocketServerWrapper(io);
webSocketWrapper.addNameSpace('/');
webSocketWrapper.initNamespaces();

/**
 * Listen on provided port, on all network interfaces.
 */

httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: HttpError): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = httpServer.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  debug('Listening on ' + bind);
}
