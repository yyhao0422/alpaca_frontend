import { Outlet } from "react-router-dom";

import DesktopWrapper from "./Wrapper/DesktopWrapper";
import AnonymousNavigationBar from "./NavigationBar/AnonymousNavigationBar";

function AnonymousLayout() {
  return (
    <>
      <DesktopWrapper />
      <AnonymousNavigationBar />
      <Outlet />
    </>
  );
}

export default AnonymousLayout;
