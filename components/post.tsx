import { Button } from "@mantine/core";
import {
  IconArrowForward,
  IconFriends,
  IconMessage,
  IconSend,
  IconThumbUp,
} from "@tabler/icons-react";
import Image from "next/image";
import signin from "../public/images/signin.jpg";
import { useContext, useEffect, useState } from "react";
import requestHandler from "../utils/requestHandler";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import CommentModal from "../pages/feed/modals/commentModal";

function Post({ post }: { post: any }) {
  const [this_post, setThisPost] = useState(post);

  const { token, currentUser, currentCompany } = useContext(AuthContext);
  const [comment_modal_opened, setCommentModalOpened] = useState(false);

  const handleLike = (e: any) => {
    console.log(post);
    e.preventDefault();
    let id;
    if (currentUser) id = currentUser._id;
    else id = currentCompany._id;
    if (this_post.liked) {
      requestHandler(
        "DELETE",
        `/api/feed/like?liker=${id}&&post_id=${this_post._id}`,
        {
          liker: id,
          post_id: this_post._id,
        },
        token
      )
        .then((res: any) => {
          setThisPost((p: any) => {
            p.liked = false;
            return { ...p };
          });
        })
        .catch((e: any) => {
          toast.error("Could not unlike");
        });
    } else {
      requestHandler(
        "POST",
        "/api/feed/like",
        {
          liker: id,
          post_id: this_post._id,
        },
        token
      )
        .then((res: any) => {
          setThisPost((p: any) => {
            p.liked = true;
            return { ...p };
          });
        })
        .catch((e: any) => {
          toast.error("Could not like");
        });
    }
  };
  useEffect(() => {
    setThisPost(post);
  }, [post]);

  return (
    <>
      {comment_modal_opened && (
        <CommentModal
          handleClose={() => setCommentModalOpened(false)}
          comment_modal_opened={comment_modal_opened}
          post_id={this_post._id}
        />
      )}
      <div
        className="bg-white ml-72 mt-3 rounded-xl border-solid border-gray-300 border pb- mb-10 flex flex-col h-fit"
        style={{ width: "600px" }}
      >
        <div className="flex flex-row">
          <div className="flex justify-center rounded-full !w-14 !h-14 bg-off-white mt-5 ml-5"></div>
          <div className="mt-7 ml-3 font-josefin text-sm font-bold">
            <p>{this_post.creator.name}</p>
            <p className="text-xs text-gray-400 font-normal">
              {this_post.creator.username}
            </p>
          </div>
          {/* <Button
            color="dark"
            variant="subtle"
            leftIcon={<IconFriends />}
            className="text-sm rounded-3xl ml-80 mt-7 font-bold"
          >
            Connect
          </Button> */}
        </div>
        <div className="text-sm ml-5 mt-7">
          <p>{this_post.content}</p>
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
            src={this_post.image || signin}
            alt="camera image"
            width={1000}
            height={500}
            //style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-row ">
          <Button
            color="dark"
            variant="subtle"
            leftIcon={<IconThumbUp />}
            className={`text-sm rounded-3xl ml-8 mt-3 mb-3 font-bold ${
              this_post.liked ? "text-green-400" : "text-black"
            }`}
            onClick={handleLike}
          >
            Like
          </Button>
          <Button
            color="dark"
            variant="subtle"
            leftIcon={<IconMessage />}
            className="text-sm rounded-3xl ml-8 mt-3 mb-3 font-bold"
            onClick={() => {
              setCommentModalOpened(true);
            }}
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
    </>
  );
}

export default Post;
