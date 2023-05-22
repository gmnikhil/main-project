import { Input, Textarea, Button, Modal, Select } from "@mantine/core";
import { storeFile } from "../../../utils/storeFile";
import { toast } from "react-toastify";
import { DragAndDrop } from "../../../components";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import requestHandler from "../../../utils/requestHandler";

export default function AddPostModal({
  open,
  handleClose,
  handleUpdate,
}: {
  open: boolean;
  handleClose: Function;
  handleUpdate: Function;
}) {
  const [file, setFile] = useState();

  const [post_content, setPostContent] = useState("");

  const { token, currentUser, currentCompany } = useContext(AuthContext);

  const handleFile = (file: any) => {
    setFile(file);
  };

  const handleUpload = async () => {
    try {
      let url;
      if (file) {
        const res = await storeFile(file, "post", "post");

        if (!res.data) throw Error(`Could'nt store file`);

        url =
          `https://ipfs.io/` +
          res.data.data.image.href.replace(":", "").replace("//", "/");
      }
      const date = new Date().toISOString();
      console.log(token);
      let creatorType, creator;
      if (currentUser) {
        (creatorType = "user"), (creator = currentUser._id);
      } else {
        (creatorType = "company"), (creator = currentCompany._id);
      }
      const response = await requestHandler(
        "POST",
        "/api/feed/post",
        {
          creatorType,
          creator,
          content: post_content,
          image: url,
        },
        token
      );
      if (!response.data.success) throw Error(`Could'nt upload`);

      //      const r = await FileFly.methods
      //        .addFile(url, post_title, post_description, post_label, date, _id)

      handleUpdate();
      toast.success("Upload Succesful");
      handleClose();
    } catch (e) {
      console.log(e);
      toast.error("Upload Failed");
    }
  };

  return (
    <>
      <Modal
        centered
        opened={open}
        onClose={() => handleClose()}
        title={<h1>New Post</h1>}
        closeOnClickOutside={false}
      >
        {/* Modal content */}
        <div className="w-full mx-auto my-5">
          {file ? (
            <div className="relative">
              <img
                className="mx-auto"
                src={URL.createObjectURL(file)}
                style={{ maxHeight: "100px" }}
              />
              <Button
                className="text-white bg-red-600 absolute right-0"
                onClick={() => setFile(undefined)}
              >
                Delete
              </Button>
            </div>
          ) : (
            <DragAndDrop handleFile={handleFile} />
          )}
        </div>

        <label className="text-sm">Content</label>
        <Textarea
          onChange={(e) => setPostContent(e.target.value)}
          className="mb-3"
          placeholder="Write your post..."
          size="md"
        />

        <div className="mt-4 flex justify-end ">
          <Button
            color="blue"
            variant="filled"
            className="text-white bg-blue-400"
            disabled={!post_content}
            onClick={() => {
              handleUpload();
            }}
          >
            Post
          </Button>
        </div>
      </Modal>
    </>
  );
}
