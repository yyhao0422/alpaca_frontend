import { Outlet } from "react-router-dom";

import TopNavigationBar from "./Navigation Bar/topNavigationBar";
import DesktopWrapper from "./Wrapper/DesktopWrapper";

function WebLayout() {
  return (
    <>
      <DesktopWrapper />
      <TopNavigationBar />
      <Outlet />
    </>
  );
}

export default WebLayout;
