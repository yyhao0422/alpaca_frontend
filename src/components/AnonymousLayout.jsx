import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import DesktopWrapper from "./Wrapper/DesktopWrapper";
import AnonymousNavigationBar from "./NavigationBar/AnonymousNavigationBar";
import { useEffect } from "react";

function AnonymousLayout() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  // Redirect to home page if user is signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn]);

  return (
    <>
      <DesktopWrapper />
      <AnonymousNavigationBar />
      <Outlet />
    </>
  );
}

export default AnonymousLayout;
