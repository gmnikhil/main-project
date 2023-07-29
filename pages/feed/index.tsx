import Post from "../../components/post";

import {
  createStyles,
  Navbar as Sidebar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  Title,
  Divider,
  Button,
} from "@mantine/core";
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
  IconPlus,
  IconSelector,
  IconAnalyze,
  IconUserSearch,
  IconFileSearch,
  IconBook,
  IconSettings,
} from "@tabler/icons-react";
import React, { useState, useEffect, useContext } from "react";
import AddPostModal from "./modals/addPostModal";
import Link from "next/link";
import requestHandler from "../../utils/requestHandler";
import { AuthContext } from "../../context/authContext";
import Navbar from "../../components/Navbar";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
    zIndex: 0,
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {},
  },

  searchCode: {
    fontWeight: 700,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,

    pointerEvents: "none",
  },

  collections: {
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md}`,
    paddingRight: theme.spacing.md,
  },

  collectionLink: {
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

const links = [
  { icon: IconAnalyze, label: "Predict Career" },
  { icon: IconUserSearch, label: "Connect With Others" },
  { icon: IconFileSearch, label: "Job Search" },
  { icon: IconBook, label: "Mentoring" },
];

export function SidebarSearch() {
  const { classes } = useStyles();
  const [post_upload_modal_opened, setPostUploadModalOpened] =
    useState<boolean>(false);

  const [posts, setPosts] = useState<any>([]);

  const [searching, setSearching] = useState<string>();
  const [searchedPosts, setSearchedPosts] = useState<any>([]);

  const { currentUser, token, currentCompany } = useContext(AuthContext);

  const [user, setUser] = useState<any>();

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
    </UnstyledButton>
  ));

  const closePostUploadModal = () => {
    setPostUploadModalOpened(false);
  };

  async function fetchPosts() {
    requestHandler("GET", "/api/feed/post", {}, token)
      .then((res: any) => {
        setPosts(res.data.posts);
        console.log(posts);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  const getProfile = async () => {
    if (currentUser)
      requestHandler(
        "POST",
        "/api/user/details",
        { user_id: currentUser._id },
        token
      )
        .then((res: any) => {
          setUser(res.data.user);
        })
        .catch((err: any) => console.log(err));
    else
      requestHandler(
        "POST",
        "/api/company/details",
        { company_id: currentCompany._id },
        token
      )
        .then((res: any) => {
          setUser(res.data.company);
        })
        .catch((err: any) => console.log(err));
  };

  const handleSearch = (e: any) => {
    setSearching(e.target.value);
    if (!e.target.value) {
      setSearchedPosts([]);
      return;
    }
    let x = e.target.value?.replace(" ", "#");

    requestHandler("GET", "/api/feed/search?search=" + x, {}, token)
      .then((res: any) => {
        setSearchedPosts(res.data.posts);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      getProfile();
      fetchPosts();
    }
  }, [token]);

  return (
    <>
      <Navbar className="fixed w-full bg-white" />
      {post_upload_modal_opened && (
        <AddPostModal
          open={post_upload_modal_opened}
          handleClose={closePostUploadModal}
          handleUpdate={fetchPosts}
        />
      )}
      <Sidebar
        width={{ sm: 300 }}
        p="md"
        className={classes.navbar + " fixed"}
        style={{ height: "95%" }}
      >
        <Sidebar.Section className="flex justify-center">
          <div
            className="flex bg-cover bg-center justify-center rounded-full w-40 h-40 bg-off-white mt-10 mb-8"
            style={{
              backgroundImage: `url(${
                user ? user.avatar : "https://picsum.photos/1400"
              })`,
            }}
          ></div>
        </Sidebar.Section>
        <Sidebar.Section className="flex justify-center">
          <Title order={2} className=" font-josefin">
            {" "}
            {user ? user.name : "Loading..."}
          </Title>
        </Sidebar.Section>
        <Sidebar.Section className="flex justify-center -mt-1 text-sm mb-5 text-red-600">
          <Link href={currentUser ? "/profile" : "/company/profile"}>
            View Profile
          </Link>
        </Sidebar.Section>
        <Divider className="mb-10" />

        <TextInput
          placeholder="Search"
          size="xs"
          icon={<IconSearch size="0.8rem" stroke={1.5} />}
          rightSectionWidth={70}
          styles={{ rightSection: { pointerEvents: "none" } }}
          onChange={handleSearch}
          mb="sm"
        />
        <Sidebar.Section className={classes.section + " flex justify-center"}>
          <Button
            className="mt-10 mb-3 bg-blue-400"
            variant="filled"
            color="blue"
            onClick={() => {
              setPostUploadModalOpened(true);
            }}
          >
            Create Post
          </Button>
        </Sidebar.Section>
        {/* <Sidebar.Section className={classes.section}>
          <div className={classes.mainLinks}>{mainLinks}</div>
        </Sidebar.Section> */}
      </Sidebar>
      <div className="flex flex-row bg-beige -z-30 pt-20">
        <div className={"flex flex-col w-full items-center"}>
          {searching
            ? searchedPosts &&
              searchedPosts.map((post: any, i: any) => {
                return <Post post={post} />;
              })
            : posts &&
              posts.map((post: any, i: any) => {
                return <Post post={post} />;
              })}
        </div>
      </div>
    </>
  );
}
export default SidebarSearch;
