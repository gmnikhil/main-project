import { Group, Text, useMantineTheme } from "@mantine/core";
import { Upload, Photo, X } from "tabler-icons-react";
import { Dropzone } from "@mantine/dropzone";

function ImageUploadIcon({ status, ...props }: { status: any }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

const dropzoneChildren = (status: any, theme: any) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 120, pointerEvents: "none" }}
  >
    <ImageUploadIcon status={status} />

    <div>
      <Text size="xl" inline>
        Drag image here or click to select file
      </Text>
      {/* <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text> */}
    </div>
  </Group>
);

export default function DropzoneWrapper({
  handleFile,
}: {
  handleFile: Function;
}) {
  const theme = useMantineTheme();
  return (
    <Dropzone
      onDrop={(files) => handleFile(files[0])}
      onReject={(files) => alert("file too large => rejected")}
      //maxSize={3 * 1024 ** 2}
      //accept={IMAGE_MIME_TYPE}
      multiple={false}
    >
      {dropzoneChildren(status, theme)}
    </Dropzone>
  );
}
