import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useRef } from "react";
import ThirdPersonCamera from "../components/atoms/ThirdPersonCamera";
import Ground from "../components/molecules/FixedGround";
import PhysicalObject from "../components/molecules/PhysicalObject";
import Player from "../components/molecules/Player";
import { useScene } from "../hooks/useScene";

const TestScene = () => {
  const { setMode } = useScene();
  useEffect(() => {
    setMode("dynamic");
  }, []);
  return (
    <Suspense>
      <ambientLight intensity={0.7} />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      ></directionalLight>
      <Physics debug>
        <Ground />
        <PhysicalObject
          position={[1, 5, 0]}
          restitution={0.9}
          colliders='ball'
          type='dynamic'
        >
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color='hotpink' />
          </mesh>
        </PhysicalObject>
        <Player />
      </Physics>
    </Suspense>
  );
};

export default TestScene;
