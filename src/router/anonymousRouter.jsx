import { createBrowserRouter } from "react-router-dom";

import SuccessPaymentPage from "../pages/SuccessPaymentPage.jsx";
import AnonymousLayout from "../components/AnonymousLayout.jsx";
import About from "../pages/About/About.jsx";

export const anonymousRouter = createBrowserRouter([
  {
    path: "/",
    element: <AnonymousLayout />,
    children: [
      { index: true, element: <About /> },
      { path: "subscription/success", element: <SuccessPaymentPage /> },
    ],
  },
]);
