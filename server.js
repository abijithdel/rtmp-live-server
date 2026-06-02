const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
var morgan = require('morgan')
require('./src/rtmp/main')
require('./src/dbConfig')


const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

io.on('connection', (socket) => {
    console.log('a user connected');
});

const AuthRouter = require('./src/router/auth');
app.use('/api/auth', AuthRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});