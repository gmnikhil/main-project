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
  const [opened2, handlers2] = useDisclosure(false);
  const [opened3, handlers3] = useDisclosure(false);
  const [opened4, handlers4] = useDisclosure(false);

  const { currentCompany, token } = useContext(AuthContext);

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
        "/api/company/profile",
        {
          avatar: url,
        },
        token
      )
        .then((res: any) => {
          console.log(res);
          update(res.data.company);
        })
        .catch((err: any) => {
          console.log(err);
          throw Error(`Could'nt upload`);
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
        "/api/company/profile",
        {
          banner: url,
        },
        token
      )
        .then((res: any) => {
          console.log(res);
          update(res.data.company);
        })
        .catch((err: any) => {
          console.log(err);
          throw Error(`Could'nt upload`);
        });
    } catch (e) {
      toast.error("Couldnt update!");
    } finally {
      handlers4.close();
    }
  };

  const update = (company: any) => {
    console.log(company);
    setName(company.name);
    setEmail(company.email);
    setAbout(company.about);
    setAvatar(company.avatar);
    setBanner(company.banner);
    setEnvironment(company.environment);
    setWork(company.work);
  };

  const handleSectionSubmit = async () => {
    console.log({
      email,
      about,
      work,
      environment,
    });

    requestHandler(
      "PATCH",
      "/api/company/profile",
      {
        email,
        about,
        work,
        environment,
      },
      token
    )
      .then((res: any) => {
        console.log(res);
        update(res.data.company);
        handlers2.close();
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Could not update!");
      });
  };

  useEffect(() => {
    if (!token) return;
    requestHandler("GET", "/api/company/profile", {}, token)
      .then((res: any) => {
        update(res.data.company);
      })
      .catch((err: any) => console.log(err));
  }, [token]);

  // useEffect(() => {
  //   if (!currentCompany) router.push("/company/login");
  // }, [currentCompany]);

  return (
    <>
      <Navbar />
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
      <Modal opened={opened2} onClose={handlers2.close} size="50%">
        <Title order={3} className="mb-7">
          Add Profile Section
        </Title>

        <div className="text-gray-500 mt-5">
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
            value={work}
            onChange={(e: any) => setWork(e.target.value)}
            placeholder="Enter what kind of work your company does"
            label="Add Work"
            autosize
            minRows={3}
          />
        </div>

        <div className="text-gray-500 mt-5">
          <Textarea
            value={environment}
            onChange={(e: any) => setEnvironment(e.target.value)}
            placeholder="Describe about your company work environment"
            label="Add Environment"
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
      <div className="flex bg-beige w-full justify-center flex-col pb-10">
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
            <button onClick={handlers3.open}>
              {/* <div className="flex justify-center items-center rounded-full w-60 h-60 bg-beige ml-10 "> */}{" "}
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
            <button onClick={handlers2.open}>
              <Image src={edit} alt="edit pen image" className=" h-7 w-7 " />
            </button>
          </div>

          <div className="ml-10 mt-10">
            <p className="font-bold text-3xl font-josefin">{name}</p>
            {/* <p className="text-lg">{username}</p> */}
            <p className="text-gray-500 text-sm">{email}</p>
            <SimpleGrid cols={7} spacing="xl" className="mt-7">
              <div>
                <Button
                  color="gray"
                  variant="filled"
                  className="text-md rounded-3xl bg-black"
                  onClick={() => {
                    router.push(`/company/profile/${currentCompany._id}`);
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

            <p className="">{about || `--Add About--`}</p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Work
            </Title>

            <p className="">{work || `--Add Work Details--`}</p>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg mx-72 pb-6  -mb-5">
          <div className=" ml-10 mt-7 text-justify pr-7">
            <Title order={3} className="font-josefin mb-2 ">
              Environment
            </Title>

            <p className="">{environment || `--Add Environment Details--`}</p>
          </div>
        </div>
      </div>
    </>
  );
}
