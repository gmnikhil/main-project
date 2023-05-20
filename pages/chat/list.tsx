import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import requestHandler from "../../utils/requestHandler";
import { Divider,TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import Image from "next/image";
import Chat from "./../../public/images/Chat.png";
import Navbar from "../../components/Navbar";


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
    <>
      <Navbar />
      <div className="bg-off-white p-10 h-screen flex flex-row ">
      <div className="bg-white w-1/3 h-full overflow-y-scroll">
      <TextInput
        placeholder="Search"
        size="lg"
        icon={<IconSearch size="0.8rem" stroke={1.5} />}
        rightSectionWidth={70}
        styles={{ rightSection: { pointerEvents: 'none' } }}
        mb="sm"
      />
      {users.map((user: any, key: any) => {
        return (


          
          <div className="bg-white pt-2 pl-5">

            <div key={key}>
            {/* <div>Name: {user.name}</div> */}
        
            {/* <div>ID: {user._id}</div> */}
            
            <button onClick={openChat(user._id)}><div className="flex flex-row"><div className="bg-black w-10 h-10 rounded-3xl"></div><div className="flex items-center ml-3"> {user.name}</div></div></button>
            <Divider my="sm" />   
            </div>
          </div>
           
       
          
        );
      })}
      </div>
      
      <Image src={Chat} alt="sign in image" height={1000} width={900} />
      
    </div>
    </>

  );
}
