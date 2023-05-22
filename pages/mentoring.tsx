import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import requestHandler from "../utils/requestHandler";
import { AuthContext } from "../context/authContext";
import Navbar from "../components/Navbar";
import MentorRequests from "../components/mentorRequests";
import { Paper, Text } from "@mantine/core";
import Link from "next/link";

function Job() {
  const [requests, setRequests] = useState<any>([]);
  const [mentoring, setMentoring] = useState<boolean>();
  const [mentor, setMentor] = useState();
  const { token, currentUser } = useContext(AuthContext);
  const [date_time, setDateTime] = useState();
  const [remaining_time, setRemainingTime] = useState();
  const [showChat, setShowChat] = useState(false);

  async function fetchRequests() {
    requestHandler("GET", "/api/mentorship?status=pending", {}, token)
      .then((res: any) => {
        setRequests([
          ...res.data.requests.filter(
            (r: any) => r.mentor._id !== currentUser._id
          ),
        ]);
      })
      .catch((e: any) => {
        console.log(e);
        toast.error("Couldnt fetch requests");
      });
  }

  async function getMentoringStatus() {
    requestHandler(
      "GET",
      "/api/mentorship?mentor=" + currentUser._id,
      {},
      token
    )
      .then((res: any) => {
        if (res.data.requests.length) {
          setMentoring(true);
          if ((res.data.requests[0].status = "progress")) {
            setMentor(res.data.requests[0]);
            setDateTime(res.data.requests[0].date_time);
          }
        }
      })
      .catch((e: any) => {
        console.log(e);
        toast.error("Something went wrong!");
      });
  }

  async function checkMentee() {
    requestHandler(
      "GET",
      "/api/mentorship?status=progress&&mentee=" + currentUser._id,
      {},
      token
    )
      .then((res: any) => {
        console.log(res.data.requests[0]);
        if (res.data.requests.length) {
          setMentor(res.data.requests[0]);
          setDateTime(res.data.requests[0].date_time);
        }
      })
      .catch((e: any) => {
        console.log(e);
        toast.error("Something went wrong!");
      });
  }

  const acceptedHandler = async () => {
    checkMentee();
  };

  useEffect(() => {
    if (!mentoring) fetchRequests();
  }, [mentoring]);

  useEffect(() => {
    if (!date_time) return;

    const targetTime = new Date();
    const [hours, minutes] = date_time.split(":");

    targetTime.setHours(hours);
    targetTime.setMinutes(minutes);
    targetTime.setSeconds(0);
    targetTime.setMilliseconds(0);

    const currentTime = new Date();
    console.log("hi");
    console.log(currentTime - targetTime);

    // Check if current time is less than half past the target time
    if (currentTime - targetTime < 1800000 && currentTime - targetTime >= 0) {
      console.log(currentTime - targetTime);
      setShowChat(true);
      return;
    }

    if (currentTime - targetTime < 1800000) {
      const remainingTime = new Date();
      remainingTime.setHours(hours);
      remainingTime.setMinutes(minutes);
      remainingTime.setSeconds(0);
      remainingTime.setMilliseconds(0);

      const timeDiff = (remainingTime as any) - (currentTime as any);
      const remainingHours = Math.floor(timeDiff / (1000 * 60 * 60));
      const remainingMinutes = Math.floor((timeDiff / (1000 * 60)) % 60);

      const remainingTimeString = `${remainingHours} hours ${remainingMinutes} minutes`;
      setRemainingTime(`Remaining time: ${remainingTimeString}` as any);
      setShowChat(false);
      return;
    }

    // Calculate the remaining time until 13:16 this day or next day
    const remainingTime = new Date();
    remainingTime.setDate(remainingTime.getDate() + 1);
    remainingTime.setHours(hours);
    remainingTime.setMinutes(minutes);
    remainingTime.setSeconds(0);
    remainingTime.setMilliseconds(0);

    const timeDiff = (remainingTime as any) - (currentTime as any);
    const remainingHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((timeDiff / (1000 * 60)) % 60);

    const remainingTimeString = `${remainingHours} hours ${remainingMinutes} minutes`;
    setRemainingTime(`Remaining time: ${remainingTimeString}` as any);
    setShowChat(false);
  }, [date_time]);

  useEffect(() => {
    if (!currentUser) return;
    getMentoringStatus();
    checkMentee();
  }, [currentUser]);

  if (mentor && !showChat && !mentor?.mentee)
    return (
      <>
        <Navbar />
        <div className="h-full w-full mt-52 flex justify-center items-center">
          {/* Render a beautiful UI showing the remaining time */}
          <Paper shadow="xs" style={{ textAlign: "center" }}>
            <Text size="md" weight={700} style={{ marginBottom: "10px" }}>
              No mentee has been assigned. Keep waiting!
            </Text>
          </Paper>
        </div>
      </>
    );

  if (mentor && !showChat)
    return (
      <>
        <Navbar />
        <div className="h-full w-full mt-52 flex justify-center items-center">
          {/* Render a beautiful UI showing the remaining time */}
          <Paper shadow="xs" style={{ textAlign: "center" }}>
            <Text size="md" weight={700} style={{ marginBottom: "10px" }}>
              {mentor.mentor._id == currentUser._id
                ? `Mentee: ${mentor.mentee.name}`
                : `Mentor: ${mentor.mentor.name}`}
            </Text>
            <Text size="lg" weight={500} style={{ marginBottom: "10px" }}>
              Chat will be available in:
            </Text>
            <Text size="xl" weight={700} color="blue">
              {remaining_time}
            </Text>
          </Paper>
        </div>
      </>
    );

  if (mentor && showChat)
    return (
      <>
        <Navbar />
        <div className="h-full w-full mt-52 flex justify-center items-center">
          {/* Render a beautiful UI showing the remaining time */}
          <Paper shadow="xs" style={{ textAlign: "center" }}>
            <Link
              href={`/chat/${
                currentUser?._id == mentor.mentor._id
                  ? mentor.mentee._id
                  : mentor.mentor._id
              }`}
            >
              <Text size="md" weight={700} style={{ marginBottom: "10px" }}>
                Go to Chat:{" "}
                {currentUser?._id == mentor.mentor._id
                  ? mentor.mentee.name
                  : mentor.mentor.name}
              </Text>
            </Link>
          </Paper>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="flex bg-off-white h-screen p-5 justify-center ">
        <div className=" bg-white rounded-xl border-solid border-gray-300 border w-1/3 pt-10">
          {requests &&
            requests.map((j: any, i: any) => {
              console.log(j);
              return (
                <MentorRequests
                  acceptedHandler={acceptedHandler}
                  key={i}
                  req={j}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Job;
