import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/authContext";
import InputEmoji from "react-input-emoji";
import requestHandler from "../../utils/requestHandler";

/*Currently only users can chat between each other */

const MessagesPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [recipient, setRecipient] = useState<any>();
  const { currentUser, token, currentCompany } = useContext(AuthContext);
  const [recipientData, setRecipientData] = useState<any>();

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

  const getRecepientAndMessages = () => {
    if (!recipient) {
      console.warn("No recipient data");
    }
    requestHandler("POST", "/api/chat/users", { _id: recipient }, token)
      .then((res: any) => {
        const { recProfile } = res.data;
        setRecipientData(recProfile);
      })
      .catch((err: any) => {
        console.log("rec data error");
      });

    requestHandler(
      "POST",
      "/api/chat/messages",
      { recipient: recipient },
      token
    )
      .then((res: any) => {
        const { messages } = res.data;
        setMessages(messages);
      })
      .catch((err: any) => {
        console.log("message retrieval error");
      });
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
    if (currentUser && recipient) {
      initSocket();
      getRecepientAndMessages();
    }
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [currentUser, recipient]);

  return (
    <div className="bg-beige h-screen flex justify-center pt-10">
      <div className="bg-white w-5/6 mb-10">
        <div className="bg-off-white h-16 flex items-center ">
          <div className="bg-black rounded-3xl w-10 h-10 ml-5"></div>
          <p className="ml-3 font-josefin">
            {recipientData?.username || "Loading..."}
          </p>
        </div>
        <h1>Messages</h1>
        <div>
          <ul>
            {messages &&
              messages.map((msg, i) => {
                if (
                  msg.from == currentUser?._id ||
                  msg.from == currentCompany?._id
                )
                  return (
                    <li key={i}>
                      {currentUser.name}: {msg.body}
                    </li>
                  );
                return (
                  <li key={i}>
                    {recipientData.name}: {msg.body}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="absolute bottom-10 w-5/6 h-14 flex flex-row items-center bg-off-white overflow-hidden">
          <InputEmoji
            value={message}
            onChange={setMessage}
            cleanOnEnter
            placeholder="Type a message"
            onEnter={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
