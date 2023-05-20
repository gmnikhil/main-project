import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import Navbar from '../components/Navbar';

function Predict() {
  
    const form = useForm({
    initialValues: {
      email: '',
      attribute1: '',
      attribute2: '',
      attribute3: '',
      attribute4: '',
      attribute5: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <>
    <Navbar />
    <div className='bg-beige h-screen pt-20'>
        <Box maw={300} mx="auto" >
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Attribute 1"
          placeholder=""
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Attribute 2"
          placeholder=""
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Attribute 3"
          placeholder=""
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Attribute 4"
          placeholder=""
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Attribute 5"
          placeholder=""
          {...form.getInputProps('email')}
        />
        <Group position="center" mt="md">
        <Button color="red" className=" bg-red-500 text-md my-10">
                  Predict
                </Button>
        </Group>
      </form>
    </Box>
    </div>
   </> 
  );
}
export default Predict;