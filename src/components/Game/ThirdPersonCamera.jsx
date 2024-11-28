import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, Quaternion } from "three";

const ThirdPersonCamera = ({ target }) => {
  const { camera, mouse } = useThree();
  const cameraOffset = new Vector3(0, 2, -3); 
  const targetOffset = new Vector3(0, 1, 0); 
  const desiredPosition = new Vector3();
  const lookAtPosition = new Vector3();
  useFrame(() => {
    if (target.current) {
      const playerPosition = target.current.translation();
      const playerRotation = target.current.rotation();
      let adjustedOffset = new Vector3(
        cameraOffset.x,
        cameraOffset.y,
        -cameraOffset.z
      ).applyQuaternion(playerRotation);
      const mouseOffset = new Vector3(mouse.x * 0.5, mouse.y * 0.2, 0); 
      adjustedOffset = adjustedOffset.add(mouseOffset);
      desiredPosition.copy(playerPosition).add(adjustedOffset);
      lookAtPosition.copy(playerPosition).add(targetOffset);
      camera.position.lerp(desiredPosition, 0.1);
      camera.lookAt(lookAtPosition); 
    }
  });
  return null;
};
export default ThirdPersonCamera;
