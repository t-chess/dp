import { useGame } from "../../hooks/useGame";
import { Bush, Rocks, Tree } from "./NatureAssets";

const Forest = () => {
    return (
        <group position={[2,1.5,6]}>
            <Tree type={1} positions={[[2,0.3,4],[-10,5,-20],[-20,3,-15],[-20,1,4]]} />
            <Tree type={2} positions={[[4,-0.5,-3],[-7,-0.5,7],[-6,-0.5,8],[-9,-0.5,8.5],[-15,0.5,0],[-13,0.5,-3]]} />
            <Tree type={3} positions={[[4,0.5,7],[4,2,-15],[0,0.5,-12],[-2,2.75,-16],[-14,3.8,-10],[-3,-0.75,2]]} />
            <Rocks count={50} radius={5} position={[-15,3,-8]} />
            <Rocks type={2} count={20} radius={5} position={[-15,4,-15]} />
            <Rocks type={3} count={20} radius={5} position={[-15,3,5]} />
            <Rocks type={4} count={10} radius={10} position={[0,3,5]} />

            <Bush positions={[[0,-2.6,0],[5,-1.2,5],[-10,-1.7,-2],[-12,-1.3,-2],[-11,-1.5,-4],[-2,-1,9],[-1,-1.5,6], ]} />
            <group position={[5,3.2,-12]}>
                <Bush positions={[[-10,-1.7,-2],[-12,-1.3,-2],[-11,-1.5,-4]]} />
            </group>
            <group position={[13,-2.8,-4]}>
                <Bush positions={[[-10,0,-2],[-12,0,-2],[-11,0,-4]]} />
            </group>
        </group>
    )
}

export default Forest;