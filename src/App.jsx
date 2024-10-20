import { KeyboardControls, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { useScene } from "./hooks/useScene";
import StartScene from "./scenes/StartScene";
import TestScene from "./scenes/TestScene";

const App = () => {
  const { mode, skydomeRadius, FOV } = useScene();
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas camera={{ position: [0.75, 1.5, 1.5], fov: FOV }} shadows>
        <Stats />
        <axesHelper />
        <gridHelper args={[1000, 1000, "white", "black"]} />
        {mode === "static" && skydomeRadius && (
          <OrbitControls maxDistance={skydomeRadius - 3} />
        )}
        {/* <StartScene /> */}
        <TestScene />
      </Canvas>
    </KeyboardControls>
  );
};

export default App;

// The X axis is red. The Y axis is green. The Z axis is blue.

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];
