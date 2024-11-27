import { KeyboardControls, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import Player from "./components/Game/Player";
import Map from "./components/Game/Map";
import Forest from "./components/Game/Forest";
import { keyboardMap } from "./hooks/gameHelpers";
import { GameProvider } from "./hooks/useGame";

const Game = () => {
  return (
    <KeyboardControls map={keyboardMap}>
      <GameProvider>
        <Canvas shadows>
          <Stats />
          <color attach='background' args={[0xADD8E6]} />
          <ambientLight intensity={1} />
          <directionalLight castShadow position={[10, 10, 10]} intensity={1} />
          <Suspense>
            <Physics 
            // debug 
            gravity={[0, -9.81, 0]}>
              <Map />
              <Forest />
              <Player />
            </Physics>
          </Suspense>
        </Canvas>
      </GameProvider>
    </KeyboardControls>
  );
};

export default Game;
