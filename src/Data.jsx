import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { DataProvider } from "./hooks/useData";
import UI from "./components/Data/UI";
import "./assets/Data.css";
import Layers from "./components/Data/Layers";
import Airports from "./components/Data/Airports";
import Flights from "./components/Data/Flights";
import Globe from "./components/Data/Globe";
import { A11yAnnouncer } from "@react-three/a11y";

const Data = () => {
  return (
    <DataProvider>
      <Canvas camera={{ position:[2,0,2], fov: 50 }} fallback={"Sorry no WebGL supported!"} >
        <Globe />
        <Layers />
        <Airports />
        <Flights />
        <Stats />
        <ambientLight intensity={3} />
      </Canvas>
      <A11yAnnouncer />
      <UI />
    </DataProvider>
  );
};

export default Data;