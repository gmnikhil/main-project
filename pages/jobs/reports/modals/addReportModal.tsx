import { Input, Textarea, Button, Modal, Select } from "@mantine/core";
import { storeFile } from "../../../../utils/storeFile";
import { toast } from "react-toastify";
import { DragAndDrop } from "../../../../components";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/authContext";
import requestHandler from "../../../../utils/requestHandler";
import { useWalletDetails } from "../../../../hooks/walletDetails";

export default function AddReportModal({
  open,
  handleClose,
  handleUpdate,
  jobID,
}: {
  open: boolean;
  handleClose: Function;
  handleUpdate: Function;
  jobID: string;
}) {
  const [file, setFile] = useState();

  const [report_content, setPostContent] = useState("");

  const { token, currentUser, currentCompany } = useContext(AuthContext);
  const { acc, MainProjectContract, loading } = useWalletDetails();

  const handleFile = (file: any) => {
    setFile(file);
  };

  const handleNewReport = async () => {
    let file_link = "";
    const created_on = new Date().toISOString();
    let creator_id, creatorType;
    if (currentUser) {
      creator_id = currentUser._id;
      creatorType = "user";
    } else {
      creator_id = currentCompany._id;
      creatorType = "company";
    }

    try {
      if (file) {
        const res = await storeFile(file, "report_file", "report");

        if (!res.data) throw Error(`Could'nt upload file`);

        file_link =
          `https://ipfs.io/` +
          res.data.data.image.href.replace(":", "").replace("//", "/");
      }

      await (MainProjectContract as any).methods
        .addReport(
          report_content,
          file_link,
          created_on,
          creator_id,
          creatorType,
          jobID
        )
        .send({ from: acc });

      setFile(undefined);

      handleUpdate();
      handleClose();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Modal
        centered
        opened={open}
        onClose={() => handleClose()}
        title={<h1>New Report</h1>}
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
          placeholder="Write your report..."
          size="md"
        />

        <div className="mt-4 flex justify-end ">
          <Button
            color="blue"
            variant="filled"
            className="text-white bg-blue-400"
            disabled={!report_content}
            onClick={() => {
              handleNewReport();
            }}
          >
            Report
          </Button>
        </div>
      </Modal>
    </>
  );
}
