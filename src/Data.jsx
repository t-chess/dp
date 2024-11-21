import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { DataProvider } from "./hooks/useData";
import UI from "./components/Data/UI";
import "./assets/Data.css";
import Layers from "./components/Data/Layers";
import Airports from "./components/Data/Airports";
import Flights from "./components/Data/Flights";

const Data = () => {
  const radius = 1;
  return (
    <DataProvider radius={radius}>
      <Canvas camera={{ position:[2,0,2], fov: 50 }}>
        <group>
          <mesh>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshStandardMaterial color={0x222222} wireframe={false} />
          </mesh>
          <Layers />
          <Airports />
          <Flights />
        </group>
        <Stats />
        <OrbitControls />
        <ambientLight />
        <color attach='background' args={["#1a060f"]} />
      </Canvas>
      <UI />
    </DataProvider>
  );
};

export default Data;