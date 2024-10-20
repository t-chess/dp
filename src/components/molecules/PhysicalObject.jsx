import { BallCollider, CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { useModel } from "../../hooks/useModel";

const PhysicalObject = ({
  children,
  colliders = "trimesh",
  castShadow,
  receiveShadow,
  rbRef,
  ...rest
}) => {
  const model = useModel();
  const ref = rbRef ? rbRef : useRef();
  useEffect(() => {
    if (model?.data) {
      model.data.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = castShadow;
          child.receiveShadow = receiveShadow;
        }
      });
    }
  }, [model]);
  return (
    <RigidBody
      colliders={typeof colliders === "string" ? colliders : null}
      ref={ref}
      friction={1}
      restitution={0.5}
      {...rest}
    >
      {children}
      {typeof colliders !== "string" && colliders}
    </RigidBody>
  );
};

export default PhysicalObject;
