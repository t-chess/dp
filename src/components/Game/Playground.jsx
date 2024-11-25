import { Box, RoundedBox } from "@react-three/drei"
import { RepeatWrapping, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

const Playground = () => {
    return (
        <group position={[1,0,3]}>
            <WoodenBox args={[2,0.5,3]} />
            <WoodenBox position={[-1.55,0.5,0.5]} args={[1,1.5,2]} />
        </group>
    )
}


const WoodenBox = ({args, ...props}) => {
    const planks  = useLoader(TextureLoader, '/game/planks.png');
    planks.wrapS=planks.wrapT=RepeatWrapping;
    planks.repeat.set(5, 5);
    return (
        <RigidBody type="dynamic" friction={0.6} restitution={0} {...props}>
            <Box args={args}>
                <meshStandardMaterial map={planks} />
            </Box>
        </RigidBody>
    )
}


export default Playground;