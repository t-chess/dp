import { Box, Cone, Image, RoundedBox } from "@react-three/drei"
import { BoxGeometry, MeshStandardMaterial, RepeatWrapping, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { InstancedRigidBodies, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

const Playground = () => {
    return (
        <group>
            <group position={[1,0,3]}> 
                <group>
                    <GrassBox args={[2,0.5,2]} />
                    <GrassBox args={[0.5,0.5,0.5]} position={[0,1,0]} />
                    <GrassBox position={[-1.55,0.5,0.5]} args={[1,1.5,2]} />
                    <GrassBox position={[1.5,0.5,0.5]} args={[1,1,1]} />
                    <RigidBody colliders="trimesh" type="dynamic" friction={0.6} restitution={0} position={[-3,0.5,0.5]}>
                        <Cone args={[1,1,3]}>
                            <meshStandardMaterial color="#93b34b" />
                        </Cone>
                    </RigidBody>
                </group>
                <group position={[1,0,-1]}>
                    <WoodenBoxInstances args={[0.25,0.25,0.25]} count={40} />
                    <WoodenBoxInstances args={[0.5,0.5,0.5]} count={5} />
                </group>
                <group position={[1,0,3]}>    
                    <WoodenBoxInstances args={[0.15,0.15,0.15]} count={6} />
                </group>
                <group position={[-5,0.25,-1]}>
                    <RigidBody colliders="trimesh" type="dynamic" friction={0} restitution={0}>
                        <Box args={[2,0.2,2]}>
                        <meshStandardMaterial color='#8cfffb' />
                        </Box>
                    </RigidBody>
                </group>
                <group position={[-5,0.25,-3.5]}>
                    <RigidBody colliders="trimesh" type="dynamic" friction={0.6} restitution={1}>
                        <Box args={[2,0.2,2]}>
                        <meshStandardMaterial color='black' />
                        </Box>
                    </RigidBody>
                </group>
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

const GrassBox = ({args, ...props}) => {
    return (
        <RigidBody type="dynamic" friction={0.6} restitution={0} mass={3} {...props}>
            <RoundedBox args={args}>
                <meshStandardMaterial color="#93b34b" />
            </RoundedBox>
        </RigidBody>
    )
}


export default Playground;