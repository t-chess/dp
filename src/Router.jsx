import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { SceneProvider } from "./hooks/useScene";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <SceneProvider />,
    children: [{ path: "", element: <App /> }],
  },
]);

export default Router;
