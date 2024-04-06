import { createBrowserRouter } from "react-router-dom";

import Community from "../pages/Community/Community.jsx";
import Classrooms from "../pages/Classroom/Classrooms.jsx";
import ClassroomPage from "../pages/Classroom/ClassroomPage.jsx";
import About from "../pages/About/About.jsx";
import WebLayout from "../components/WebLayout.jsx";
import Instructor from "../Instructor/pages/Instructor.jsx";
import CreateClassroomPage from "../Instructor/pages/CreateClassroomPage.jsx";
import ManageClassroomPage from "../Instructor/pages/ManageClassroomPage.jsx";
import SuccessPaymentPage from "../pages/SuccessPaymentPage.jsx";

export const signedInRouter = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      { index: true, element: <Community /> },
      { path: "classroom", element: <Classrooms /> },
      { path: "classroom/:id", element: <ClassroomPage /> },
      { path: "about", element: <About /> },
      { path: "subscription/success", element: <SuccessPaymentPage /> },
      { path: "instructor", element: <Instructor /> },
      {
        path: "instructor/classroom/create",
        element: <CreateClassroomPage />,
      },
      {
        path: "instructor/classroom/manage/:id/:sectionId/:subSectionId",
        element: <ManageClassroomPage />,
      },
    ],
  },
]);
