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
import SendIcon from "@mui/icons-material/Send";

function NewContent({ refresh }) {
  const [contentType, setContentType] = useState("");
  const [uploadContent, setUploadContent] = useState(null);

  function handleChange(event) {
    setContentType(event.target.value);
  }
  if (uploadContent) {
    console.log("Content uploaded");
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
          {uploadContent && (
            <Button variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          )}
        </div>
      </div>
      {contentType === "video" && <VideoUpload refresh={() => refresh()} />}
      {contentType === "text" && <div>Text</div>}
    </>
  );
}

export default NewContent;
