import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import { CircularProgress, Alert } from "@mui/material";

import ClassroomCard from "./components/ClassroomCard";

function Classroom() {
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchClassrooms() {
      setIsLoading(true);
      const token = await getToken();
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/v1/classrooms",
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
        setClassrooms(data.data.classrooms);
      } catch (error) {
        setError(
          error.message || "An error occurred while fetching classrooms!"
        );
      }
      setIsLoading(false);
    }

    fetchClassrooms();
  }, []);
  return (
    <div className="mx-48">
      {error && (
        <Alert sx={{ marginTop: "20px" }} severity="error">
          {error || "Unable to view classroom content !"}
        </Alert>
      )}
      {isLoading && (
        <div className="mt-10">
          <CircularProgress color="inherit" />
        </div>
      )}
      <div className="flex flex-wrap">
        {classrooms?.map((classroom) => {
          return <ClassroomCard data={classroom} key={classroom._id} />;
        })}
      </div>
    </div>
  );
}

export default Classroom;
