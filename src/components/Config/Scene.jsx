import {
  ContactShadows,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Suspense } from "react";
// import { Model } from "./Maimai";
import { Model } from "./Model";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useConfigurator } from "../../hooks/useConfigurator";


const Scene = () => {
  const {lights} = useConfigurator();
  return (
    <group position={[0, -1, 0]}>
      <Suspense fallback={null}>
        <Model position={[0.5, 0, 0]} rotation={[0, -Math.PI / 8, 0]} />
        <Environment preset='night' />
        <ambientLight intensity={2} />
        <ContactShadows opacity={0.3} />
        <directionalLight position={[-3, 3, -3]} intensity={2}  />

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.4, 0.01, 0.4]}>
          <torusGeometry args={[2.5, 0.005, 30, 100]} />
          <meshStandardMaterial color={0xFFD17D} emissive={0xFFD17D} emissiveIntensity={0.3} roughness={0.5} metalness={0.3} toneMapped={false} />
        </mesh>
      
        <EffectComposer>
          <Bloom intensity={1} luminanceThreshold={0}  luminanceSmoothing={0} mipmapBlur={false} />
        </EffectComposer>
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2}
        maxDistance={6}
        minDistance={2.5}
      />
    </group>
  );
};

export default Scene;
