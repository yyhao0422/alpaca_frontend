import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import VideoContent from "../components/VideoContent";
import TextContent from "../components/TextContent";
import { Card } from "@mui/material";
import NewContent from "../components/NewContent";

function Content() {
  const [subSection, setSubSection] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { id, sectionId, subSectionId } = useParams();
  const [refresh, setRefresh] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchClassroom() {
      setIsLoading(true);
      const token = await getToken();
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/v1/classrooms/" + id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("An error occurred while fetching classrooms!");
        }
        const classroom = data.data.classroom;
        if (classroom.sections) {
          const section = classroom.sections.find(
            (section) => section._id === sectionId
          );

          const subSection = section?.subsections.find(
            (subSection) => subSection._id === subSectionId
          );
          if (!section || !subSection) {
            setSubSection(null);
          } else {
            setSubSection(subSection);
          }
        }
      } catch (error) {
        setError(
          error.message || "An error occurred while fetching classrooms!"
        );
      }
      setIsLoading(false);
    }

    fetchClassroom();
  }, [id, sectionId, subSectionId, refresh]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && subSection ? (
        subSection.contentType ? (
          subSection.contentType === "video" ? (
            <Card>
              <VideoContent
                videoUrl={`https://alpaca-learning-bucket.s3.ap-southeast-1.amazonaws.com/${subSection._id}`}
              />
            </Card>
          ) : (
            <TextContent data={subSection} />
          )
        ) : (
          <NewContent
            classroomId={id}
            sectionId={sectionId}
            subSectionId={subSectionId}
            refresh={() => setRefresh((prev) => !prev)}
          />
        )
      ) : (
        <p>Select a section</p>
      )}
    </div>
  );
}

export default Content;
