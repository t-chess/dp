import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import Configurator from "./Configurator";
import Data from "./Data";
import Game from "./Game";
// import './index.css'

// pro build nastavit VITE_NODE_TYPE = config/data/game v .env 
const type = import.meta.env.VITE_NODE_TYPE;
const app = import.meta.env.MODE==="development"?<RouterProvider router={Router} />:type==="config"?<Configurator />:type==="data"?<Data /> : <Game />;

createRoot(document.getElementById("root")).render(app);
