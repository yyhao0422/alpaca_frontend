import { useState, useRef } from "react";
import axios from "axios";

import { Button, Card } from "@mui/material";

function TextUpload({ classroomId, sectionId, subSectionId, refresh }) {
  const title = useRef();
  const description = useRef();

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      contentTitle: title.current.value,
      contentDescription: description.current.value,
      contentType: "text",
    };
    try {
      const res = await axios.put(
        ` https://jvfyvntgi3.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/classrooms/${classroomId}/${sectionId}/${subSectionId}?type=text`,
        data
      );
      if (res.status !== 200) {
        throw new Error("Failed to create content");
      }
    } catch (error) {
      setError(error.message || "Failed to create content");
    } finally {
      refresh();
    }

    console.log(data);
  }
  return (
    <div className="w-[750px]">
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: "100%", height: "100%" }}>
          <div className="flex flex-col">
            <input
              name="title"
              className="h-16 font-semibold text-[30px] p-3 focus:border-none focus:outline-none  "
              placeholder="Heading"
              ref={title}
              autoFocus={false}
              required
            ></input>
            <textarea
              name="description"
              ref={description}
              onInput={(e) => {
                e.target.style.height = "";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              className=" p-3  font-thin text-[20px] focus:border-none focus:outline-none"
              placeholder="Description"
              required
            ></textarea>
          </div>
        </Card>
        <div className="mt-3 flex justify-end">
          <Button type="submit" variant="contained">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TextUpload;
