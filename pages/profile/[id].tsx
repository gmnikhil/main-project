import Image from "next/image";
import camera from "../../public/images/camera.png";
import { Menu, Button } from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import { Title } from "@mantine/core";
import { IconMessageForward, IconBookDownload } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import requestHandler from "../../utils/requestHandler";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

function PublicProfile() {
  const router = useRouter();

  const { currentUser, token, handleUserLogout } = useContext(AuthContext);

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
  };

  useEffect(() => {
    if (!token || !router.query.id) return;
    getProfile();
  }, [token, router]);

  useEffect(() => {
    if (!currentUser) router.push("/auth/login");
  }, [currentUser]);

  return (
    <>
      <Navbar />
      <div className="flex bg-beige w-full justify-center flex-col ">
        <div className=" bg-white mt-10 rounded-lg mx-72 pb-6 -mb-5">
          <div
            className={`w-full relative bg-cover h-1/2 pt-48 pb-5`}
            style={{
              backgroundImage: `url(${
                banner ? banner : "../../public/images/profile.png"
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
            <p className="text-lg">{username}</p>
            <p className="text-gray-500 text-sm">{email}</p>
            <SimpleGrid cols={7} spacing="xl" className="mt-7">
              <div>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button
                      onClick={() => {
                        router.push("/chat/list");
                      }}
                      color="red"
                      className="bg-red-500 text-md rounded-3xl "
                    >
                      Open To
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>
                      <strong>Finding a new Job</strong>
                      <br /> Show recruiters and others that you are open to
                      work
                    </Menu.Item>
                    <Menu.Item>
                      <strong>Hiring</strong>
                      <br />
                      Share that you are hiring and attract qualified candidates{" "}
                    </Menu.Item>
                    <Menu.Item>
                      <strong>Mentoring</strong>
                      <br />
                      Showcase services you offer so that new clients can
                      discover you{" "}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </SimpleGrid>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              About
            </Title>

            <p className="">
              {about ||
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
            tincidunt finibus metus. Aliquam erat volutpat. Donec est odio,
            suscipit id molestie vitae, ultricies eu nunc. Etiam turpis erat,
            scelerisque vel ornare vel, bibendum a nisl. Duis sit amet dolor
            nisl. Pellentesque vitae erat aliquam, elementum enim sed, dignissim
            elit. Praesent ante sem, tempor eu velit et, ornare euismod eros.`}
            </p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Career
            </Title>

            <p className="">
              {work_profile ||
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
            tincidunt finibus metus. Aliquam erat volutpat. Donec est odio,
            suscipit id molestie vitae, ultricies eu nunc. Etiam turpis erat,
            scelerisque vel ornare vel, bibendum a nisl. Duis sit amet dolor
            nisl. Pellentesque vitae erat aliquam, elementum enim sed, dignissim
            elit. Praesent ante sem, tempor eu velit et, ornare euismod eros.`}
            </p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Honours
            </Title>

            <p className="">
              {honours ||
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
            tincidunt finibus metus. Aliquam erat volutpat. Donec est odio,
            suscipit id molestie vitae, ultricies eu nunc. Etiam turpis erat,
            scelerisque vel ornare vel, bibendum a nisl. Duis sit amet dolor
            nisl. Pellentesque vitae erat aliquam, elementum enim sed, dignissim
            elit. Praesent ante sem, tempor eu velit et, ornare euismod eros.`}
            </p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Education
            </Title>

            <p className="">
              {education ||
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
            tincidunt finibus metus. Aliquam erat volutpat. Donec est odio,
            suscipit id molestie vitae, ultricies eu nunc. Etiam turpis erat,
            scelerisque vel ornare vel, bibendum a nisl. Duis sit amet dolor
            nisl. Pellentesque vitae erat aliquam, elementum enim sed, dignissim
            elit. Praesent ante sem, tempor eu velit et, ornare euismod eros.`}
            </p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Projects
            </Title>

            <p className="">
              {projects ||
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
            tincidunt finibus metus. Aliquam erat volutpat. Donec est odio,
            suscipit id molestie vitae, ultricies eu nunc. Etiam turpis erat,
            scelerisque vel ornare vel, bibendum a nisl. Duis sit amet dolor
            nisl. Pellentesque vitae erat aliquam, elementum enim sed, dignissim
            elit. Praesent ante sem, tempor eu velit et, ornare euismod eros.`}
            </p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6 -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Skills
            </Title>

            <p className="">
              {skills?.length > 0
                ? skills.join(", ")
                : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
            tincidunt finibus metus. Aliquam erat volutpat. Donec est odio,
            suscipit id molestie vitae, ultricies eu nunc. Etiam turpis erat,
            scelerisque vel ornare vel, bibendum a nisl. Duis sit amet dolor
            nisl. Pellentesque vitae erat aliquam, elementum enim sed, dignissim
            elit. Praesent ante sem, tempor eu velit et, ornare euismod eros.`}
            </p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6 mb-9">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Interests
            </Title>

            <p className="">
              {interests?.length > 0
                ? interests.join(", ")
                : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
            tincidunt finibus metus. Aliquam erat volutpat. Donec est odio,
            suscipit id molestie vitae, ultricies eu nunc. Etiam turpis erat,
            scelerisque vel ornare vel, bibendum a nisl. Duis sit amet dolor
            nisl. Pellentesque vitae erat aliquam, elementum enim sed, dignissim
            elit. Praesent ante sem, tempor eu velit et, ornare euismod eros.`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicProfile;
