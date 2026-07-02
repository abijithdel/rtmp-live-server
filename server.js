require("dotenv").config();
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("./src/rtmp/main");
require("./src/dbConfig");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

io.on("connection", (socket) => {
  console.log(`a user connected. id:${socket.id}`);

  socket.on("join-new-live", ({ roomid, username }) => {
    socket.join(roomid);
    socket.username = username;
    socket.roomid = roomid;
    console.log(`${username} joined room: ${roomid}`);
    const size = io.sockets.adapter.rooms.get(roomid)?.size || 0;

    io.to(roomid).emit("info", {
      userId: socket.id,
      username,
      size,
      status: "Join",
    });
  });

  socket.on("rmessage", ({ message, username, roomid }) => {
    io.to(roomid).emit("smessage", { message, username });
  });

  socket.on("r-leave-user", async ({ roomid, username }) => {
    await socket.leave(roomid); 
    const size = io.sockets.adapter.rooms.get(roomid)?.size || 0; 
    io.to(roomid).emit("info", {
      userId: socket.id,
      username,
      size,
      status: "Leave",
    });
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((roomid) => {
      if (roomid !== socket.id) {
        const currentSize = io.sockets.adapter.rooms.get(roomid)?.size || 0;
        const size = Math.max(0, currentSize - 1);

        socket.to(roomid).emit("info", {
          userId: socket.id,
          username: socket.username || "User",
          size,
          status: "Leave",
        });
      }
    });
  });

  socket.on("disconnect", () => {
    console.log(`socket disconnected: ${socket.id}`);
  });
});

const AuthRouter = require("./src/router/auth");
const LiveRouter = require("./src/router/live");
app.use("/api/auth", AuthRouter);
app.use("/api/live", LiveRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
