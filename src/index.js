const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
import serverExpress from './app';
import {Server} from "socket.io";
import http from 'http';
import {connectDB} from './db';
import sockets from './sockets'

const port = parseInt(process.env.PORT) || 3001;

connectDB()

const server= http.createServer(serverExpress)
let httpServer = server.listen(port, () => {
console.log(`%s listening`); // eslint-disable-line no-console
});
let io = new Server(httpServer)
sockets(io)