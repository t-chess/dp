import { Physics } from "@react-three/rapier";
import { Suspense, useEffect } from "react";
import Ground from "../components/molecules/FixedGround";
import Skydome from "../components/atoms/Skydome";
import Player from "../components/organisms/Player";
import { useScene } from "../hooks/useScene";
import { Environment } from "@react-three/drei";

const StartScene = () => {
  const { setMode, setSkydomeRadius } = useScene();
  useEffect(() => {
    setMode("static");
    setSkydomeRadius(10);
  });
  return (
    <Suspense>
      <Environment preset='park' />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 20, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      ></directionalLight>
      <Skydome type={"image"} src={"./hdri/puresky_4k-min.png"} />
      <Physics debug>
        <Ground></Ground>
        <Player />
      </Physics>
    </Suspense>
  );
};

export default StartScene;
