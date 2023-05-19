import { Modal, ScrollArea, Input, Button } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";
import requestHandler from "../../../utils/requestHandler";
import Comment from "../../../components/comment";

export default function CommentModal({
  comment_modal_opened,
  handleClose,
  post_id,
}: {
  comment_modal_opened: boolean;
  handleClose: Function;
  post_id: string;
}) {
  const [new_comment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const { token, currentUser, currentCompany } = useContext(AuthContext);
  const [id, setID] = useState("");

  const fetchComments = async () => {
    requestHandler("GET", `/api/feed/comment?post_id=${post_id}`, {}, token)
      .then((res: any) => {
        setComments(res.data.comments);
      })
      .catch((err: any) => {
        toast.error("Couldnt load comments");
      });
  };

  const handleSend = async () => {
    if (!token) return toast.warn("Token error");
    const commentor = currentUser ? currentUser : currentCompany;
    requestHandler(
      "POST",
      "/api/feed/comment",
      { commentor: commentor._id, comment: new_comment, post_id },
      token
    )
      .then((res: any) => {
        res.data.comment.commentor = commentor;
        setComments((prev) => [].concat(prev, [res.data.comment] as any));
      })
      .catch((e: any) => {
        toast.error("Couldnt Comment");
      });

    setNewComment("");
  };

  useEffect(() => {
    if (currentUser) setID(currentUser._id);
    if (currentCompany) setID(currentCompany._id);
    if (token) fetchComments();
  }, [currentUser, currentCompany]);

  return (
    <>
      <Modal
        centered
        opened={comment_modal_opened}
        onClose={() => handleClose()}
        title={<h1 className="text-lg font-semibold">Comments</h1>}
        closeOnClickOutside={false}
      >
        <ScrollArea className="relative flex flex-col w-full pr-8">
          <div
            //ref={scrollAreaRef}
            className="overflow-y-scroll customScroll pb-4 pr-4"
            style={{
              maxHeight: "calc(80vh - 150px)",
              minHeight: "350px",
            }}
          >
            {comments &&
              comments.map((commentDetails: any, i: any) => {
                return (
                  <Comment
                    comment={commentDetails.comment}
                    key={i}
                    sent_by={commentDetails.commentor}
                    sent={commentDetails.commentor === id}
                  />
                );
              })}
          </div>
          <div className="bottom-3 w-full ">
            <div className=" flex gap-2 items-end w-full mx-auto mt-5">
              <Input
                onChange={(e) => setNewComment(e.target.value)}
                value={new_comment}
                placeholder="Enter message . . ."
                className="w-10/12 ml-2"
              />
              <Button
                disabled={!new_comment}
                className="text-white bg-baseColor"
                onClick={() => handleSend()}
              >
                Send
              </Button>
            </div>
          </div>
        </ScrollArea>
      </Modal>
    </>
  );
}
