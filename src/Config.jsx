import { AdaptiveDpr, OrbitControls, PerformanceMonitor, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Config/Scene";
import UI from "./components/Config/UI";
import "./assets/Config.css";
import { ConfiguratorProvider } from "./hooks/useConfigurator";
import { useState } from "react";

const Config = () => {
  const [dpr, setDpr] = useState(1.5);

  return (
    <ConfiguratorProvider>
      <Canvas camera={{ position:[-3, 1, -5], fov: 50 }} >
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} >
            <Stats />
            <color attach='background' args={["#121212"]} />
            <Scene />
          <AdaptiveDpr pixelated />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minPolarAngle={0.3}
            maxPolarAngle={Math.PI / 2}
            maxDistance={6}
            minDistance={2.5}
          />
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
