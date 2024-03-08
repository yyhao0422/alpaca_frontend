import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Typography, CircularProgress } from "@mui/material";

import ClassroomCard from "./components/ClassroomCard";

function Classroom() {
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchClassrooms() {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/classrooms");
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
