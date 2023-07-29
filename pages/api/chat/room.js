import { Server } from "socket.io";
import dbConnect from "../lib/db";
import Message from "../models/message";
import { verifyToken } from "../middlewares/handle_token";

export default async function handler(req, res) {
  await dbConnect();

  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", async (socket) => {
    await verifyToken(req);

    const room = socket.handshake.query.room;
    socket.join(room);

    console.log(`Socket connected: ${socket.id} to ${room}`);

    //console.log(io.of("/").adapter.rooms);

    socket.on("message", async (newMessage) => {
      const { content, sender, recipient } = newMessage;

      const message = new Message({
        body: content,
        from: sender,
        to: recipient,
      });

      await message.save();

      io.to(room).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected from room ${room}`);
    });
  });

  res.end();
}
