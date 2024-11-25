import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  RigidBody,
  RoundCuboidCollider
} from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import ThirdPersonCamera from "./ThirdPersonCamera";

const Player = () => {
  const ref = useRef();
  const rbRef = useRef();
  const { animations, scene } = useGLTF('/game/boar.glb');
  const { actions } = useAnimations(animations, ref);
  const [animation, setAnimation] = useState("Idle2");
  const [, get] = useKeyboardControls();
  const [grounded, setGrounded] = useState(true);
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.25).play();
    return () => actions?.[animation]?.fadeOut(0.25);
  }, [animation]);
  useFrame(() => {
    if (rbRef.current) {
      const velocity = rbRef.current.linvel();
      let x = get().left ? 1 : get().right ? -1 : 0;
      let z = get().forward ? 1 : get().backward ? -1 : 0;
      if (x || z) { // pohyb
        velocity.z = z * 1.25;
        velocity.x = x * 1.25;
        const direction = Math.round(Math.atan2(x, z) / (Math.PI / 4)) * (Math.PI / 4);
        ref.current.rotation.y = direction;
        setAnimation("Move1 (jump)");
        rbRef.current.wakeUp();
      } else {
        setAnimation("Idle2");
      }
      if (get().jump&&grounded) { //skok
        rbRef.current.wakeUp();
        rbRef.current.applyImpulse({ x: 0, y: 0.006 , z: 0 });
        setGrounded(false); 
      }
      rbRef.current.setLinvel({ x: velocity.x, y: rbRef.current.linvel().y, z: velocity.z });
    }
  });
  return (
    <>
    <RigidBody
      ref={rbRef}
      type='dynamic' lockRotations
      friction={0.2} restitution={0}
      receiveShadow castShadow
      onCollisionEnter={()=>setGrounded(true)}
    >
      <primitive ref={ref} object={scene} position={[0, -0.07, 0]} />
      <RoundCuboidCollider args={[0.075, 0.03, 0.1, 0.1]} />
    </RigidBody>
    <ThirdPersonCamera target={rbRef} />
    </>
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
