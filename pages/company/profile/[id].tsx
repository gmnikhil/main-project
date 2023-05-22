import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import { useRouter } from "next/router";
import requestHandler from "../../../utils/requestHandler";
import {
  Button,
  Menu,
  Modal,
  SimpleGrid,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { storeFile } from "../../../utils/storeFile";
import { toast } from "react-toastify";
import Image from "next/image";
import camera from "../../../public/images/camera.png";
import edit from "../../../public/images/edit.png";
import Navbar from "../../../components/Navbar";
import { DragAndDrop } from "../../../components";

export default function CompanyProfile() {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [about, setAbout] = useState();
  const [work, setWork] = useState();
  const [environment, setEnvironment] = useState();
  const [avatar, setAvatar] = useState();
  const [banner, setBanner] = useState();

  const { currentCompany, token } = useContext(AuthContext);

  const update = (company: any) => {
    console.log(company);
    setName(company.name);
    setEmail(company.email);
    setAbout(company.about);
    setAvatar(company.avatar);
    setBanner(company.banner);
  };

  useEffect(() => {
    if (!token) return;
    requestHandler("GET", "/api/company/profile", {}, token)
      .then((res: any) => {
        update(res.data.company);
      })
      .catch((err: any) => console.log(err));
  }, [token]);

  useEffect(() => {
    if (!currentCompany) router.push("/company/login");
  }, [currentCompany]);

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
            {/* <p className="text-lg">{username}</p> */}
            <p className="text-gray-500 text-sm">{email}</p>
            <SimpleGrid cols={7} spacing="xl" className="mt-7">
              <div>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button
                      onClick={() => {}}
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
                `--Add About--`}
            </p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Work
            </Title>

            <p className="">
              {work ||
                `--Add Work Detials--`}
            </p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Environment
            </Title>

            <p className="">
              {environment ||
                `--Add Environment Details--`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
