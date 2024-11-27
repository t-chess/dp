import { Box, Cone, Cylinder, Image, RoundedBox } from "@react-three/drei"
import { BoxGeometry, MeshStandardMaterial, RepeatWrapping, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { InstancedRigidBodies, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { getRandomPositions } from "../../hooks/gameHelpers";

const Playground = () => {
    return (
        <group>
            <group position={[1,0,3]}> 
                <group position={[1,0,-1]}>
                    <WoodenBoxInstances args={[0.25,0.25,0.25]} count={40} />
                    <WoodenBoxInstances args={[0.5,0.5,0.5]} count={5} />
                </group>
                <group position={[1,0,3]}>    
                    <WoodenBoxInstances args={[0.15,0.15,0.15]} count={6} />
                </group>
                <RigidBody colliders="trimesh" type="dynamic" friction={0.6} restitution={1} position={[-1,0,4]}>
                    <Cylinder args={[1,1,0.2]}>
                        <meshStandardMaterial color='black' />
                    </Cylinder>
                </RigidBody>
            </group>
        </group>
    )
}

const WoodenBoxInstances = ({args=[0.25,0.25,0.25], count, radius = 2}) => {
    const meshRef = useRef();
    const planks  = useLoader(TextureLoader, '/game/planks.png');
    planks.wrapS=planks.wrapT=RepeatWrapping;
    planks.repeat.set(5, 5);
    const positions = getRandomPositions(count, radius);

    useEffect(() => {
        meshRef.current?.computeBoundingBox();
        meshRef.current?.computeBoundingSphere();
      }, [count])    

    return (
        <InstancedRigidBodies
          instances={positions.map((position,i) => ({
            key:i,
            position,
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            friction: 0.4,
            mass: 0.3
          }))}
          frustumCulled={false}
        >
          <instancedMesh ref={meshRef} args={[new BoxGeometry(...args), new MeshStandardMaterial({ map: planks }), count]} />
        </InstancedRigidBodies>
    );
}

export default Playground;