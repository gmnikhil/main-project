import { Button } from "@mantine/core";
import {
  IconArrowForward,
  IconFriends,
  IconFriendsOff,
  IconMailForward,
  IconMessage,
  IconSend,
  IconThumbUp,
} from "@tabler/icons-react";
import Image from "next/image";
import signin from "../public/images/signin.jpg";

function Post() {
  return (
    <div className="bg-white w-2/5 ml-72 mt-3 rounded-xl border-solid border-gray-300 border pb- mb-10 flex flex-col h-full">
      <div className="flex flex-row">
        <div className="flex justify-center rounded-full w-14 h-14 bg-off-white mt-5 ml-5"></div>
        <div className="mt-7 ml-3 font-josefin text-sm font-bold">
          <p>Name</p>
          <p className="text-xs text-gray-400 font-normal">Description</p>
        </div>
        <Button
          color="dark"
          variant="subtle"
          leftIcon={<IconFriends />}
          className="text-sm rounded-3xl ml-80 mt-7 font-bold"
        >
          Connect
        </Button>
      </div>
      <div className="text-sm ml-5 mt-7">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
          tincidunt finibus metus. Aliquam erat volutpat.
        </p>
      </div>
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={signin}
          alt="camera image"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-row ">
        <Button
          color="dark"
          variant="subtle"
          leftIcon={<IconThumbUp />}
          className="text-sm rounded-3xl ml-8 mt-3 mb-3 font-bold"
        >
          Like
        </Button>
        <Button
          color="dark"
          variant="subtle"
          leftIcon={<IconMessage />}
          className="text-sm rounded-3xl ml-8 mt-3 mb-3 font-bold"
        >
          Comment
        </Button>
        <Button
          color="dark"
          variant="subtle"
          leftIcon={<IconArrowForward />}
          className="text-sm rounded-3xl ml-8 mt-3 mb-3 font-bold"
        >
          Repost
        </Button>
        <Button
          color="dark"
          variant="subtle"
          leftIcon={<IconSend />}
          className="text-sm rounded-3xl mt-3 ml-8 mb-3 font-bold"
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default Post;
