import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Config/Scene";
import UI from "./components/Config/UI";
import "./assets/Config.css";
import { ConfiguratorProvider } from "./hooks/useConfigurator";

const Configurator = () => {
  const scaleFactor = Math.max(window.innerWidth / 1920, 0.4);
  return (
    <ConfiguratorProvider>
      <Canvas camera={{ position:[-3, 1, -5], fov: 50 }} dpr={1} fallback={<div>Sorry no WebGL supported!</div>}>
        <color attach='background' args={["#121212"]} />
        <Scene scale={scaleFactor} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2}
          maxDistance={6}
          minDistance={2.5*scaleFactor}
        />
        <Stats />
      </Canvas>
      <UI />
    </ConfiguratorProvider>
  );
};

export default Configurator;
