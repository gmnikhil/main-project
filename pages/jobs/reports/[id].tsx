import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useWalletDetails } from "../../../hooks/walletDetails";
import { AuthContext } from "../../../context/authContext";
import requestHandler from "../../../utils/requestHandler";
import { toast } from "react-toastify";
import InputEmoji from "react-input-emoji";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const router = useRouter();
  const [jobID, setJobID] = useState();
  const { acc, MainProjectContract, loading } = useWalletDetails();
  const { token, currentUser, currentCompany } = useContext(AuthContext);
  const [job, setJob] = useState<any>();
  const [new_report, setNewReport] = useState();

  const handleNewReport = (e: any) => {
    e.preventDefault();
  };

  async function fetchJob() {
    console.log(jobID);
    try {
      const j = await (MainProjectContract as any).methods.jobs(jobID).call();
      console.log(j);
      await requestHandler(
        "POST",
        "/api/company/details",
        { company_id: j.company_id },
        token
      )
        .then((r: any) => (j.company = r.data.company))
        .catch((e: any) => {
          throw new Error("Couldnt get company");
        });
      setJob(j as any);
    } catch (e) {
      console.log(e);
      toast.error("Couldnt fetch job");
    }
  }

  async function fetchReports() {
    try {
      const reportCount = await (MainProjectContract as any).methods
        .reportCount()
        .call();
      let r: any = [];
      for (let i = 0; i < reportCount; i++) {
        r[i] = await (MainProjectContract as any).methods.reports(i).call();
        //   await requestHandler(
        //     "POST",
        //     "/api/company/details",
        //     { company_id: j[i].company_id },
        //     token
        //   )
        //     .then((r: any) => (j[i].company = r.data.company))
        //     .catch((e: any) => {
        //       throw new Error("Couldnt get company");
        //     });
      }
      setReports(r as any);
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch reports");
    }
  }

  useEffect(() => {
    if (router.query.id) {
      setJobID(router.query.id as any);
    }
  }, [router]);

  useEffect(() => {
    if (jobID && acc) fetchJob();
  }, [jobID, acc]);

  if (!job)
    return (
      <>
        <div>Loading...</div>
      </>
    );

  return (
    <div className="bg-beige h-screen flex justify-center pt-10">
      <div className="bg-white w-5/6 mb-10">
        <div className="bg-off-white h-16 flex items-center ">
          <div className="bg-black rounded-3xl w-10 h-10 ml-5"></div>
          <p className="ml-3 font-josefin">{job.title || "Loading..."}</p>
        </div>
        <h1>Messages</h1>
        <div>
          <ul>
            {reports &&
              reports.map((msg: any, i) => {
                if (
                  msg.from == currentUser?._id ||
                  msg.from == currentCompany?._id
                )
                  return (
                    <li key={i}>
                      {currentUser.name}: {msg.body}
                    </li>
                  );
                return (
                  <li key={i}>
                    {job.creator.name}: {msg.body}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="absolute bottom-10 w-5/6 h-14 flex flex-row items-center bg-off-white overflow-hidden">
          <InputEmoji
            value={new_report}
            onChange={setNewReport}
            cleanOnEnter
            placeholder="Type your report"
            onEnter={handleNewReport}
          />
        </div>
      </div>
    </div>
  );
}
