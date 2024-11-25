import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Matrix4 } from 'three';


export const Tree = ({type=1, positions=[[0,0,0]]}) => {
  const { nodes, materials } = useGLTF('/nature3-transformed.glb')

  const leavesRef = useRef();
  const barkRef = useRef();

  const geometries = [
    {leaves:'Cube010', bark:'Cube010_1'}, // type 1
    {leaves:'Cube068', bark:'Cube068_1'}, // type 2
    {leaves:'Cube248', bark:'Cube248_1'}, // type 3
  ]

  useEffect(() => {
    positions.forEach((position, index) => {
      const matrix = new Matrix4();
      matrix.setPosition(...position); 
      
      leavesRef.current.setMatrixAt(index, matrix);
      barkRef.current.setMatrixAt(index, matrix);
    });

    leavesRef.current.instanceMatrix.needsUpdate = true;
    barkRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return (
    <group>
        <instancedMesh
            ref={leavesRef}
            args={[nodes[geometries[type-1].leaves].geometry, materials.leaves, positions.length]}
        />
        <instancedMesh
            ref={barkRef}
            args={[nodes[geometries[type-1].bark].geometry, materials.bark, positions.length]}
        />
    </group>
  )
}

// export const Bush = (props) => {
//   const { nodes, materials } = useGLTF('/game/nature-transformed.glb')
//   return (
//     <group position={[-2.412, 4.968, -76.574]} rotation={[-1.21, 1.491, 1.605]}>
//       <mesh geometry={nodes.Cube250.geometry} material={materials.leaves} />
//       <mesh geometry={nodes.Cube250_1.geometry} material={materials.cherry} />
//       <mesh geometry={nodes.Cube250_2.geometry} material={materials.bark} />
//     </group>
//   )
// }

// export const Trunk = (props) => {
//   const { nodes, materials } = useGLTF('/game/nature-transformed.glb')
//   return (
//     <mesh geometry={nodes.trunk.geometry} material={materials.bark} position={[2.984, 0.789, -76.637]} rotation={[3.112, -0.097, 1.468]} />
//   )
// }

// export const Rocks = () => {
//     const { nodes, materials } = useGLTF('/game/nature-transformed.glb')
//     return (
//         <>
//             <mesh geometry={nodes.rock2.geometry} material={materials.Rock} position={[7.219, 1.438, -83.858]} />
//             <mesh geometry={nodes.rock3.geometry} material={materials.Rock} position={[0.408, 1.549, -74.311]} />
//             <mesh geometry={nodes.rock1.geometry} material={materials.Rock} position={[0.677, 1.438, -81.164]} />
//             <mesh geometry={nodes.rock4.geometry} material={materials.Rock} position={[0.677, 1.438, -71.688]} />
//         </>
//     )
// }