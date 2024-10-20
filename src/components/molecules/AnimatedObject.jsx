import { useAnimations } from "@react-three/drei";
import { forwardRef, useEffect } from "react";
import { useModel } from "../../hooks/useModel";

const AnimatedObject = ({ animation, children }) => {
  const {
    data: { animations },
    ref,
  } = useModel();
  const { actions } = useAnimations(animations, ref);
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.25).play();
    return () => actions?.[animation]?.fadeOut(0.25);
  }, [animation]);
  return children;
};
export default AnimatedObject;
