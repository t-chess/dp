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
      <Canvas camera={{ position:[-4, 1, -4], fov: 50 }}>
        {/* <Camera /> */}
        <Stats />
        <axesHelper />
        <color attach='background' args={["#121212"]} />
        <fog attach='fog' color='#121212' near={4} far={10} />
        <Scene />
        <AdaptiveDpr pixelated />
      </Canvas>
      <UI />
    </ConfiguratorProvider>
  );
};

export default Config;
