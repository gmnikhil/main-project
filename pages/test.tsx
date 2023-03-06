import { Menu, Button, Text } from '@mantine/core';

function Demo() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button color="red" className="bg-red-500 text-md rounded-3xl ">Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item >Settings</Menu.Item>
        <Menu.Item >Messages</Menu.Item>
        <Menu.Item >Gallery</Menu.Item>
        <Menu.Item >Transfer my data</Menu.Item>
        <Menu.Item color="red" >Delete my account</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Demo;