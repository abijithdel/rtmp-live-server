require('dotenv').config();
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const morgan = require('morgan')
const path = require('path')
require('./src/rtmp/main')
require('./src/dbConfig')


const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('a user connected');
});

const AuthRouter = require('./src/router/auth');
const LiveRouter = require('./src/router/live');
app.use('/api/auth', AuthRouter);
app.use('/api/live', LiveRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});