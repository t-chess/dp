import * as THREE from 'three';
import { useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import DataLayer from './DataLayer';
import { useData } from '../../hooks/useData';


const Globe = () => {
  const {layers} = useData();
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#87ceeb" wireframe={false} />
      </mesh>
      {layers.map(layer=><DataLayer key={layer.id} {...layer} />)}
    </group>
  );
}

export default Globe;
