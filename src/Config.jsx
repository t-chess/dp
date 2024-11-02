import { AdaptiveDpr, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Config/Scene";
import UI from "./components/Config/UI";
import "./assets/Config.css";
import { ConfiguratorProvider } from "./hooks/useConfigurator";

const Config = () => {
  return (
    <ConfiguratorProvider>
      <Canvas camera={{ position: [-4, 1, -4], fov: 50 }}>
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

// The X axis is red. The Y axis is green. The Z axis is blue.
// https://sketchfab.com/3d-models/cyberpunk-2077-fanart-makigai-maimai-p126-720ddbe936504ae194d514876b235067
// https://www.youtube.com/watch?v=LNvn66zJyKs
