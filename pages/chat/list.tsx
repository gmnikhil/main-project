import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import requestHandler from "../../utils/requestHandler";

export default function ChatList() {
  const router = useRouter();
  const [users, setUsers] = useState<any>([]);

  const { currentUser, token } = useContext(AuthContext);

  const openChat = (id: string) => (e: any) => {
    e.preventDefault();
    router.push("/chat/" + id);
  };

  useEffect(() => {
    if (!currentUser) router.push("/auth/login");
    //console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    requestHandler("GET", "/api/chat/users", {}, token)
      .then((res: any) => {
        setUsers(res.data.users);
      })
      .catch((err: any) => {
        console.log(err);
      });
  });

  return (
    <div>
      {users.map((user: any, key: any) => {
        return (
          <div key={key}>
            <div>Name: {user.name}</div>
            <br />
            <div>ID: {user._id}</div>
            <br />
            <button onClick={openChat(user._id)}>Chat</button>
          </div>
        );
      })}
    </div>
  );
}
