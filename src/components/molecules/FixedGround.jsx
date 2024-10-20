import { RigidBody } from "@react-three/rapier";

const FixedGround = ({ texture, ...rest }) => {
  return (
    <RigidBody type='fixed' colliders={"trimesh"} {...rest}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color='green' />
      </mesh>
    </RigidBody>
  );
};

export default FixedGround;
