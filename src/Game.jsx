import { KeyboardControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { createContext, Suspense, useContext, useState } from "react";
import Player from "./components/Game/Player";
import Map from "./components/Game/Map";
import Forest from "./components/Game/Forest";
import TouchControls from "./components/Game/TouchControls";
import "./assets/Game.css"

const GameContext = createContext();
export const useGame = () => {
  const context = useContext(GameContext);
  return context;
};
const GameProvider = ({children}) => {
  const [berries, setBerries] = useState(0);
  return <GameContext.Provider value={{berries, setBerries}}>{children}</GameContext.Provider>
}

const Game = () => {
  return (
    <KeyboardControls map={keyboardMap}>
      <GameProvider>
        <Canvas shadows fallback={"Simple demo game with wild boar model eating berries, usable with WebGL support"} >
          {/* <Stats /> */}
          <color attach='background' args={[0xADD8E6]} />
          <ambientLight intensity={1} />
          <directionalLight castShadow position={[10, 10, 10]} intensity={1} />
          <Suspense>
            <Physics gravity={[0, -9.81, 0]}>
              <Map />
              <Forest />
              <Player />
            </Physics>
          </Suspense>
        </Canvas>
        {window.innerWidth<900&&<TouchControls />}
      </GameProvider>
    </KeyboardControls>
  );
};

export default Game;

export const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] }
];