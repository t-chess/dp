import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Config/Scene";
import UI from "./components/Config/UI";
import "./assets/Config.css";
import { ConfiguratorProvider } from "./hooks/useConfigurator";
import { A11y, A11yAnnouncer } from "@react-three/a11y";
import { useRef } from "react";

const Configurator = () => {
  const scaleFactor = Math.max(window.innerWidth / 1920, 0.4);
  const controlsRef = useRef();
  const zoomin = () => {
    controlsRef.current.maxDistance=3.5*scaleFactor;
  };
  const zoomout= () => {
    controlsRef.current.maxDistance=6;
    controlsRef.current.reset();
  };
  const rotate= () => {
    controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
  };
  return (
    <ConfiguratorProvider>
      <Canvas camera={{ position:[-3, 1, -5], fov: 50 }} dpr={1} fallback={"Sorry no WebGL supported!"}>
        <color attach='background' args={["#121212"]} />
        <A11y role="content" description="Interactive 3D scene with black background, glowing decoration and car 3D model." >
          <Scene scale={scaleFactor} />
        </A11y>
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2}
          maxDistance={6}
          minDistance={2.5*scaleFactor}
          ref={controlsRef}
        />
      </Canvas>
      <A11yAnnouncer />
      <UI zoomin={zoomin} zoomout={zoomout} rotate={rotate} />
    </ConfiguratorProvider>
  );
};

export default Configurator;
