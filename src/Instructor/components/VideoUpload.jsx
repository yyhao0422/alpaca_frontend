import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import VideoUploadProgress from "./VideoUploadProgress";

function VideoUpload({ refresh, classroomId, sectionId, subSectionId }) {
  const [file, setFile] = useState({});
  const [uploadedFile, setUploadedFile] = useState({});
  const [showProgress, setShowProgress] = useState(false);
  const [error, setError] = useState("");
  const { getToken } = useAuth();

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const fileName =
      file.name.length > 12
        ? `${file.name.substring(0, 13)}... .${file.name.split(".")[1]}`
        : file.name;

    setFile({ name: fileName, loading: 0 });
    setShowProgress(true);
    const token = await getToken();
    try {
      const resClassroom = await axios.put(
        `http://127.0.0.1:3000/api/v1/classrooms/${classroomId}/${sectionId}/${subSectionId}?type=video`,
        {
          contentType: "video",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const key = resClassroom.data.data.subsection._id;
      const presignedUrl = await fetch(
        `http://127.0.0.1:3000/api/v1/files/upload-presign-url?key=${key}&fileType=video/mp4`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const presignedUrlData = await presignedUrl.json();
      const response = await axios.put(presignedUrlData.data.uploadURL, file, {
        headers: {
          "Content-Type": "video/mp4",
        },
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
      });
      console.log(response);
    } catch (err) {
      setError(err.message || "Fail to upload file");
      console.log(err.message || "Fail to upload file");
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
