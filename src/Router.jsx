import { createBrowserRouter, Navigate } from "react-router-dom";
import Config from "./Config";
import Game from "./Game";
import { SceneProvider } from "./hooks/useScene";
import Data from "./Data";
const Router = createBrowserRouter([
  {
    path: "/game",
    element: <SceneProvider />,
    children: [{ path: "", element: <Game /> }],
  },
  // {
  //   path: "/data",
  //   element: <SceneProvider />,
  //   children: [{ path: "", element: <App /> }],
  // },
  {
    path: "/config",
    element: <SceneProvider />,
    children: [{ path: "", element: <Config /> }],
  },
  {
    path: "/data",
    element: <Data />,
  },
  {
    path: "*",
    element: <Navigate to='/config' />,
  },
]);

export default Router;
