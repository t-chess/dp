import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { DataProvider } from "./hooks/useData";
import UI from "./components/Data/UI";
import "./assets/Data.css";
import Layers from "./components/Data/Layers";
import Airports from "./components/Data/Airports";
import Flights from "./components/Data/Flights";
import Globe from "./components/Data/Globe";

const Data = () => {
  return (
    <DataProvider>
      <Canvas camera={{ position:[2,0,2], fov: 50 }}>
        <Globe />
        <Layers />
        <Airports />
        <Flights />
        <Stats />
        <OrbitControls />
        <ambientLight intensity={3} />
      </Canvas>
      <UI />
    </DataProvider>
  );
};

export default Data;