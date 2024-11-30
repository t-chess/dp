import { useLoader } from "@react-three/fiber";
import { MeshStandardMaterial, RepeatWrapping, TextureLoader } from "three";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { sRGBEncoding } from "@react-three/drei/helpers/deprecated";
import { baseURL } from "../../main";
import { A11y } from "@react-three/a11y";

const Map = () => {
  const grassTexture  = useLoader(TextureLoader, baseURL+'game/grass.png');
  grassTexture.wrapS=grassTexture.wrapT=RepeatWrapping;
  grassTexture.repeat.set(100, 100);
  grassTexture.encoding = sRGBEncoding;
  const { nodes } = useGLTF(baseURL+'game/terrain.glb')
  const grass = new MeshStandardMaterial({color:"#e3ffb9",map:grassTexture})
  
  return (
    <A11y type="content" description="Map with trees, berry bushes and stones">
      <RigidBody type='fixed' colliders="trimesh" restitution={0} friction={0.1} receiveShadow position={[-6,-7,3]} scale={[2,2,2]}>
        <mesh geometry={nodes.Plane.geometry} material={grass} scale={10} receiveShadow />
      </RigidBody>
    </A11y>
  )
}

export default Map;