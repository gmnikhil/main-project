import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/authContext";
import InputEmoji from "react-input-emoji";
import requestHandler from "../../utils/requestHandler";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { Paper, Text } from "@mantine/core";
import Link from "next/link";

/*Currently only users can chat between each other */

const MessagesPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [recipient, setRecipient] = useState<any>();
  const { currentUser, token, currentCompany } = useContext(AuthContext);
  const [recipientData, setRecipientData] = useState<any>();
  const [mentorship, setMentorship] = useState<any>();
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(true);

  async function initSocket() {
    if (socket) socket.disconnect();
    await fetch("/api/chat/room", {
      headers: { Authorization: `Bearer ${token}` },
    });
    let rid;
    if (currentUser) rid = currentUser._id;
    else rid = currentCompany._id;
    const newSocket = io({
      extraHeaders: { Authorization: `Bearer ${token}` },
      query: {
        room: [rid, recipient].sort().join(""),
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

  async function checkMentorship() {
    await requestHandler(
      "GET",
      "/api/mentorship?status=progress&&mentee=" +
        currentUser._id +
        "&&mentor=" +
        router.query.id,
      {},
      token
    )
      .then((res: any) => {
        if (res.data.requests.length) {
          setMentorship(res.data.requests[0]);
        }
      })
      .catch((e: any) => {
        console.log(e);
        toast.error("Something went wrong!");
      });

    await requestHandler(
      "GET",
      "/api/mentorship?status=progress&&mentee=" +
        router.query.id +
        "&&mentor=" +
        currentUser._id,
      {},
      token
    )
      .then((res: any) => {
        if (res.data.requests.length) {
          setMentorship(res.data.requests[0]);
        }
      })
      .catch((e: any) => {
        console.log(e);
        toast.error("Something went wrong!");
      });

    setLoading(false);
  }

  useEffect(() => {
    if (!currentUser && !currentCompany) router.push("/auth/login");
  }, [currentUser, currentCompany]);

  useEffect(() => {
    if (router.query.id) {
      setRecipient(router.query.id);
    }
  }, [router]);

  useEffect(() => {
    if ((currentUser && recipient) || (currentCompany && recipient)) {
      initSocket();
      getRecepientAndMessages();
      if (!currentCompany) checkMentorship();
      if (currentCompany) setLoading(false);
    }
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [currentUser, recipient]);

  useEffect(() => {
    if (!mentorship?.date_time) return;

    const targetTime = new Date();
    const [hours, minutes] = mentorship.date_time.split(":");

    targetTime.setHours(hours);
    targetTime.setMinutes(minutes);
    targetTime.setSeconds(0);
    targetTime.setMilliseconds(0);

    const currentTime = new Date();
    console.log(currentTime - targetTime);
    // Check if current time is less than half past the target time
    if (currentTime - targetTime < 1800000 && currentTime - targetTime >= 0) {
      console.log(currentTime - targetTime);
      setShowChat(true);
      return;
    }

    router.push("/mentoring");
  }, [mentorship]);

  if (loading)
    return (
      <>
        <Navbar />
        <h1>Loading...</h1>
      </>
    );

  if (mentorship && !showChat)
    return (
      <>
        <Navbar />
        <Link href="/mentoring">Go to mentoring</Link>
      </>
    );

  return (
    <div className="flex flex-col bg-beige items-center pt-10 h-screen">
      <div className="bg-white w-5/6 mb-10 h-5/6 overflow-y-scroll">
        <div className="bg-off-white h-16 flex items-center mb-5">
          <div
            className="bg-cover bg-center bg-black rounded-3xl w-10 h-10 ml-5"
            style={{
              backgroundImage: `url(${
                recipientData?.avatar
                  ? recipientData.avatar
                  : "../../public/images/profile.jpg"
              })`,
            }}
          ></div>
          <Link
            href={`/profile/${recipientData?._id ? recipientData._id : ""}`}
          >
            <p className="ml-3 font-josefin">
              {recipientData?.name || "Loading..."}
            </p>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="pb-10">
            <ul>
              {messages &&
                messages.map((msg, i) => {
                  if (
                    msg.from == currentUser?._id ||
                    msg.from == currentCompany?._id
                  )
                    return (
                      <div className="flex justify-end mb-5">
                        <li
                          key={i}
                          className=" mr-5 bg-peach max-w-xs rounded-lg p-2"
                        >
                          {/* {currentUser.name}:*/} {msg.body}
                        </li>
                        <br />
                      </div>
                    );
                  return (
                    <div className="flex justify-start mb-5">
                      <li
                        key={i}
                        className="bg-light-pink max-w-xs  rounded-lg p-2 ml-5"
                      >
                        {/* {recipientData.name}:*/} {msg.body}
                      </li>
                      <br />
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      <div className=" h-14 w-5/6 -mt-16 items-center bg-off-white ">
        <InputEmoji
          value={message}
          onChange={setMessage}
          cleanOnEnter
          placeholder="Type a message"
          onEnter={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MessagesPage;
