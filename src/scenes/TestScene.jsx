import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useRef } from "react";
import ModelPrimitive from "../components/atoms/ModelPrimitive";
import FixedGround from "../components/molecules/FixedGround";
import PhysicalObject from "../components/molecules/PhysicalObject";
import Player from "../components/organisms/Player";
import { ModelProvider } from "../hooks/useModel";
import { useScene } from "../hooks/useScene";

const TestScene = () => {
  const mapRef = useRef();
  const { setMode } = useScene();
  useEffect(() => {
    setMode("dynamic");
  }, []);
  return (
    <Suspense>
      <ambientLight intensity={1} />
      {/* <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      ></directionalLight> */}
      <Physics debug>
        {/* <FixedGround /> */}
        <ModelProvider src='/game/animal_crossing_map.glb' ref={mapRef}>
          <RigidBody type='fixed' colliders={"trimesh"}>
            <ModelPrimitive ref={mapRef} scale={20} position={[-15, -1, 10]} />
          </RigidBody>
        </ModelProvider>
        <PhysicalObject
          position={[1, 2, 0]}
          restitution={0.9}
          colliders='ball'
          type='dynamic'
        >
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color='hotpink' />
          </mesh>
        </PhysicalObject>
        <Player position={[0, 2, 0]} />
      </Physics>
    </Suspense>
  );
};

export default TestScene;
