import { useState, createElement, useEffect } from "react";
import { useBlocker, redirect } from "react-router-dom";
import axios from "axios";

import { Typography, Card, TextField, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LinearProgress from "@mui/material/LinearProgress";

function CreateClassroomPage() {
  const [file, setFile] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Alert user from leaving the page

  let blocker = useBlocker((transition) => {
    if (
      !window.confirm(
        "Your new classroom will be discard when leaving this page!"
      )
    ) {
      transition.retry();
    }
  }, []);
  console.log(blocker);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", event.target[0].value);
    formData.append("description", event.target[2].value);
    formData.append("classroomImage", file);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/classrooms",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (!response.ok) {
        throw new Error(
          "An error occurred while creating classroom! Please try again."
        );
      }
      window.location.href = "/instructor";
      blocker.proceed();
    } catch (error) {
      setError(
        error || "An error occurred while creating classroom! Please try again."
      );
      window.location.href = "/instructor";
      blocker.proceed();
    }
    setIsLoading(false);
  }

  const handleFileUpload = (event) => {
    let image_file = event.target.files[0];

    //display image
    let reader = new FileReader();
    reader.readAsDataURL(image_file);
    reader.onload = (event) => {
      let image_url = event.target.result;
      let img = createElement("img", { src: image_url, alt: "classroom" });
      setImage(img);
    };

    setFile(image_file);
  };

  return (
    <div className="mx-48">
      <Card
        sx={{ marginTop: "50px", display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", margin: "25px 0 25px 0" }}
        >
          Create Classroom
        </Typography>
        <ArrowBackIosIcon
          variant="contained"
          sx={{
            position: "absolute",
            top: "190px",
            left: "210px",
            cursor: "pointer",
          }}
          onClick={() => window.history.back()}
        />

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex justify-center my-3">
            <label
              className="relative left-[-30px] m-3 w-32"
              htmlFor="classroomTitle"
            >
              Title :
            </label>
            <TextField
              sx={{ width: "500px" }}
              id="classroomTitle"
              label="Classroom title"
              variant="outlined"
              required
            />
          </div>
          <div className="flex justify-center my-3">
            <label
              className="relative left-[-30px] m-3  w-32"
              htmlFor="classroomDescription"
            >
              Description :
            </label>
            <TextField
              sx={{ width: "500px" }}
              id="classroomDescription"
              label="Classroom Description"
              variant="outlined"
              rows="5"
              multiline
              required
            />
          </div>
          <div className="flex justify-center my-3">
            <label className="relative left-[-30px] m-3  w-32">
              Classroom Image:
            </label>
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
                  accept="jpeg jpg png"
                  name="classroomImage"
                  onChange={handleFileUpload}
                  required
                  hidden
                />
              </Button>
              <Typography
                variant="caption"
                sx={{ marginLeft: "10px", color: "#6c757d" }}
              >
                {file.name}
              </Typography>
            </div>
          </div>

          {image ? (
            <div className="w-fill flex justify-center">
              <Card
                sx={{
                  width: "690px",
                  padding: "20px",
                }}
              >
                {image}
              </Card>
            </div>
          ) : null}
          <div className="flex flex-col items-center my-5">
            {isLoading && (
              <Box sx={{ width: "690px", marginBottom: "5px" }}>
                <LinearProgress color="success" />
              </Box>
            )}
            <Button
              variant="contained"
              sx={{ width: "690px" }}
              endIcon={<SendIcon />}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default CreateClassroomPage;
