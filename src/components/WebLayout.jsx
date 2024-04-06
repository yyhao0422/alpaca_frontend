import { Outlet } from "react-router-dom";
import { useUserContext } from "../utils/useUserContext";

import TopNavigationBar from "./NavigationBar/TopNavigationBar";
import DesktopWrapper from "./Wrapper/DesktopWrapper";
import AnonymousNavigationBar from "./NavigationBar/AnonymousNavigationBar";

function WebLayout() {
  const { subscriptionDetails } = useUserContext();
  return (
    <>
      <DesktopWrapper />
      {subscriptionDetails?.status === "active" ? (
        <TopNavigationBar />
      ) : (
        <AnonymousNavigationBar />
      )}
      <Outlet />
    </>
  );
}

export default WebLayout;
