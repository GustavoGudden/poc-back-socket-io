const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connections ${socket.id}`);

  socket.on("login", (data) => {
    try {
      const token = singIn(data);
      socket.emit("recive_token", token);
    } catch (error) {
      socket.emit("erro_login", error);
    }
  });
});

server.listen(3001, () => console.log("rodando na porta 3001"));

const singIn = (data) => {
  if (data.username === "gudden" && data.password === "123") {
    const token = "token321";

    return token;
  } else {
    throw new Object({ message: "Credenciais incorretas." });
  }
};
