import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";
import { RigidBody } from "@react-three/rapier";

const Map = () => {
    const grass  = useLoader(TextureLoader, '/game/grass.png');
    grass.wrapS=grass.wrapT=RepeatWrapping;
    grass.repeat.set(100, 100);
    
    return (
      <>
        <RigidBody colliders="trimesh" type='fixed' restitution={0} receiveShadow >
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial map={grass} />
          </mesh>
        </RigidBody>
        <color attach='background' args={[0xADD8E6]} />
        </>
    )
}

export default Map;