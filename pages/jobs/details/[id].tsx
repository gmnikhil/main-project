import Image from "next/image";
import camera from "../../../public/images/camera.png";
import { Button } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useWalletDetails } from "../../../hooks/walletDetails";
import requestHandler from "../../../utils/requestHandler";
import { AuthContext } from "../../../context/authContext";
import Link from "next/link";
function jobdesc() {
  const [jobID, setJobID] = useState<number>();
  const [job, setJob] = useState<any>();
  const router = useRouter();
  const { acc, MainProjectContract, loading } = useWalletDetails();
  const { token } = useContext(AuthContext);

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
    <div className="bg-white flex flex-row h-screen">
      <div className=" bg-white w-1/3 flex justify-center items-center flex-col overflow-hidden">
        <Image src={camera} alt="company logo" className="w-20 h-20 " />
        <div className="mt-5 flex flex-col items-center">
          <p className="font-josefin text-3xl text-red-700 ">
            {job.company.name}
          </p>
          <p className="font-josefin text-2xl mt-2">{job.company.email}</p>
          {/* <p className="font-josefin text-lg mt-1">Uploaded 19 minutes ago</p> */}

          <Button variant="outline" color="blue" className="mt-7">
            Follow
          </Button>
          <Link href={"/jobs/reports/" + jobID}>
            <Button variant="filled" color="red" className="mt-7 bg-red-400">
              View Reports
            </Button>
          </Link>
        </div>
      </div>
      <div className=" pl-10 w-2/3 pr-20 bg-beige pb-5 overflow-y-scroll">
        <div className="flex flex-row ">
          <p className="font-gloock text-3xl font-bold mt-10 text-red-700 mr-16">
            {job.title}
          </p>
          <Link href={job.link || "#"}>
            <Button
              variant="filled"
              size="md"
              color="red"
              className="mt-10 bg-red-600 text-white rounded-3xl "
            >
              Apply
            </Button>
          </Link>
        </div>

        <p className="font-bold font-josefin text-2xl mb-3 mt-6 ">
          Introduction
        </p>
        <p className="text-justify mb-8">{job.description}</p>

        <p className="font-bold font-josefin text-2xl mb-3">
          Your Role and Responsibilities
        </p>
        <p className="text-justify mb-8">{job.responsibilities}</p>

        <p className="font-bold font-josefin text-2xl mb-3">
          Required Technical and Professional Expertise
        </p>
        <p className="text-justify mb-8">{job.requirements}</p>

        <p className="font-bold font-josefin text-2xl mb-3">Eligibility</p>
        <p className="text-justify mb-8">{job.eligibility}</p>

        <p className="font-bold font-josefin text-2xl mb-3">
          About Business Unit
        </p>
        <p className="text-justify mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel
          dictum arcu, et viverra ipsum. Aliquam erat volutpat. Quisque eget
          metus quis turpis gravida fringilla varius nec tortor. Pellentesque
          purus velit, eleifend at aliquet vel, suscipit at urna. Curabitur eget
          mi eget lectus lacinia placerat ac in enim. Phasellus porttitor lorem
          imperdiet, lobortis felis in, varius quam. Vestibulum fermentum turpis
          at tellus lobortis luctus. Ut at condimentum nibh, eget posuere lorem.
          Nulla vestibulum, metus ac laoreet fermentum, nulla lectus faucibus
          elit, ac ornare nisi ipsum et ante. Nulla pretium pellentesque
          fringilla.
        </p>
      </div>
    </div>
  );
}

export default jobdesc;
