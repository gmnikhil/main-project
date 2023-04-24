import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/authContext";

/*Currently only users can chat between each other */

const MessagesPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [recipient, setRecipient] = useState<any>();
  const { currentUser, token, currentCompany } = useContext(AuthContext);

  async function initSocket() {
    if (socket) socket.disconnect();
    await fetch("/api/chat/room", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const newSocket = io({
      extraHeaders: { Authorization: `Bearer ${token}` },
      query: {
        room: [currentUser._id, recipient].sort().join(""),
      },
    });
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("message", (newMessage: String) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    setSocket(newSocket);
  }

  const handleSendMessage = () => {
    if (!message || !currentUser) {
      if (!currentUser) console.log(currentUser);
      return;
    }

    const newMessage = {
      content: message,
      sender: currentUser._id,
      recipient,
    };

    socket.emit("message", newMessage, (error: any) => {
      if (error) {
        console.log(error);
        alert(error);
      } else {
        console.log("Message sent successfully");
      }
    });

    setMessage("");
  };

  useEffect(() => {
    if (!currentUser && !currentCompany) router.push("/auth/login");
  }, [currentUser, currentCompany]);

  useEffect(() => {
    if (router.query.id) {
      setRecipient(router.query.id);
    }
  }, [router]);

  useEffect(() => {
    if (currentUser && recipient) initSocket();
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [currentUser, recipient]);

  return (
    <div>
      <h1>Messages</h1>
      <div>
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>
              {msg.from} - {msg.to} : {msg.body}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessagesPage;
