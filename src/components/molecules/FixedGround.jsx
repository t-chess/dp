import { RigidBody } from "@react-three/rapier";

const FixedGround = ({ texture, ...rest }) => {
  return (
    <RigidBody type='fixed' colliders={"trimesh"} {...rest}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color='green' />
      </mesh>
    </RigidBody>
  );
};

export default FixedGround;
