import { AdaptiveDpr, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Config/Scene";
import UI from "./components/Config/UI";
import "./assets/Config.css";
import { ConfiguratorProvider } from "./hooks/useConfigurator";
import Camera from "./components/Config/Camera";

const Config = () => {
  return (
    <ConfiguratorProvider>
      <Canvas camera={{ position:[-3, 1, -5], fov: 50 }}>
        <Stats />
        <color attach='background' args={["#121212"]} />
        <Scene />
        <AdaptiveDpr pixelated />
      </Canvas>
      <UI />
    </ConfiguratorProvider>
  );
};

export default Config;
