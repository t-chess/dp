import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Globe from "./components/Data/Globe";
import { useEffect, useState } from "react";
import { DataProvider } from "./hooks/useData";
import UI from "./components/Data/UI";
import "./assets/Data.css";

const Data = () => {
  return (
    <DataProvider>
      <Canvas camera={{ position:[2,0,2], fov: 50 }}>
        <Globe />
        <Stats />
        <OrbitControls />
        <ambientLight />
        <color attach='background' args={["#121212"]} />
      </Canvas>
      <UI />
    </DataProvider>
  );
};

export default Data;
