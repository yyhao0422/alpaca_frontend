import DesktopWrapper from "./components/Wrapper/DesktopWrapper";
import TopNavigationBar from "./components/Navigation Bar/topNavigationBar";

function App() {
  return (
    <>
      <DesktopWrapper />
      <TopNavigationBar />
      <h1 className="text-blue-700 m-4">Hello World !</h1>
    </>
  );
}

export default App;
