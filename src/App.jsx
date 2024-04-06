import { RouterProvider } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import SignedInPage from "./components/SignedInPage";
import { anonymousRouter } from "./router/anonymousRouter";

function App() {
  return (
    <>
      <SignedIn>
        <SignedInPage />
      </SignedIn>
      <SignedOut>
        <RouterProvider router={anonymousRouter} basename="/" />
      </SignedOut>
    </>
  );
}

export default App;
