import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const ThirdPersonCamera = ({ target }) => {
  const { camera, mouse } = useThree();
  const cameraOffset = new Vector3(0, 1, -0.75);
  const targetOffset = new Vector3(0, 0, 0.5);

  useFrame(() => {
    if (target.current) {
      const rbPosition = target.current.translation();
      const currentTargetPosition = new Vector3(
        rbPosition.x,
        rbPosition.y,
        rbPosition.z
      );
      const targetPosition = currentTargetPosition.clone().add(targetOffset);

      const mouseOffset = cameraOffset.clone();
      mouseOffset.x += mouse.x;

      const cameraPosition = currentTargetPosition
        .clone()
        .add(cameraOffset)
        .add(mouseOffset);

      camera.position.lerp(cameraPosition, 0.1);
      camera.lookAt(targetPosition);
    }
  });
  return null;
};

export default ThirdPersonCamera;
