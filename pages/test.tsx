import { Dropzone } from '@mantine/dropzone';

function Demo() {
  return (
    <Dropzone
      accept={{
        'image/*': [], // All images
        'text/html': ['.html', '.htm'],
      }}
    >
      {/* children */}
    </Dropzone>
  );
}
export default Demo;