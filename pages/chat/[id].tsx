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
  const [activeUsers, setActiveUsers] = useState([]);
  const [recipient, setRecipient] = useState<any>();
  const { currentUser, token, currentCompany } = useContext(AuthContext);

  async function initSocket() {
    if (socket) return;
    await fetch("/api/chat/room", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const newSocket = io({
      extraHeaders: { Authorization: `Bearer ${token}` },
    });
    newSocket.on("connect", () => {
      console.log("Connected to server");
      newSocket.emit("addUser", currentUser._id);
    });

    newSocket.on("message", (newMessage: String) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    newSocket.on("activeUsers", setActiveUsers);

    setSocket(newSocket);
  }

  const handleSendMessage = () => {
    if (!message) {
      return;
    }
    console.log("here");
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

  const filteredMessages = messages.filter(
    (msg) => msg.sender === recipient || msg.recipient === recipient
  );

  useEffect(() => {
    if (!currentUser && !currentCompany) router.push("/auth/login");
  }, [currentUser, currentCompany]);

  useEffect(() => {
    initSocket();
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [socket, currentUser]);

  useEffect(() => {
    if (router.query.id) {
      setRecipient(router.query.id);
    }
  }, [router]);

  return (
    <div>
      <h1>Messages</h1>
      <div>
        <h2>Active Users</h2>
        <ul>
          {activeUsers.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Conversation</h2>
        <ul>
          {filteredMessages.map((msg) => (
            <li key={msg._id}>
              {msg.content} - {msg.sender} - {msg.recipient}
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
