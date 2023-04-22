import { Server } from "socket.io";
import dbConnect from "../lib/db";
import Message from "../models/message";
import User from "../models/user";
import { verifyToken } from "../middlewares/handle_token";

export default async function handler(req, res) {
  await dbConnect();
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", async (socket) => {
    const user = await verifyToken(req);
    const { _id } = user;

    socket.join(_id);

    const activeUsers = Object.keys(io.sockets.adapter.rooms).filter(
      (id) => id !== _id
    );

    io.emit("activeUsers", activeUsers);

    socket.on("message", async (newMessage) => {
      const { content, sender, recipient } = newMessage;
      console.log(newMessage);
      const message = new Message({
        body: content,
        from: sender,
        to: recipient,
      });
      await message.save();

      io.to(recipient).emit("message", message);
    });

    socket.on("addUser", (userId) => {
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      const activeUsers = Object.keys(io.sockets.adapter.rooms).filter(
        (id) => id !== _id
      );

      io.emit("activeUsers", activeUsers);
    });
  });

  // async function onAuthorizeSuccess(data, accept) {
  //   accept();
  // }

  // function onAuthorizeFail(data, message, error, accept) {
  //   if (error) throw new Error(message);
  //   accept(new Error(message));
  // }
  res.end();
  //return io;
}
