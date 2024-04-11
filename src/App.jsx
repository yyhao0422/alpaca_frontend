import { RouterProvider } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import { router } from "./router/router";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  const pathname = window.location.pathname;

  if (!isLoaded) {
    return <h1>Loading at app.jsx ...</h1>;
  }

  // Redirect to new-user page if user is not signed in
  if (isLoaded && !isSignedIn && pathname === "/") {
    window.location.href = "/new-user";
    return <p>Redirecting...</p>;
  }

  return <RouterProvider router={router} basename="/" />;
}

export default App;
