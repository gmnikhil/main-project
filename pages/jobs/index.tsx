import { useContext, useEffect, useState } from "react";
import Jobpost from "../../components/Jobpost";
import { useWalletDetails } from "../../hooks/walletDetails";
import AddJobModal from ".././company/modals/addJobModal";
import { toast } from "react-toastify";
import requestHandler from "../../utils/requestHandler";
import { AuthContext } from "../../context/authContext";
import Navbar from "../../components/Navbar";
import { Button } from "@mantine/core";

function Job() {
  const [jobs, setJobs] = useState([]);
  const [add_job_modal_opened, setAddJobModalOpened] = useState(false);
  const { acc, MainProjectContract, loading } = useWalletDetails();
  const { token, currentCompany } = useContext(AuthContext);

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
      let j: any = [];
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
      j = j.filter((p: any) => p.active == true);
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
      <Navbar />
      {currentCompany && (
        <AddJobModal
          handleClose={handleCloseJobAddModal}
          handleUpdate={handleJobPosted}
          open={add_job_modal_opened}
        />
      )}
      {/* <Navbar /> */}

      <div className="flex flex-col bg-off-white h-screen p-5 items-center ">
        {currentCompany && (
          <Button
            variant="filled"
            color="blue"
            className="bg-blue-400 my-8 w-32"
            onClick={() => {
              setAddJobModalOpened(true);
            }}
          >
            Add Job
          </Button>
        )}
        <div className=" bg-white rounded-xl border-solid border-gray-300 border w-3/5 pt-10">
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
