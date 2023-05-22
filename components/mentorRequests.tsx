import Link from "next/link";
import { Button, Divider } from "@mantine/core";
import requestHandler from "../utils/requestHandler";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";

function MentorRequests({
  req,
  acceptedHandler,
}: {
  req: any;
  acceptedHandler: Function;
}) {
  const { currentUser, token } = useContext(AuthContext);
  const handleAccept = async () => {
    requestHandler(
      "PATCH",
      "/api/mentorship",
      { _id: req._id, mentee: currentUser._id },
      token
    )
      .then((res: any) => {
        console.log(res);
        acceptedHandler();
      })
      .catch((e: any) => {
        console.log(e);
        toast.error("Couldnt accept");
      });
  };
  return (
    <div className="flex ml-5 font-josefin flex-row">
      <div
        className="bg-black bg-cover bg-center h-10 w-10 rounded-3xl mt-5 mr-5"
        style={{
          backgroundImage: `url('${
            req?.mentor?.avatar
              ? req.mentor.avatar
              : "../public/images/profile.png"
          }')`,
        }}
      ></div>
      <div>
        <Link href={"/profile/" + req.mentor._id}>
          <p className="font-bold text-red-600 text-xl w-96">
            {req.mentor.name}
          </p>
        </Link>
        <p>{req.mentor.about}</p>
        <p>Everyday at {req.date_time}</p>
        <Button className="bg-blue-400" onClick={handleAccept}>
          Accept
        </Button>
        <Divider my="lg" />
      </div>
    </div>
  );
}

export default MentorRequests;
