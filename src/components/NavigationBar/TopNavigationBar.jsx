import NavigationPanel from "./components/NavigationPanel";
import TopBar from "./components/TopBar";

function TopNavigationBar() {
  return (
    <div className="w-screen position sticky bg-white  ">
      <TopBar />
      <NavigationPanel />
    </div>
  );
}

export default TopNavigationBar;
