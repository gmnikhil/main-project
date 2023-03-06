import Image from "next/image"
import camera from "./../images/camera.png"
import edit from "./../images/edit.png"
import { useDisclosure } from '@mantine/hooks';
import { Menu,Modal,TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SimpleGrid } from '@mantine/core';
import { Space } from '@mantine/core';

function Profile()
{
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
          name: '',
          email: '',
        },
      });
    return(
        <div className="flex bg-beige w-full h-screen justify-center">
            <div className="bg-white mt-10 rounded-lg w-2/4">
                <div className="w-full bg-[url('./../images/profile.png')] bg-cover h-1/2 pt-48">                
                    <div className="flex justify-center items-center rounded-full w-60 h-60 bg-beige ml-10 ">
                        <Image src={camera} alt="camera image"  className="w-20 h-20"/>
                    </div>
                </div>
                 <div className="flex justify-end my-8 mx-8">
                  <button onClick={open}><Image src={edit} alt="edit pen image" className=" h-7 w-7 "/></button>
                  <Modal opened={opened} onClose={close} title="Edit Profile" size="70%">
                  <Box my={"xl"}>
                        <SimpleGrid cols={2} spacing="lg" >
                            <div>
                            <TextInput withAsterisk label=" First Name" placeholder="First Name"  />
                            </div>
                            <div>
                            <TextInput withAsterisk label="Last Name" placeholder="Last Name" />        
                            </div>          
                        </SimpleGrid>   
                        <Space h="xl" />
                        <SimpleGrid cols={2} spacing="lg" >
                            <div>
                            <TextInput withAsterisk label="Age" placeholder="Age"  />
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
                            <Button
                            color="red" className=" bg-red-500 text-md my-10">
                            Submit
                            </Button>
                        </Group>
        
                     </Box>
                  </Modal>                  
                 </div>
                 <div className="ml-10 ">
                    <p className="font-bold text-2xl font-gloock"> Name</p>
                    <p className="text-lg"> Heading</p>
                    <p className="text-gray-500 text-sm">Contact Info</p>
                    <SimpleGrid cols={7} spacing="xl" className="mt-7" >
                        <div >
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <Button color="red" className="bg-red-500 text-md rounded-3xl ">Open To</Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                <Menu.Item><strong>Finding a new Job</strong><br/> Show recruiters and others that you are open to work</Menu.Item>                               
                                <Menu.Item><strong>Hiring</strong><br/>Share that you are hiring and attract qualified candidates </Menu.Item>
                                <Menu.Item><strong>Mentoring</strong><br/>Showcase services you offer so that new clients can discover you </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>             
                        </div>
                        <div >
                            <Button color="red" variant="outline" className=" text-md rounded-3xl">Add Profile Section</Button>
                        </div>
                        <div>
                            <Button color="gray" variant="outline" className="text-md ml-20 rounded-3xl ">More</Button>
                        </div>
                    </SimpleGrid>
                 </div>
            </div>
           
        </div>
    )
}

export default Profile;