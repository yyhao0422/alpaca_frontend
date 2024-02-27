import { useParams, useLocation } from "react-router-dom";
import { Card, Typography } from "@mui/material";

import Sidebar from "../components/Sidebar";

function ManageClassroomPage() {
  const { id } = useParams();
  let location = useLocation();

  const classroomData = location.state.classroomData;
  console.log(classroomData);

  return (
    <div className="mx-48 flex mt-5 ">
      <Sidebar classroomData={classroomData} />
      <div>
        <Card>Content</Card>
      </div>
    </div>
  );
}

export default ManageClassroomPage;
