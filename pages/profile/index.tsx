import Image from "next/image";
import camera from "../../public/images/camera.png";
import edit from "../../public/images/edit.png";
import { useDisclosure } from "@mantine/hooks";
import {
  Menu,
  Modal,
  TextInput,
  Button,
  Group,
  Box,
  MultiSelect,
  NativeSelect,
  Textarea,
} from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import { Space } from "@mantine/core";
import { Title } from "@mantine/core";
import { IconMessageForward, IconBookDownload } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import requestHandler from "../../utils/requestHandler";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { DragAndDrop } from "../../components";
import { storeFile } from "../../utils/storeFile";

function Profile() {
  const router = useRouter();
  const [opened, handlers1] = useDisclosure(false);
  const [opened2, handlers2] = useDisclosure(false);
  const [opened3, handlers3] = useDisclosure(false);
  const [opened4, handlers4] = useDisclosure(false);

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

  // console.log(currentUser._id);

  const handleAvatarUpload = async (file: any) => {
    try {
      let url;
      if (file) {
        const res = await storeFile(file, "avatar", "avatar");

        if (!res.data) throw new Error(`Could'nt upload`);

        url =
          `https://ipfs.io/` +
          res.data.data.image.href.replace(":", "").replace("//", "/");
      }
      requestHandler(
        "PATCH",
        "/api/user/profile",
        {
          avatar: url,
        },
        token
      )
        .then((res: any) => {
          console.log(res);
          update(res.data.user);
        })
        .catch((err: any) => {
          console.log(err);
          throw new Error(`Could'nt upload`);
        });
    } catch (e) {
      toast.error("Couldnt update!");
    } finally {
      handlers3.close();
    }
  };

  const handleBannerUpload = async (file: any) => {
    try {
      let url;
      if (file) {
        const res = await storeFile(file, "banner", "banner");

        if (!res.data) throw new Error(`Could'nt upload`);

        url =
          `https://ipfs.io/` +
          res.data.data.image.href.replace(":", "").replace("//", "/");
      }
      requestHandler(
        "PATCH",
        "/api/user/profile",
        {
          banner: url,
        },
        token
      )
        .then((res: any) => {
          console.log(res);
          update(res.data.user);
        })
        .catch((err: any) => {
          console.log(err);
          throw new Error(`Could'nt upload`);
        });
    } catch (e) {
      toast.error("Couldnt update!");
    } finally {
      handlers4.close();
    }
  };

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

  const handleSectionSubmit = async () => {
    console.log({
      about,
      education,
      honours,
      projects,
      work_profile,
    });

    requestHandler(
      "PATCH",
      "/api/user/profile",
      {
        about,
        education,
        honours,
        projects,
        work_profile,
      },
      token
    )
      .then((res: any) => {
        console.log(res);
        update(res.data.user);
        handlers2.close();
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Could not update!");
      });
  };

  const handleInfoSubmit = async () => {
    console.log({
      name,
      username,
      email,
      skills,
      interests,
      age,
      gender,
      qualification,
      headline,
      cgpa,
      industry,
      phone,
    });
    requestHandler(
      "PATCH",
      "/api/user/profile",
      {
        email,
        skills: skills.map((s: any) => s.value).filter((v: any) => v != null),
        interests: interests
          .map((i: any) => i.value)
          .filter((v: any) => v != null),
        age,
        gender,
        qualification,
        headline,
        cgpa,
        industry,
        phone,
      },
      token
    )
      .then((res: any) => {
        console.log(res);
        update(res.data.user);
        handlers1.close();
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Could not update!");
      });
  };

  const getProfile = async () => {
    requestHandler("GET", "/api/user/profile", {}, token)
      .then((res: any) => {
        update(res.data.user);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (!token) return;
    getProfile();
  }, [token]);

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
                banner ? banner : "https://picsum.photos/1400"
              })`,
            }}
          >
            <Button
              onClick={handlers4.open}
              variant="filled"
              className="absolute right-5 bottom-5 bg-black"
            >
              Change
            </Button>
            {/* <div className="flex justify-center items-center rounded-full w-60 h-60 bg-beige ml-10 "> */}
            <button onClick={handlers3.open}>
              {" "}
              <Image
                src={avatar ? avatar : camera}
                alt="camera image"
                className="w-60 h-60 ml-10 rounded-full"
                width={280}
                height={280}
                style={{ objectFit: "cover" }}
              />
            </button>
            {/* </div> */}
          </div>
          <div className="flex justify-end my-8 mx-8">
            <button onClick={handlers1.open}>
              <Image src={edit} alt="edit pen image" className=" h-7 w-7 " />
            </button>
            <Modal
              opened={opened3}
              onClose={handlers3.close}
              className="p-80"
              centered
              title="Avatar"
            >
              <DragAndDrop handleFile={handleAvatarUpload} />
            </Modal>
            <Modal
              opened={opened4}
              onClose={handlers4.close}
              className="p-80"
              centered
              title="Banner"
            >
              <DragAndDrop handleFile={handleBannerUpload} />
            </Modal>
            <Modal
              opened={opened}
              onClose={handlers1.close}
              title="Edit Profile"
              size="70%"
            >
              <Box my={"xl"}>
                <Space h="xl" />
                <SimpleGrid cols={2} spacing="lg">
                  <div>
                    <TextInput
                      withAsterisk
                      label="Age"
                      placeholder="Age"
                      value={age}
                      type="number"
                      onChange={(e: any) => {
                        setAge(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <NativeSelect
                      data={["Male", "Female", "Trans", "Others"]}
                      label="Choose your gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      withAsterisk
                    />
                  </div>
                </SimpleGrid>
                <Space h="xl" />
                <TextInput
                  label="Headline"
                  placeholder="Headline"
                  value={headline}
                  onChange={(e: any) => {
                    setHeadline(e.target.value);
                  }}
                />
                <Space h="xl" />
                <TextInput
                  label="Contact Infomation"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                  type="number"
                />
                <TextInput
                  label="Email"
                  placeholder="email@somewhere.com"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  type="text"
                />
                <Space h="xl" />
                <TextInput
                  label="Qualification"
                  placeholder="Qualification"
                  value={qualification}
                  onChange={(e: any) => {
                    setQualification(e.target.value);
                  }}
                />
                <Space h="xl" />
                <MultiSelect
                  label="Skills"
                  data={skills}
                  defaultValue={skills}
                  placeholder="Enter your skills"
                  searchable
                  creatable
                  getCreateLabel={(query: any) => `+ Create ${query}`}
                  onCreate={(query: any) => {
                    const item = { value: query, label: query };
                    setSkills((current: any) => [...current, item] as any);
                    return item;
                  }}
                />
                <Space h="xl" />
                <TextInput
                  label="Industry"
                  placeholder="Industry"
                  value={industry}
                  onChange={(e: any) => {
                    setIndustry(e.target.value);
                  }}
                />

                <Space h="xl" />
                <MultiSelect
                  label="Interests"
                  data={interests}
                  defaultValue={interests}
                  placeholder="Enter your interests"
                  searchable
                  creatable
                  getCreateLabel={(query: any) => `+ Create ${query}`}
                  onCreate={(query: any) => {
                    const item = { value: query, label: query };
                    setInterests((current: any) => [...current, item] as any);
                    return item;
                  }}
                />
                <Space h="xl" />
                <TextInput
                  label="CGPA"
                  placeholder="CGPA"
                  value={cgpa}
                  onChange={(e: any) => setCGPA(e.target.value)}
                />

                <Group position="center" mt="xl">
                  <Button
                    color="red"
                    className=" bg-red-500 text-md my-10"
                    onClick={(e: any) => {
                      e.preventDefault();
                      handleInfoSubmit();
                    }}
                  >
                    Submit
                  </Button>
                </Group>
              </Box>
            </Modal>
          </div>
          <div className="ml-10 ">
            <p className="font-bold text-3xl font-josefin">{name}</p>
            <p className="text-lg">{username}</p>
            <p className="text-gray-500 text-sm">{email}</p>
            <SimpleGrid cols={9} spacing="xs" className="mt-7">
              <div>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button
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
              <div>
                <Modal opened={opened2} onClose={handlers2.close} size="50%">
                  <Title order={3} className="mb-7">
                    Add Profile Section
                  </Title>

                  <div className="text-gray-500">
                    <Textarea
                      value={about}
                      onChange={(e: any) => setAbout(e.target.value)}
                      placeholder="What kind of a person are you?"
                      label="Add About"
                      autosize
                      minRows={3}
                    />
                  </div>

                  <div className="text-gray-500 mt-5">
                    <Textarea
                      value={education}
                      onChange={(e: any) => setEducation(e.target.value)}
                      placeholder="Enter your education background"
                      label="Add Education"
                      autosize
                      minRows={3}
                    />
                  </div>

                  <div className="text-gray-500 mt-5">
                    <Textarea
                      value={work_profile}
                      onChange={(e: any) => setWorkProfile(e.target.value)}
                      placeholder="Enter your career details"
                      label="Add Work Profile"
                      autosize
                      minRows={3}
                    />
                  </div>

                  <div className="text-gray-500 mt-5">
                    <Textarea
                      value={honours}
                      onChange={(e: any) => setHonours(e.target.value)}
                      placeholder="Showcase your Prizes"
                      label="Add Honours"
                      autosize
                      minRows={3}
                    />
                  </div>

                  <div className="text-gray-500 mt-5">
                    <Textarea
                      value={projects}
                      onChange={(e: any) => setProjects(e.target.value)}
                      placeholder="Describe your Projects"
                      label="Add Projects"
                      autosize
                      minRows={3}
                    />
                  </div>
                  <div className="mt-5 flex justify-center">
                    <Button
                      variant="filled"
                      className="bg-red-400"
                      onClick={handleSectionSubmit}
                    >
                      Update
                    </Button>
                  </div>
                </Modal>
                <Button
                  color="red"
                  variant="outline"
                  className=" text-md rounded-3xl"
                  onClick={handlers2.open}
                >
                  Add Profile Section
                </Button>
              </div>
              <div>
                <Menu>
                  <Menu.Target>
                    <Button
                      color="gray"
                      variant="outline"
                      className="text-md ml-20 rounded-3xl "
                    >
                      More
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<IconMessageForward size={30} />}>
                      Send profile in a message
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item icon={<IconBookDownload size={30} />}>
                      Build A Resume
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
              <div>
                <Button
                  color="gray"
                  variant="outline"
                  className="text-md ml-16 rounded-3xl "
                  onClick={() => {
                    router.push(`/profile/${currentUser._id}`);
                  }}
                >
                  View Public Profile
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

            <p className="">
              {about ||
                `--Add About--`}
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
                `--Add Career Details--`}
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
                `--Add Honours--`}
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
                `--Add Education Details--`}
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
                `--Add Your Projects--`}
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
                : `--Add Your Skills--`}
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
                : `--Add Your Interests--`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
