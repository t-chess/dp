import {ContactShadows,BakeShadows,Environment} from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { Model } from "./Model";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";

const Scene = ({scale}) => {
  return (
    <group position={[0, -1*scale, 0]} scale={scale}>
        <Suspense fallback={<FallbackBox />}>
            <Model position={[0.5*scale, 0, 0]} rotation={[0, -Math.PI / 8, 0]} />
        </Suspense>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.4, 0.01, 0.4]}>
          <torusGeometry args={[2.5, 0.005, 30, 100]} />
          <meshStandardMaterial color={0xFFD17D} emissive={0xFFD17D} emissiveIntensity={0.3} roughness={0.5} metalness={0.3} toneMapped={false} />
        </mesh>

        <Environment preset='night' />
        <ambientLight intensity={2} />
        <ContactShadows opacity={0.3} frames={1} />
        <directionalLight position={[-3, 3, -3]} intensity={2}  />
      
        <EffectComposer>
          <Bloom intensity={1} luminanceThreshold={0}  luminanceSmoothing={0} mipmapBlur={false} />
        </EffectComposer>
        <BakeShadows />
    </group>
  );
};

export default Scene;


const FallbackBox = () => {
  const meshRef = useRef();
  let float = 0;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01; 
      float += 0.03; 
      meshRef.current.position.y = 1 + Math.sin(float) * 0.1; 
    }
  });
  return (
    <mesh ref={meshRef} position={[0.4,0,0.3]}>
      <boxGeometry args={[0.25, 0.25, 0.25]} />
      <meshStandardMaterial
        color={0xFFD17D}
        emissive={0xFFD17D}
        emissiveIntensity={0.3}
        roughness={0.5}
        metalness={0.3}
        wireframe 
        toneMapped={false}
      />
    </mesh>
  );
};