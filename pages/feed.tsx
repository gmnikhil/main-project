import Post from "../components/post"

import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  Title,
  Divider
} from '@mantine/core';
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
} from '@tabler/icons-react';

import Link from "next/link";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,

    '&:not(:last-of-type)': {

    },
  },

  searchCode: {
    fontWeight: 700,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
   
    pointerEvents: 'none',
  },

  collections: {
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md}`,
    paddingRight: theme.spacing.md,
  },

  collectionLink: {
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
}));

const links = [
  { icon: IconAnalyze, label: 'Predict Career' },
  { icon: IconUserSearch, label: 'Connect With Others'},
  { icon: IconFileSearch, label: 'Job Search' },
  { icon: IconBook, label: 'Mentoring' },
  { icon: IconSettings, label: 'Settings' },
];

export function NavbarSearch() {
  const { classes } = useStyles();

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
    </UnstyledButton>
  ));

  
  return (
    <div className="flex flex-row bg-beige h-screen">
      <Navbar  width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className="flex justify-center">
        <div className='flex justify-center rounded-full w-40 h-40 bg-off-white mt-10 mb-8' >
        </div>
      </Navbar.Section>
      <Navbar.Section className="flex justify-center">
        <Title order={2} className=" font-josefin"> Hello Name</Title>
      </Navbar.Section>
      <Navbar.Section className='flex justify-center -mt-1 text-sm mb-5 text-red-600'>
        <Link href="./profile">View Profile</Link>
      </Navbar.Section>
      <Divider className='mb-10'/>


      <TextInput
        placeholder="Search"
        size="xs"
        icon={<IconSearch size="0.8rem" stroke={1.5} />}
        rightSectionWidth={70}
        styles={{ rightSection: { pointerEvents: 'none' } }}
        mb="sm"
      />

      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>
    </Navbar>
    <Post />
    </div>
    
  );
}
export default NavbarSearch;