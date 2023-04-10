import Link from 'next/link';
import { Button } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { FaHome } from 'react-icons/fa';

function navbar()  {
  const theme = useMantineTheme();
  
  return (
    <nav className={`bg-${theme.colors.gray[9]} py-4 px-8 flex items-center justify-between`}>
      <div className="flex items-center">
        <Link href="/">
          <a className="text-lg font-bold text-white flex items-center space-x-2">
            <FaHome />
            <span>My Website</span>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/about">
          <Button component="a" variant="light" className="text-gray-300 hover:text-white">
            About
          </Button>
        </Link>
        <Link href="/contact">
          <Button component="a" variant="light" className="ml-4 text-gray-300 hover:text-white">
            Contact
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default navbar;
