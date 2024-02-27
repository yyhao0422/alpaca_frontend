import { createBrowserRouter } from "react-router-dom";

import Community from "./pages/Community/Community";
import Classroom from "./pages/Classroom/Classroom";
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
      { path: "classroom", element: <Classroom /> },
      { path: "about", element: <About /> },
      { path: "instructor", element: <Instructor /> },
      {
        path: "instructor/classroom/create",
        element: <CreateClassroomPage />,
      },
      {
        path: "instructor/classroom/manage/:id",
        element: <ManageClassroomPage />,
      },
    ],
  },
]);
