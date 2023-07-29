import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useWalletDetails } from "../../../hooks/walletDetails";
import { AuthContext } from "../../../context/authContext";
import requestHandler from "../../../utils/requestHandler";
import { toast } from "react-toastify";
import AddReportModal from "./modals/addReportModal";
import { Button, Paper, Text } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import Report from "../../../components/report";
import Navbar from "../../../components/Navbar";

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
        console.log(r[i].job_id);
        console.log(jobID);
        if (r[i].job_id != jobID) continue;
        console.log("hey");
        console.log(r[i].creatorType);
        if (r[i].creatorType != "company") {
          await requestHandler(
            "POST",
            "/api/user/details",
            { user_id: r[i].creator_id },
            token
          )
            .then((res: any) => {
              console.log(res);
              r[i].creator = res.data.user;
            })
            .catch((e: any) => {
              console.log(e);
              throw Error("Couldnt get user");
            });
        } else {
          await requestHandler(
            "POST",
            "/api/company/details",
            { company_id: r[i].creator_id },
            token
          )
            .then((res: any) => {
              //console.log(res.data);
              r[i].creator = res.data.company;
            })
            .catch((e: any) => {
              console.log(e);
              throw Error("Couldnt get company");
            });
        }
      }
      //console.log(r);
      r = r
        .filter((rep: any) => rep.job_id == jobID)
        .sort(
          (a: any, b: any) =>
            (new Date(b.created_on) as any) - (new Date(a.created_on) as any)
        );

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
    <>
      <Navbar />
      <div className="bg-white flex flex-row h-screen">
        <div className=" bg-white w-1/3 flex justify-center items-center flex-col overflow-hidden">
          <Image
            src={job.company.avatar}
            height={80}
            width={80}
            alt="company logo"
            className="w-20 h-20 rounded-full"
          />
          <div className="mt-5 flex flex-col items-center">
            <p className="font-josefin text-3xl text-red-700 ">
              {job.company.name}
            </p>
            <p className="font-josefin text-2xl mt-2">{job.company.email}</p>
            {/* <p className="font-josefin text-lg mt-1">Uploaded 19 minutes ago</p> */}

            {/* <Button variant="outline" color="blue" className="mt-7">
      Follow
    </Button> */}
            <Link href={"/jobs/details/" + jobID}>
              <Button
                variant="filled"
                color="green"
                className="mt-7 bg-green-400"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
        <div className=" pl-10 w-2/3 pr-20 bg-beige pb-5 overflow-y-scroll">
          <div className="flex flex-row ">
            <p className="font-gloock text-3xl font-bold mt-10 text-red-700 mr-16">
              {job.title}
            </p>
          </div>
          <div className={"w-full flex justify-center mb-5"}>
            {jobID && (
              <Button
                className="bg-blue-400"
                onClick={() => setReportModalOpened(true)}
              >
                Add Report
              </Button>
            )}
          </div>
          {reports &&
            reports.map((report: any, i) => {
              return <Report key={i} report={report} />;
            })}
          {jobID && (
            <AddReportModal
              jobID={jobID}
              handleClose={closeReportModal}
              open={report_modal_opened}
              handleUpdate={fetchReports}
            />
          )}
        </div>
      </div>
    </>
  );
}
