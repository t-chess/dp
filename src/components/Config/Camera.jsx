import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useConfigurator } from "../../hooks/useConfigurator";

const Camera = () => {
  const { camera } = useThree();
  const { mode } = useConfigurator;

  useEffect(() => {
    if (mode==='main') {
        camera.position.set(-4, 1, -4);
        camera.lookAt(0,0,0);
        camera.updateProjectionMatrix();
    }
  }, [mode, camera]);

  return null; 
};

export default Camera;
