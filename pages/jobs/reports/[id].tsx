import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useWalletDetails } from "../../../hooks/walletDetails";
import { AuthContext } from "../../../context/authContext";
import requestHandler from "../../../utils/requestHandler";
import { toast } from "react-toastify";
import AddReportModal from "./modals/addReportModal";
import { Button, Paper, Text } from "@mantine/core";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const router = useRouter();
  const [jobID, setJobID] = useState();
  const { acc, MainProjectContract, loading } = useWalletDetails();
  const { token, currentUser, currentCompany } = useContext(AuthContext);
  const [job, setJob] = useState<any>();
  const [new_report, setNewReport] = useState();
  const [file, setFile] = useState();

  const [report_modal_opened, setReportModalOpened] = useState(false);

  const closeReportModal = () => {
    setReportModalOpened(false);
  };

  async function fetchJob() {
    try {
      const j = await (MainProjectContract as any).methods.jobs(jobID).call();
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
        if (r[i].job_id != jobID) continue;

        if (r[i].creatorType == "user") {
          await requestHandler(
            "POST",
            "/api/user/details",
            { user_id: r[i].creator_id },
            token
          )
            .then((res: any) => (r[i].creator = res.data.user))
            .catch((e: any) => {
              throw new Error("Couldnt get user");
            });
        } else {
          await requestHandler(
            "POST",
            "/api/company/details",
            { company_id: r[i].creator_id },
            token
          )
            .then((res: any) => (r[i].creator = res.data.company))
            .catch((e: any) => {
              throw new Error("Couldnt get company");
            });
        }
      }
      console.log(r);
      r.filter((rep: any) => rep.job_id == jobID);
      console.log(r);
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

  useEffect(() => {
    if (acc && job) fetchReports();
  }, [job, acc]);

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
          <div
            className="bg-black rounded-3xl w-10 h-10 ml-5"
            style={{
              backgroundImage: `url(${
                job?.company?.avatar
                  ? job.company.avatar
                  : "../../public/images/profile.png"
              })`,
            }}
          ></div>
          <p className="ml-3 font-josefin">{job.title || "Loading..."}</p>
        </div>
        <Paper className="flex w-full justify-center my-6">
          <Text weight={700} size={"lg"}>
            Reports
          </Text>
        </Paper>
        <div>
          <ul>
            {reports &&
              reports.map((report: any, i) => {
                return (
                  <div key={i}>
                    <img src={report.file_link} />
                    <li>
                      {report.creator.name}: {report.comment}
                    </li>
                  </div>
                );
              })}
          </ul>
        </div>

        {jobID && (
          <AddReportModal
            jobID={jobID}
            handleClose={closeReportModal}
            open={report_modal_opened}
            handleUpdate={fetchReports}
          />
        )}
        <div className={"w-full flex justify-center"}>
          {jobID && (
            <Button
              className="bg-blue-400"
              onClick={() => setReportModalOpened(true)}
            >
              Add Report
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
