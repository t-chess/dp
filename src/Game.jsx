import { KeyboardControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import Player from "./components/Game/Player";
import Map from "./components/Game/Map";
import Forest from "./components/Game/Forest";
import Playground from "./components/Game/Playground";

const Game = () => {
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas shadows>
        <Stats />
        <ambientLight intensity={1} />
        <directionalLight />
        <Suspense>
          <Physics debug gravity={[0, -9.81, 0]}>
            <Map />
            <Playground />
            {/* <Forest /> */}
            <Player />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
};

export default Game;

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] }
];
