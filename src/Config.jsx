import { AdaptiveDpr, PerformanceMonitor, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Config/Scene";
import UI from "./components/Config/UI";
import "./assets/Config.css";
import { ConfiguratorProvider } from "./hooks/useConfigurator";
import Camera from "./components/Config/Camera";
import { useState } from "react";

const Config = () => {
  const [dpr, setDpr] = useState(1.5);

  return (
    <ConfiguratorProvider>
      <Canvas camera={{ position:[-4, 1, -4], fov: 50 }} >
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} >
          {/* <Camera /> */}
          <Stats />
          <axesHelper />
          <color attach='background' args={["#121212"]} />
          <fog attach='fog' color='#121212' near={4} far={10} />
          <Scene />
          <AdaptiveDpr pixelated />
        </PerformanceMonitor>
      </Canvas>
      <UI />
    </ConfiguratorProvider>
  );
};

export default Config;


function AdaptivePixelRatio() {
  const current = useThree((state) => state.performance.current)
  const setPixelRatio = useThree((state) => state.setDpr)
  useEffect(() => {
    setPixelRatio(window.devicePixelRatio * current)
  }, [current])
  return null
}
