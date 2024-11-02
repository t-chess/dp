import {
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "./Maimai";

const Scene = () => {
  return (
    <group position={[0, -1, 0]}>
      <Suspense fallback={null}>
        <Model position={[0.5, 0, 0]} rotation={[0, -Math.PI / 8, 0]} />
        <Environment preset='city' />
      </Suspense>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <MeshReflectorMaterial
          blur={[150, 40]}
          resolution={1024}
          mixBlur={0.8}
          mixStrength={20}
          roughness={1}
          depthScale={1.4}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color='#161616'
          metalness={0.5}
        />
      </mesh>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.25}
      />
    </group>
  );
};

export default Scene;
