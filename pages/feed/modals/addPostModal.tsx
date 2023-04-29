import { Input, Textarea, Button, Modal, Select } from "@mantine/core";
import { storeFile } from "../../../utils/storeFile";
import { toast } from "react-toastify";
import { useWalletDetails } from "../../../hooks/walletDetails";
import { DragAndDrop } from "../../../components";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import requestHandler from "../../../utils/requestHandler";

export default function AddFileModal({
  open,
  handleClose,
  handleUpdate,
}: {
  open: boolean;
  handleClose: Function;
  handleUpdate: Function;
}) {
  const [file, setFile] = useState();

  const [post_title, setPostTitle] = useState("");
  const [post_description, setPostDescription] = useState("");
  const [post_label, setPostLabel] = useState("");

  const { acc, MainProjectContract, loading } = useWalletDetails();

  const { token } = useContext(AuthContext);

  const [select_data, setSelectData] = useState([
    { value: "Happy", label: "Happy" },
    { value: "Nature", label: "Nature" },
    { value: "Love", label: "Love" },
  ]);

  const privacy_types = [
    { value: "Public", label: "Public" },
    { value: "Private", label: "Private" },
    { value: "Restricted", label: "Restricted" },
  ];

  const [post_visibility, setPostVisibility] = useState(privacy_types[0].value);

  const handleFile = (file: any) => {
    setFile(file);
  };

  const handleUpload = async () => {
    try {
      const res = await storeFile(file, post_title, post_description);

      if (!res.data) throw Error(`Could'nt store file`);

      const url =
        `https://ipfs.io/` +
        res.data.data.image.href.replace(":", "").replace("//", "/");

      const date = new Date().toISOString();

      const response = await requestHandler("POST", "/api/post", {}, token);
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
        <label className="mt-14 text-sm">Title</label>
        <Input
          className="mb-4"
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
          placeholder="Enter a title for your file"
          size="md"
        />
        <label className="text-sm">Description</label>
        <Textarea
          onChange={(e) => setPostDescription(e.target.value)}
          className="mb-3"
          placeholder="Enter a description for your file"
          size="md"
        />
        <label className="text-sm">Label</label>
        <Select
          data={select_data}
          className="mb-2"
          placeholder="Add a label"
          nothingFound="Nothing found"
          searchable
          creatable
          value={post_label}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setSelectData((current) => [...current, item]);
            setPostLabel(item.value);
            return item;
          }}
          onChange={(val) => setPostLabel(val!)}
        />
        <label className="text-sm">Visibility</label>
        <Select
          data={privacy_types}
          placeholder="Choose post Visibility"
          searchable
          value={post_visibility}
          onChange={(val) => setPostVisibility(val!)}
        />
        <div className="mt-4 flex justify-end ">
          <Button
            className="text-white bg-baseColor"
            disabled={!post_description || !post_title || !post_label || !file}
            onClick={() => {
              handleUpload();
              //setFileUploadModalOpened(false);
            }}
          >
            Post
          </Button>
        </div>
      </Modal>
    </>
  );
}
