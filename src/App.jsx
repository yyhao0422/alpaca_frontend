import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <>
      <RouterProvider router={router} basename="/" />
    </>
  );
}

export default App;
