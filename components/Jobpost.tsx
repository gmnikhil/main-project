import Link from "next/link";
import { Divider } from "@mantine/core";

function Jobpost({ job }: { job: any }) {
  return (
    <div className="flex ml-5 font-josefin flex-row">
      <div
        className="bg-black bg-cover bg-center h-10 w-10 rounded-3xl mt-5 mr-5"
        style={{
          backgroundImage: `url('${
            job?.company?.avatar
              ? job.company.avatar
              : "../public/images/profile.png"
          }')`,
        }}
      ></div>
      <div>
        <Link href={"jobs/details/" + job.index}>
          <p className="font-bold text-red-600 text-xl w-96">
            {job.title} at {job.company?.name || ""}
          </p>
        </Link>
        <p>{job.requirements}</p>
        <p>{job.description}</p>
        <p>{job.eligibility}</p>
        <Divider my="lg" />
      </div>
    </div>
  );
}

export default Jobpost;
