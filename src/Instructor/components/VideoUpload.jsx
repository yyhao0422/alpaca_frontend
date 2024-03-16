import { useState } from "react";
import { Button } from "@mui/material";
import VideoUploadProgress from "./VideoUploadProgress";
import axios from "axios";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function VideoUpload({ refresh, classroomId, sectionId, subSectionId }) {
  const [file, setFile] = useState({});
  const [uploadedFile, setUploadedFile] = useState({});
  const [showProgress, setShowProgress] = useState(false);
  const [error, setError] = useState("");

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const fileName =
      file.name.length > 12
        ? `${file.name.substring(0, 13)}... .${file.name.split(".")[1]}`
        : file.name;
    const formData = new FormData();
    formData.append("file", file);
    setFile({ name: fileName, loading: 0 });
    setShowProgress(true);
    try {
      const response = await axios.put(
        ` https://jvfyvntgi3.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/classrooms/${classroomId}/${sectionId}/${subSectionId}?type=video`,
        formData,
        {
          onUploadProgress: ({ loaded, total }) => {
            setFile((prev) => ({
              ...prev,
              loading: Math.floor((loaded / total) * 100),
            }));
            if (loaded === total) {
              const fileSize =
                total < 1024
                  ? `${total} KB`
                  : `${(loaded / (1024 * 1024)).toFixed(2)} MB`;
              setUploadedFile({ name: fileName, size: fileSize });
              setShowProgress(false);
            }
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Fail to upload file");
      }
    } catch (err) {
      setError(err.message || "Fail to upload file");
    } finally {
      refresh();
    }
  }

  return (
    <>
      {(Object.keys(file).length !== 0 ||
        Object.keys(uploadedFile).length !== 0) && (
        <VideoUploadProgress
          showProgress={showProgress}
          uploadedFile={uploadedFile}
          file={file}
        />
      )}
      <div className="flex justify-center my-3 ml-5 mt-10">
        <label className="relative left-[-30px] m-3  w-32">Source Video:</label>
        <div className="flex  items-center w-[500px]">
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <input
              type="file"
              accept=".mp4,.mpeg,.wmv,.avi,.mov"
              name="videoFile"
              onChange={handleFileUpload}
              required
              hidden
            />
          </Button>
        </div>
      </div>
    </>
  );
}

export default VideoUpload;
