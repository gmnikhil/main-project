import { Input, Textarea, Button, Modal } from "@mantine/core";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { useWalletDetails } from "../../../hooks/walletDetails";
import { AuthContext } from "../../../context/authContext";

export default function AddJobModal({
  open,
  handleClose,
  handleUpdate,
}: {
  open: boolean;
  handleClose: Function;
  handleUpdate: Function;
}) {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [requirements, setRequirements] = useState<string>();
  const [eligibility, setEligibility] = useState<string>();
  const active = true;

  const { currentCompany } = useContext(AuthContext);

  const { acc, MainProjectContract, loading } = useWalletDetails();

  const handleUpload = async () => {
    try {
      if (!currentCompany) {
        throw new Error("No company");
      }
      const r = await (MainProjectContract as any).methods
        .addJob(
          currentCompany._id,
          title,
          description,
          requirements,
          eligibility,
          active
        )
        .send({ from: acc });
      setTitle("");
      setDescription("");
      setEligibility("");
      setRequirements("");
      handleUpdate();
    } catch (e) {
      console.log(e);
      toast.error("Job creation Failed");
    }
  };

  return (
    <>
      <Modal
        centered
        opened={open}
        onClose={() => handleClose()}
        title={<h1>New Job</h1>}
        closeOnClickOutside={false}
      >
        {/* Modal content */}

        <label className="text-sm">Title</label>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3"
          placeholder="Enter Title for job..."
          size="md"
        />

        <label className="text-sm">Description</label>
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          className="mb-3"
          placeholder="Enter Description for job..."
          size="md"
        />

        <label className="text-sm">Requirements</label>
        <Textarea
          onChange={(e) => setRequirements(e.target.value)}
          className="mb-3"
          placeholder="Enter Requirements for job..."
          size="md"
        />

        <label className="text-sm">Eligibility</label>
        <Textarea
          onChange={(e) => setEligibility(e.target.value)}
          className="mb-3"
          placeholder="Enter Eligibility for job..."
          size="md"
        />

        <div className="mt-4 flex justify-end ">
          <Button
            className="text-white bg-baseColor"
            disabled={!requirements || !eligibility || !title}
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
