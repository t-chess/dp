import {
  BakeShadows,
  ContactShadows,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  usePerformanceMonitor,
} from "@react-three/drei";
import { Bloom, EffectComposer, Noise} from '@react-three/postprocessing'
import { Suspense } from "react";
import { Model } from "./Maimai";

const Scene = () => {
  const onIncline = ({fps}) => {
    console.log(fps);
  }
  const onDecline = ({fps}) => {
    console.log(fps)
  }
  usePerformanceMonitor({ onIncline, onDecline });

  return (
    <group position={[0, -1, 0]}>
      <Suspense fallback={null}>
        <Model position={[0.5, 0, 0]} rotation={[0, -Math.PI / 8, 0]} />
        <Environment preset='city' />
        <BakeShadows />
      </Suspense>


      {/* <ContactShadows resolution={1024} frames={1} position={[0, -0.05, 0]} scale={15} blur={0.5} opacity={1} far={20} /> */}

      {/* dynamically adjust reflection or switch to simpler material depending on fps */}
      {/* <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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
      </mesh> */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.25}
        maxDistance={6}
        minDistance={2.5}
      />
    </group>
  );
};

export default Scene;
