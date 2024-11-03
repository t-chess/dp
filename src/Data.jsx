import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Globe from "./components/Data/Globe";
import { useEffect, useState } from "react";
import { DataProvider } from "./hooks/useData";

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
      <div>
        <label>Upload geoJSON:</label>
        <input type="file" />
      </div>
    </DataProvider>
  );
};

export default Data;
