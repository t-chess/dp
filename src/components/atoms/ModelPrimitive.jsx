import { forwardRef } from "react";
import { useModel } from "../../hooks/useModel";

const ModelPrimitive = forwardRef((props, ref) => {
  const { data } = useModel();
  return (
    <group>
      <primitive object={data.scene} ref={ref} {...props} />
    </group>
  );
});
export default ModelPrimitive;
