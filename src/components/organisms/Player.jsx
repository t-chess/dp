import { Html, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  RoundCuboidCollider,
} from "@react-three/rapier";
import { useRef, useState } from "react";
import { Euler, MathUtils, Quaternion } from "three";
import { ModelProvider } from "../../hooks/useModel";
import { useScene } from "../../hooks/useScene";
import ModelPrimitive from "../atoms/ModelPrimitive";
import ThirdPersonCamera from "../atoms/ThirdPersonCamera";
import AnimatedObject from "../molecules/AnimatedObject";
import PhysicalObject from "../molecules/PhysicalObject";

const Player = ({ position = [0, 0.2, 0] }) => {
  const ref = useRef();
  const rbRef = useRef();
  const [animation, setAnimation] = useState("Idle2");
  const { mode } = useScene();
  const [, get] = useKeyboardControls();

  useFrame(() => {
    if (rbRef.current) {
      const velocity = rbRef.current.linvel();
      let x = get().left ? 1 : get().right ? -1 : 0;
      let z = get().forward ? 1 : get().backward ? -1 : 0;
      if (x || z) {
        velocity.z = z * 1.25;
        velocity.x = x * 1.25;
        const direction =
          Math.round(Math.atan2(x, z) / (Math.PI / 4)) * (Math.PI / 4);
        ref.current.rotation.y = direction;

        setAnimation("Move1 (jump)");
        rbRef.current.wakeUp();
      } else {
        setAnimation("Idle2");
      }
      rbRef.current.setLinvel(velocity);
    }
  });

  return (
    <ModelProvider src='/models/boar.glb' ref={ref}>
      <AnimatedObject animation={animation}>
        <PhysicalObject
          rbRef={rbRef}
          colliders={<RoundCuboidCollider args={[0.075, 0.01, 0.1, 0.1]} />}
          type='dynamic'
          friction={0.5}
          receiveShadow
          castShadow
          lockRotations
          position={position}
        >
          <Html>Boar Player</Html>
          <ModelPrimitive position={[0, -0.1, 0]} ref={ref} />
        </PhysicalObject>
      </AnimatedObject>
      {mode === "dynamic" && <ThirdPersonCamera target={rbRef} />}
    </ModelProvider>
  );
};

export default Player;

// Attack1 (marracca)
// Attack2 (tusks)
// Dying
// Emote1 (sneeze)
// Hurt
// Idle1
// Idle2 ------
// Move1 (jump) ------
// Move2 (shuffle)
