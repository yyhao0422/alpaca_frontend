import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useSession, SignedIn, SignedOut } from "@clerk/clerk-react";

import { SessionContext } from "./store/SessionContext";

import { signedInRouter } from "./router/signedInRouter";
import { anonymousRouter } from "./router/anonymousRouter";
import LoadingBackdrop from "./utils/LoadingBackdrop";

function App() {
  const { isLoaded, session } = useSession();
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsLoadingSession(false);
    }
  }, [isLoaded]);

  return (
    <SessionContext.Provider
      value={{
        session,
      }}
    >
      {isLoadingSession && <LoadingBackdrop />}
      {!isLoadingSession && (
        <>
          <SignedIn>
            <RouterProvider router={signedInRouter} basename="/" />
          </SignedIn>
          <SignedOut>
            <RouterProvider router={anonymousRouter} basename="/" />
          </SignedOut>
        </>
      )}
    </SessionContext.Provider>
  );
}

export default App;
