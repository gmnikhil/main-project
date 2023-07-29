import Image from "next/image";
import camera from "../../public/images/camera.png";
import { Button, Badge } from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import { Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import requestHandler from "../../utils/requestHandler";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

function PublicProfile() {
  const router = useRouter();

  const { currentUser, token, handleUserLogout, currentCompany } =
    useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState();
  const [qualification, setQualification] = useState();
  const [headline, setHeadline] = useState();
  const [cgpa, setCGPA] = useState();
  const [industry, setIndustry] = useState();
  const [phone, setPhone] = useState<number>();
  const [education, setEducation] = useState();
  const [honours, setHonours] = useState();
  const [projects, setProjects] = useState();
  const [work_profile, setWorkProfile] = useState();
  const [about, setAbout] = useState();
  const [avatar, setAvatar] = useState();
  const [banner, setBanner] = useState();
  const [mentorship, setMentorship] = useState<any>();
  const [following, setFollowing] = useState(false);

  // const logout = () => {
  //   handleUserLogout();
  //   router.push("/auth/login");
  // };

  const update = (user: any) => {
    console.log(user);
    setName(user.name);
    setUsername(user.username);
    setEmail(user.email);
    setSkills(user?.skills ? user.skills : []);
    setInterests(user?.interests ? user.interests : []);
    setAge(user.age);
    setGender(user.gender);
    setQualification(user.qualification);
    setHeadline(user.headline);
    setCGPA(user.cgpa);
    setIndustry(user.industry);
    setPhone(user.phone);
    setEducation(user.education);
    setHonours(user.honours);
    setProjects(user.projects);
    setWorkProfile(user.work_profile);
    setAbout(user.about);
    setAvatar(user.avatar);
    setBanner(user.banner);
  };

  const getProfile = async () => {
    requestHandler(
      "POST",
      "/api/user/details",
      { user_id: router.query.id },
      token
    )
      .then((res: any) => {
        update(res.data.user);
      })
      .catch((err: any) => console.log(err));

    requestHandler(
      "GET",
      "/api/mentorship?mentor=" + router.query.id,
      {},
      token
    )
      .then((res: any) => {
        if (res.data.requests.length) setMentorship(res.data.requests[0]);
      })
      .catch((e: any) => {
        console.log(e);
        toast.error("Something went wrong!");
      });
  };

  const getFollowing = async () => {
    requestHandler(
      "GET",
      `/api/feed/follow?entity=${router.query.id}&&follower=${
        currentUser ? currentUser._id : currentCompany._id
      }`,
      {},
      token
    )
      .then((res: any) => {
        console.log(res);
        if (res.data.fdocs.length) setFollowing(true);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleFollow = () => {
    if (!following) {
      requestHandler(
        "POST",
        "/api/feed/follow",
        {
          entity: router.query.id,
          follower: currentUser ? currentUser._id : currentCompany._id,
        },
        token
      )
        .then((res: any) => {
          setFollowing(true);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      requestHandler(
        "DELETE",
        `/api/feed/follow?entity=${router.query.id}&&follower=${
          currentUser ? currentUser._id : currentCompany._id
        }`,
        {},
        token
      )
        .then((res: any) => {
          setFollowing(false);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (!token || !router.query.id) return;
    getProfile();
    getFollowing();
  }, [token, router]);

  return (
    <>
      {(currentUser || currentCompany) && <Navbar />}
      <div className="flex bg-beige w-full justify-center flex-col ">
        <div className=" bg-white mt-10 rounded-lg mx-72 pb-6 -mb-5">
          <div
            className={`w-full relative bg-cover h-1/2 pt-48 pb-5`}
            style={{
              backgroundImage: `url(${
                banner ? banner : "https://picsum.photos/1400"
              })`,
            }}
          >
            {/* <div className="flex justify-center items-center rounded-full w-60 h-60 bg-beige ml-10 "> */}{" "}
            <Image
              src={avatar ? avatar : camera}
              alt="camera image"
              className="w-60 h-60 ml-10 rounded-full"
              width={280}
              height={280}
              style={{ objectFit: "cover" }}
            />
            {/* </div> */}
          </div>

          <div className="ml-10 mt-10">
            <p className="font-bold text-3xl font-josefin">{name}</p>
            <div className="flex gap-8 items-center">
              <div>
                <p className="text-lg">{username}</p>
                <p className="text-gray-500 text-sm">{email}</p>
              </div>
              <div className="flex gap-4">
                {mentorship?.status === "progress" && (
                  <Badge color="grape" variant="filled">
                    Mentoring
                  </Badge>
                )}
                {mentorship?.status === "pending" && (
                  <Badge color="cyan" variant="filled">
                    Open to Mentoring
                  </Badge>
                )}
                {following && (
                  <Badge color="lime" variant="filled">
                    following
                  </Badge>
                )}
              </div>
            </div>
            <SimpleGrid cols={12} spacing="xl" className="mt-7">
              <div>
                <Button
                  color="orange"
                  variant={following ? "filled" : "outline"}
                  className={`text-md rounded-3xl ${
                    following ? "bg-orange-500" : ""
                  }`}
                  onClick={handleFollow}
                >
                  {following ? "Unfollow" : "Follow"}
                </Button>
              </div>
            </SimpleGrid>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              About
            </Title>

            <p className="">{about || `--About--`}</p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Career
            </Title>

            <p className="">{work_profile || `--Career Details--`}</p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Honours
            </Title>

            <p className="">{honours || `--Honours--`}</p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Education
            </Title>

            <p className="">{education || `--Education Details--`}</p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Projects
            </Title>

            <p className="">{projects || `--Projects--`}</p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6 -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Skills
            </Title>

            <p className="">
              {skills?.length > 0 ? skills.join(", ") : `--Skills--`}
            </p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6 mb-9">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Interests
            </Title>

            <p className="">
              {interests?.length > 0 ? interests.join(", ") : `--Interests--`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicProfile;
