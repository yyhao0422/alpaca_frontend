import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@mui/material";
import VideoUpload from "./VideoUpload";
import TextUpload from "./TextUpload";

function NewContent({ classroomId, sectionId, subSectionId, refresh }) {
  const [contentType, setContentType] = useState("");

  function handleChange(event) {
    setContentType(event.target.value);
  }

  return (
    <>
      <div className="flex flex-col mb-20">
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "30px" }}
        >
          What content you want for this subsection ?
        </Typography>
        <div className="flex justify-between items-center">
          <FormControl sx={{ width: "200px" }} fullWidth>
            <InputLabel id="demo-simple-select-label">Content Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={contentType}
              label="Content Type"
              onChange={handleChange}
            >
              <MenuItem value={"video"}>Video</MenuItem>
              <MenuItem value={"text"}>Text</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {contentType === "video" && (
        <VideoUpload
          classroomId={classroomId}
          sectionId={sectionId}
          subSectionId={subSectionId}
          refresh={() => refresh()}
        />
      )}
      {contentType === "text" && (
        <TextUpload
          classroomId={classroomId}
          sectionId={sectionId}
          subSectionId={subSectionId}
          refresh={() => refresh()}
        />
      )}
    </>
  );
}

export default NewContent;
