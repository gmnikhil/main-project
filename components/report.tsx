import { Button } from "@mantine/core";

import Image from "next/image";
import signin from "../public/images/signin.jpg";
import { useContext, useEffect, useState } from "react";
import requestHandler from "../utils/requestHandler";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import Link from "next/link";

function Report({ report }: { report: any }) {
  const [this_report, setThisReport] = useState(report);

  const { token, currentUser, currentCompany } = useContext(AuthContext);

  useEffect(() => {
    console.log(report);
    setThisReport(report);
  }, [report]);

  if (!report?.creator)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <>
      <div
        className="bg-white ml-72 mt-3 rounded-xl border-solid border-gray-300 border pb- mb-10 flex flex-col h-fit"
        style={{ width: "600px" }}
      >
        <div className="flex flex-row">
          <div
            className="flex justify-center bg-cover bg-center rounded-full !w-14 !h-14 bg-off-white mt-5 ml-5"
            style={{
              backgroundImage: `url(${
                this_report?.creator?.avatar
                  ? this_report.creator.avatar
                  : "https://picsum.photos/1400"
              })`,
            }}
          ></div>
          <div className="mt-7 ml-3 font-josefin text-sm font-bold">
            <p>{this_report.creator.name}</p>

            <p className="text-xs text-gray-400 font-normal">
              {this_report.creator.name}
            </p>
          </div>

          {/* <Button
            color="dark"
            variant="subtle"
            leftIcon={<IconFriends />}
            className="text-sm rounded-3xl ml-80 mt-7 font-bold"
          >
            Connect
          </Button> */}
        </div>
        <div className="text-sm ml-5 mb-4 mt-7">
          <p>{this_report.comment}</p>
        </div>
        {this_report.file_link && (
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={this_report.file_link || signin}
              alt="camera image"
              width={1000}
              height={500}
              //style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Report;
