import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useUserContext } from "../../utils/useUserContext";

import { Button, Typography, CircularProgress, Alert } from "@mui/material";

import ClassroomCard from "../components/ClassroomCard";

function Instructor() {
  const { getToken } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { session } = useUserContext();

  useEffect(() => {
    function validateAdmin() {
      const isAdmin = session.user.publicMetadata.admin ? true : false;

      if (!isAdmin) {
        console.log("Unauthorised action !");
        setError("Unauthorised action !");
        return false;
      }
      return true;
    }

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
    const isAdmin = validateAdmin();
    if (isAdmin) fetchClassrooms();
  }, []);

  if (error) {
    return (
      <div className="mx-48">
        <Alert sx={{ marginTop: "20px" }} severity="error">
          {error}
        </Alert>
      </div>
    );
  }

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
