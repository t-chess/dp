import { useVideoTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { TextureLoader } from "three";
import { useScene } from "../../hooks/useScene";

const Skydome = ({ type = "image", src, rotation = [0, 0, 0] }) => {
  const sphereRef = useRef();
  const { skydomeRadius } = useScene();
  let texture;
  if (type === "image") {
    texture = useLoader(TextureLoader, src);
  } else if (type === "video") {
    texture = useVideoTexture(src);
  }

  useEffect(() => {
    if (sphereRef.current) {
      sphereRef.current.scale.set(-1, 1, 1); // to view from the inside
      sphereRef.current.rotation.set(...rotation);
    }
  }, []);

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[skydomeRadius, 30, 20]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  );
};

export default Skydome;
