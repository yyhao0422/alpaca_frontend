import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Typography, CircularProgress } from "@mui/material";

import ClassroomCard from "../components/ClassroomCard";

function Instructor() {
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchClassrooms() {
      setIsLoading(true);
      try {
        const response = await fetch(
          " https://jvfyvntgi3.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/classrooms"
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
      <div className="mt-10 flex justify-between">
        <Typography variant="h3">Classroom</Typography>

        <Link to="/instructor/classroom/create">
          <Button variant="contained">New Classroom</Button>
        </Link>
      </div>
      {isLoading && (
        <div className="mt-10">
          <CircularProgress color="inherit" />
        </div>
      )}
      {classrooms?.map((classroom) => {
        return <ClassroomCard data={classroom} key={classroom._id} />;
      })}
    </div>
  );
}

export default Instructor;
