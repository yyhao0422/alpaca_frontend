import { createBrowserRouter } from "react-router-dom";

import WebLayout from "../components/WebLayout.jsx";
import About from "../pages/About/About.jsx";

export const anonymousRouter = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [{ index: true, element: <About /> }],
  },
]);
