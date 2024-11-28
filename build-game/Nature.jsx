/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 nature.glb --transform -j 
Files: nature.glb [464.3KB] > C:\Users\Tatiana\Desktop\UNI\DP\dp\nature-transformed.glb [39.6KB] (91%)
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Nature(props) {
  const { nodes, materials } = useGLTF('/nature-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0.159, 20.461, -84.66]}>
        <mesh geometry={nodes.Cube010.geometry} material={materials.leaves} />
        <mesh geometry={nodes.Cube010_1.geometry} material={materials.bark} />
      </group>
      <mesh geometry={nodes.trunk.geometry} material={materials.bark} position={[2.984, 0.789, -76.637]} rotation={[3.112, -0.097, 1.468]} />
      <group position={[-1.22, 13.966, -79.698]} rotation={[Math.PI, -1.196, Math.PI]}>
        <mesh geometry={nodes.Cube068.geometry} material={materials.leaves} />
        <mesh geometry={nodes.Cube068_1.geometry} material={materials.bark} />
      </group>
      <mesh geometry={nodes.rock2.geometry} material={materials.Rock} position={[7.219, 1.438, -83.858]} />
      <mesh geometry={nodes.rock3.geometry} material={materials.Rock} position={[0.408, 1.549, -74.311]} />
      <mesh geometry={nodes.rock1.geometry} material={materials.Rock} position={[0.677, 1.438, -81.164]} />
      <mesh geometry={nodes.rock4.geometry} material={materials.Rock} position={[0.677, 1.438, -71.688]} />
      <group position={[0.127, 16.168, -71.68]} rotation={[0, 1.286, 0]}>
        <mesh geometry={nodes.Cube248.geometry} material={materials.leaves} />
        <mesh geometry={nodes.Cube248_1.geometry} material={materials.bark} />
      </group>
      <group position={[-2.412, 4.968, -76.574]} rotation={[-1.21, 1.491, 1.605]}>
        <mesh geometry={nodes.Cube250.geometry} material={materials.leaves} />
        <mesh geometry={nodes.Cube250_1.geometry} material={materials.cherry} />
        <mesh geometry={nodes.Cube250_2.geometry} material={materials.bark} />
      </group>
    </group>
  )
}

useGLTF.preload('/nature-transformed.glb')