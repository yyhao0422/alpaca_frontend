import { createBrowserRouter } from "react-router-dom";

import Community from "./pages/Community/Community";
import Classrooms from "./pages/Classroom/Classrooms.jsx";
import ClassroomPage from "./pages/Classroom/ClassroomPage";
import About from "./pages/About/About";
import WebLayout from "./components/WebLayout";
import Instructor from "./Instructor/pages/Instructor.jsx";
import CreateClassroomPage from "./Instructor/pages/CreateClassroomPage";
import ManageClassroomPage from "./Instructor/pages/ManageClassroomPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      { index: true, element: <Community /> },
      { path: "classroom", element: <Classrooms /> },
      { path: "classroom/:id", element: <ClassroomPage /> },
      { path: "about", element: <About /> },
      { path: "instructor", element: <Instructor /> },
      {
        path: "instructor/classroom/create",
        element: <CreateClassroomPage />,
      },
      {
        path: "instructor/classroom/manage/:id/:subSectionId",
        element: <ManageClassroomPage />,
      },
    ],
  },
]);
