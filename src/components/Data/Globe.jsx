import { OrbitControls } from "@react-three/drei";
import { useData } from "../../hooks/useData"
import { useEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import { A11y } from "@react-three/a11y";

const Globe = () => {
    const {radius, darkmode, autoRotate} = useData();

    return (
        <>
            {/* <A11y role="content" description="Zeměkoule"> */}
                <mesh>
                    <sphereGeometry args={[radius, 64, 64]} />
                    <meshStandardMaterial color={darkmode?0x222222:0x90cec7} wireframe={false} />
                </mesh>
            {/* </A11y> */}
            <color attach='background' args={[darkmode?0x1a060f:0xcec790]} />
            <OrbitControls autoRotate={autoRotate} maxDistance={6} minDistance={1.25} enablePan={false} />
        </>
    )
}

export default Globe