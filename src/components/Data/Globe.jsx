import { useData } from "../../hooks/useData"

const Globe = () => {
    const {radius, darkmode} = useData();
    return (<>
        <mesh>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshStandardMaterial color={darkmode?0x222222:0x90cec7} wireframe={false} />
        </mesh>
        <color attach='background' args={[darkmode?0x1a060f:0xcec790]} />
    </>)
}

export default Globe