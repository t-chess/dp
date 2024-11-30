import { OrbitControls } from "@react-three/drei";
import { useData } from "../../hooks/useData"
import { useEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import { A11y } from "@react-three/a11y";

const Globe = () => {
    const {radius, darkmode, autoRotate} = useData();
    const controls = useRef();
    const [speed, setSpeed] = useState();
    const setRotateSpeed = () => {
        const distance = controls.current.getDistance();
        setSpeed(MathUtils.lerp(2, 0.5, (6 - distance) / 6)); 
    }

    return (
        <>
            <A11y role="content" description="Zeměkoule">
                <mesh>
                    <sphereGeometry args={[radius, 64, 64]} />
                    <meshStandardMaterial color={darkmode?0x222222:0x90cec7} wireframe={false} />
                </mesh>
            </A11y>
            <color attach='background' args={[darkmode?0x1a060f:0xcec790]} />
            <OrbitControls ref={controls} autoRotate={autoRotate} maxDistance={6} minDistance={1.25} enablePan={false} rotateSpeed={speed} onChange={setRotateSpeed} />
        </>
    )
}

export default Globe