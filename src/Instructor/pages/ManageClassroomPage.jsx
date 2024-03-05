import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import VideoContent from "../components/VideoContent";
import TextContent from "../components/TextContent";
import { Card } from "@mui/material";

function ManageClassroomPage() {
  const [contentData, setContentData] = useState({});
  const [classroomData, setClassroomData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { id, sectionId, subSectionId } = useParams();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchClassroom() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/v1/classrooms/" + id
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("An error occurred while fetching classrooms!");
        }
        const classroom = data.data.classroom;

        setClassroomData(classroom);
      } catch (error) {
        setError(
          error.message || "An error occurred while fetching classrooms!"
        );
      }
      setIsLoading(false);
    }

    fetchClassroom();
  }, [id]);

  useEffect(() => {
    if (classroomData.sections) {
      const section = classroomData.sections.find(
        (section) => section._id === sectionId
      );

      if (!section) {
        setContentData({});
      } else {
        const subSection = section.subsections.find(
          (subSection) => subSection._id === subSectionId
        );

        if (!subSection) {
          throw new Error("Subsection not found!");
        } else {
          setContentData(subSection);
        }
      }
    }
  }, [classroomData, sectionId, subSectionId]);

  console.log(classroomData);

  return (
    <div className="mx-48 flex mt-5 ">
      {isLoading && <p>Loading...</p>}
      {!isLoading && Object.keys(classroomData).length !== 0 && (
        <>
          <Sidebar />
          <div>
            {Object.keys(contentData).length === 0 ? (
              <p>Select a section</p>
            ) : contentData.contentType === "video" ? (
              <VideoContent videoUrl={contentData.contentURL} />
            ) : (
              <TextContent
                data={{
                  title: contentData.contentTitle,
                  description: contentData.contentDescription,
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ManageClassroomPage;
