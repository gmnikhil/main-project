import { useContext, useEffect, useState } from "react";
import Jobpost from "../components/Jobpost";
import { useWalletDetails } from "../hooks/walletDetails";
import AddJobModal from "./company/modals/addJobModal";
import { toast } from "react-toastify";
import requestHandler from "../utils/requestHandler";
import { AuthContext } from "../context/authContext";

function Job() {
  const [jobs, setJobs] = useState([]);
  const [add_job_modal_opened, setAddJobModalOpened] = useState(false);
  const { acc, MainProjectContract, loading } = useWalletDetails();
  const { token } = useContext(AuthContext);

  const handleCloseJobAddModal = () => {
    setAddJobModalOpened(false);
  };

  const handleJobPosted = () => {
    toast.success("Job created");
    handleCloseJobAddModal();
    fetchJobs();
  };

  async function fetchJobs() {
    try {
      const jobCount = await (MainProjectContract as any).methods
        .jobCount()
        .call();
      console.log(jobCount);
      let j = [];
      for (let i = 0; i < jobCount; i++) {
        j[i] = await (MainProjectContract as any).methods.jobs(i).call();
        await requestHandler(
          "POST",
          "/api/company/details",
          { company_id: j[i].company_id },
          token
        )
          .then((r: any) => (j[i].company = r.data.company))
          .catch((e: any) => {
            throw new Error("Couldnt get company");
          });
      }
      j = j.filter((p) => p.active == true);
      setJobs(j as any);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (acc) fetchJobs();
  }, [acc]);
  return (
    <>
      <AddJobModal
        handleClose={handleCloseJobAddModal}
        handleUpdate={handleJobPosted}
        open={add_job_modal_opened}
      />
      <button
        onClick={() => {
          setAddJobModalOpened(true);
        }}
      >
        Add Job
      </button>
      <div className="flex bg-off-white h-screen p-5 justify-center ">
        <div className=" bg-white rounded-xl border-solid border-gray-300 border w-1/3 pt-10">
          {jobs &&
            jobs.map((j: any, i: any) => {
              console.log(j);
              return <Jobpost key={i} job={j} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Job;
