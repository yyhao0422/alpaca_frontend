import { createBrowserRouter } from "react-router-dom";

import Community from "./pages/Community/Community";
import Classroom from "./pages/Classroom/Classroom";
import About from "./pages/About/About";
import WebLayout from "./components/WebLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      { index: true, element: <Community /> },
      { path: "classroom", element: <Classroom /> },
      { path: "about", element: <About /> },
    ],
  },
]);
