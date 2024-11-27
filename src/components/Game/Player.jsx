import { Html, useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  RigidBody,
  RoundCuboidCollider
} from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import ThirdPersonCamera from "./ThirdPersonCamera";
import { Quaternion } from "three";
import { useGame } from "../../hooks/useGame";

const Player = () => {
  const ref = useRef();
  const rbRef = useRef();
  const { animations, scene } = useGLTF('/game/boar.glb');
  const { actions } = useAnimations(animations, ref);
  const [animation, setAnimation] = useState("Idle2");
  const [, get] = useKeyboardControls();
  const [grounded, setGrounded] = useState(true);
  const {berries} = useGame();

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.25).play();
    return () => actions?.[animation]?.fadeOut(0.25);
  }, [animation]);
  
  useFrame((state,delta) => {
    if (rbRef.current) {
      const velocity = rbRef.current.linvel();
      let rotation = rbRef.current.rotation();
      rotation = new Quaternion(
        rotation.x,
        rotation.y,
        rotation.z,
        rotation.w
      );
      if (get().left||get().right) {
        const speed = get().left?1.5:-1.5;
        const angle = new Quaternion().setFromAxisAngle(
          { x: 0, y: 1, z: 0 },
          speed*delta
        );
        rotation.multiply(angle);
        rbRef.current.setRotation(rotation);
      }
      const forwardVector = {
        x: -2 * (rotation.x * rotation.z + rotation.w * rotation.y),
        z: -2 * (rotation.z * rotation.z + rotation.w * rotation.w - 0.5),
      };
      const length = Math.sqrt(forwardVector.x ** 2 + forwardVector.z ** 2);
      forwardVector.x /= length;
      forwardVector.z /= length;
      if (get().forward) {
        rbRef.current.wakeUp();
        const speed = 1.5 * (1 + berries / 8); 
        rbRef.current.setLinvel({
          x: forwardVector.x * speed,
          y: velocity.y, 
          z: forwardVector.z * speed,
        });
        setAnimation("Move1 (jump)");
      } else {
        rbRef.current.setLinvel({ x: 0, y: velocity.y, z: 0 });
        setAnimation("Idle2");
      }
      if (get().jump&&grounded) { //skok
        rbRef.current.wakeUp();
        rbRef.current.applyImpulse({ x: 0, y: 0.006 * (1 + berries / 10) , z: 0 });
        setGrounded(false); 
      }
      if (rbRef.current.translation().y < -10) { 
        rbRef.current.setTranslation({ x: 0, y: 0.5, z: 0 }); //pad
      }
    }
  });
  return (
    <>
    <RigidBody
      ref={rbRef}
      type='dynamic' lockRotations
      friction={0.2} restitution={0.1}
      receiveShadow castShadow
      name="player"
      onCollisionEnter={()=>setGrounded(true)}
      position={[0,2,0]}
      scale={[1 + berries / 6,1 + berries / 6,1 + berries / 6]}
    >
      <primitive ref={ref} object={scene} position={[0, -0.07, 0]} castShadow receiveShadow rotation={[0,Math.PI,0]} />
      <Html position={[0,1,0]} wrapperClass="berries">{berries}</Html>
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
