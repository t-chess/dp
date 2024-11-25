import { Model } from "../../../Nature3";
import { Tree } from "./NatureAssets";

const Forest = () => {
    return (
        <group>
            <Tree type={1} />
            <Tree type={2} />
            <Tree type={3} />
        </group>
    )
}

export default Forest;