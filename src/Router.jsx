import { createBrowserRouter, Navigate } from "react-router-dom";
import Configurator from "./Configurator";
import Game from "./Game";
import { SceneProvider } from "./hooks/useScene";
import Data from "./Data";
const Router = createBrowserRouter([
  {
    path: "/game",
    element: <SceneProvider />,
    children: [{ path: "", element: <Game /> }],
  },
  {
    path: "/configurator",
    element: <SceneProvider />,
    children: [{ path: "", element: <Configurator /> }],
  },
  {
    path: "/data",
    element: <Data />,
  },
  {
    path: "*",
    element: <Navigate to='/configurator' />,
  },
]);

export default Router;
