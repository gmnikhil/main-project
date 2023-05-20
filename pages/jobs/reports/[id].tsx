import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useWalletDetails } from "../../../hooks/walletDetails";
import { AuthContext } from "../../../context/authContext";
import requestHandler from "../../../utils/requestHandler";
import { toast } from "react-toastify";
import InputEmoji from "react-input-emoji";
import { Button } from "@mantine/core";
import { DragAndDrop } from "../../../components";
import { storeFile } from "../../../utils/storeFile";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const router = useRouter();
  const [jobID, setJobID] = useState();
  const { acc, MainProjectContract, loading } = useWalletDetails();
  const { token, currentUser, currentCompany } = useContext(AuthContext);
  const [job, setJob] = useState<any>();
  const [new_report, setNewReport] = useState();
  const [file, setFile] = useState();

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
          new_report,
          file_link,
          created_on,
          creator_id,
          creatorType,
          jobID
        )
        .send({ from: acc });

      setFile(undefined);

      fetchReports();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
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
          <div className="bg-black rounded-3xl w-10 h-10 ml-5"></div>
          <p className="ml-3 font-josefin">{job.title || "Loading..."}</p>
        </div>
        <h1>Messages</h1>
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
