import { createBrowserRouter, Navigate } from "react-router-dom";
import Configurator from "./Configurator";
import Game from "./Game";
import Data from "./Data";
const Router = createBrowserRouter([
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/configurator",
    element: <Configurator />
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
