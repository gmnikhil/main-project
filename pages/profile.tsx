import Image from "next/image";
import camera from "./../public/images/camera.png";
import edit from "./../public/images/edit.png";
import { useDisclosure } from "@mantine/hooks";
import { Menu, Modal, TextInput, Button, Group, Box } from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import { Space } from "@mantine/core";
import Link from "next/link";
import { Divider } from "@mantine/core";
import { Title } from "@mantine/core";
import { Text, useMantineTheme } from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconMessageForward,
  IconBookDownload,
} from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useContext, useEffect, useState } from "react";
import requestHandler from "../utils/requestHandler";
import { AuthContext } from "../context/authContext";
import { useRouter } from "next/router";
import Navbar from '../components/Navbar';

function Profile() {
  const router = useRouter();
  const [opened, handlers1] = useDisclosure(false);
  const [opened2, handlers2] = useDisclosure(false);
  const [opened3, handlers3] = useDisclosure(false);
  const theme = useMantineTheme();

  const { currentUser, token, handleUserLogout } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const logout = () => {
    handleUserLogout();
    router.push("/auth/login");
  };

  useEffect(() => {
    if (!token) return;
    requestHandler("GET", "/api/user/profile", {}, token)
      .then((res: any) => {
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setUsername(res.data.user.username);
      })
      .catch((err: any) => console.log(err));
  }, [token]);

  useEffect(() => {
    if (!currentUser) router.push("/auth/login");
  }, [currentUser]);

  return (
    <div className="flex bg-beige w-full justify-center flex-col ">
      <Navbar />
      <button onClick={logout}>Logout</button>
      <div className=" bg-white mt-10 rounded-lg mx-72 pb-6 -mb-5">
        <div className="w-full bg-[url('./../public/images/profile.png')] bg-cover h-1/2 pt-48 pb-5">
          <div className="flex justify-center items-center rounded-full w-60 h-60 bg-beige ml-10 ">
            <Image src={camera} alt="camera image" className="w-20 h-20" />
          </div>
        </div>
        <div className="flex justify-end my-8 mx-8">
          <button onClick={handlers1.open}>
            <Image src={edit} alt="edit pen image" className=" h-7 w-7 " />
          </button>
          <Modal
            opened={opened}
            onClose={handlers1.close}
            title="Edit Profile"
            size="70%"
          >
            <Box my={"xl"}>
              <SimpleGrid cols={2} spacing="lg">
                <div>
                  <TextInput
                    withAsterisk
                    label=" First Name"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <TextInput
                    withAsterisk
                    label="Last Name"
                    placeholder="Last Name"
                  />
                </div>
              </SimpleGrid>
              <Space h="xl" />
              <SimpleGrid cols={2} spacing="lg">
                <div>
                  <TextInput withAsterisk label="Age" placeholder="Age" />
                </div>
                <div>
                  <TextInput withAsterisk label="Gender" placeholder="Gender" />
                </div>
              </SimpleGrid>
              <Space h="xl" />
              <TextInput label="Headline" placeholder="Headline" />
              <Space h="xl" />
              <TextInput label="Contact Infomation" placeholder="Email" />
              <Space h="xl" />
              <TextInput label="Qualification" placeholder="Qualification" />
              <Space h="xl" />
              <TextInput label="Tech Skills" placeholder="Tech Skills" />
              <Space h="xl" />
              <TextInput label="Industry" placeholder="Industry" />

              <Space h="xl" />
              <TextInput label="Interests" placeholder="Interests" />
              <Space h="xl" />
              <TextInput label="CGPA" placeholder="CGPA" />

              <Group position="center" mt="xl">
                <Button color="red" className=" bg-red-500 text-md my-10">
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
                    <br /> Show recruiters and others that you are open to work
                  </Menu.Item>
                  <Menu.Item>
                    <strong>Hiring</strong>
                    <br />
                    Share that you are hiring and attract qualified candidates{" "}
                  </Menu.Item>
                  <Menu.Item>
                    <strong>Mentoring</strong>
                    <br />
                    Showcase services you offer so that new clients can discover
                    you{" "}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
            <div>
              <Modal opened={opened2} onClose={handlers2.close} size="50%">
                <Title order={3} className="mb-7">
                  Add Profile Section
                </Title>
                <Modal
                  opened={opened3}
                  onClose={handlers3.close}
                  className="p-80"
                  centered
                >
                  <Dropzone
                    onDrop={(files) => console.log("accepted files", files)}
                    onReject={(files) => console.log("rejected files", files)}
                    accept={IMAGE_MIME_TYPE}
                  >
                    <Group
                      position="center"
                      spacing="xl"
                      style={{ pointerEvents: "none" }}
                    >
                      <Dropzone.Accept>
                        <IconUpload
                          size="3.2rem"
                          stroke={1.5}
                          color={
                            theme.colors[theme.primaryColor][
                              theme.colorScheme === "dark" ? 4 : 6
                            ]
                          }
                        />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX
                          size="3.2rem"
                          stroke={1.5}
                          color={
                            theme.colors.red[
                              theme.colorScheme === "dark" ? 4 : 6
                            ]
                          }
                        />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconPhoto size="3.2rem" stroke={1.5} />
                      </Dropzone.Idle>

                      <div>
                        <Text size="xl" inline>
                          Drag images here or click to select files
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                          Attach as many files as you like, each file should not
                          exceed 5mb
                        </Text>
                      </div>
                    </Group>
                  </Dropzone>
                </Modal>
                <Link href="#" onClick={handlers3.open}>
                  <div className="text-gray-500">
                    <p>Add Profile Photo</p>
                  </div>
                </Link>
                <Divider my="sm" />
                <Link href="#">
                  <div className="text-gray-500">
                    <p>Add Education</p>
                  </div>
                </Link>
                <Divider my="sm" />
                <Link href="#">
                  <div className="text-gray-500">
                    <p>Add Position</p>
                  </div>
                </Link>
                <Divider my="sm" />
                <Link href="#">
                  <div className="text-gray-500">
                    <p>Add Career Break</p>
                  </div>
                </Link>
                <Divider my="sm" />
                <Link href="#">
                  <div className="text-gray-500">
                    <p>Add Profile Photo</p>
                  </div>
                </Link>
                <Divider my="sm" />
                <Link href="#">
                  <div className="text-gray-500">
                    <p>Add Skills</p>
                  </div>
                </Link>
                <Divider my="sm" />
                <Link href="#">
                  <div className="text-gray-500">
                    <p>Add Awards</p>
                  </div>
                </Link>
                <Divider my="sm" />
                <Link href="#">
                  <div className="text-gray-500">
                    <p>Add Projects</p>
                  </div>
                </Link>
                <Divider my="sm" className="mb-12" />
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
          </SimpleGrid>
        </div>
      </div>
      <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
        <div className=" ml-10 mt-7 text-justify pr-7">
          <Title order={3} className="font-josefin mb-2 ">
            About
          </Title>

          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
            tincidunt finibus metus. Aliquam erat volutpat. Donec est odio,
            suscipit id molestie vitae, ultricies eu nunc. Etiam turpis erat,
            scelerisque vel ornare vel, bibendum a nisl. Duis sit amet dolor
            nisl. Pellentesque vitae erat aliquam, elementum enim sed, dignissim
            elit. Praesent ante sem, tempor eu velit et, ornare euismod eros.
          </p>
        </div>
      </div>
      <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
        <div className=" ml-10 mt-7 text-justify pr-7">
          <Title order={3} className="font-josefin mb-2 ">
            Education
          </Title>

          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
            tincidunt finibus metus. Aliquam erat volutpat. Donec est odio,
            suscipit id molestie vitae, ultricies eu nunc. Etiam turpis erat,
            scelerisque vel ornare vel, bibendum a nisl. Duis sit amet dolor
            nisl. Pellentesque vitae erat aliquam, elementum enim sed, dignissim
            elit. Praesent ante sem, tempor eu velit et, ornare euismod eros.
          </p>
        </div>
      </div>
      <div className="bg-white mt-10 rounded-lg mx-72 pb-6 -mb-5">
        <div className=" ml-10 mt-7 text-justify pr-7">
          <Title order={3} className="font-josefin mb-2 ">
            Skills
          </Title>

          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
            tincidunt finibus metus. Aliquam erat volutpat. Donec est odio,
            suscipit id molestie vitae, ultricies eu nunc. Etiam turpis erat,
            scelerisque vel ornare vel, bibendum a nisl. Duis sit amet dolor
            nisl. Pellentesque vitae erat aliquam, elementum enim sed, dignissim
            elit. Praesent ante sem, tempor eu velit et, ornare euismod eros.
          </p>
        </div>
      </div>
      <div className="bg-white mt-10 rounded-lg mx-72 pb-6 mb-9">
        <div className=" ml-10 mt-7 text-justify pr-7">
          <Title order={3} className="font-josefin mb-2 ">
            Interests
          </Title>

          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere sapien quis ante ultrices tempus. Ut et ante mauris. Proin
            tincidunt finibus metus. Aliquam erat volutpat. Donec est odio,
            suscipit id molestie vitae, ultricies eu nunc. Etiam turpis erat,
            scelerisque vel ornare vel, bibendum a nisl. Duis sit amet dolor
            nisl. Pellentesque vitae erat aliquam, elementum enim sed, dignissim
            elit. Praesent ante sem, tempor eu velit et, ornare euismod eros.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
