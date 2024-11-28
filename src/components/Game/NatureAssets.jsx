import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Matrix4 } from 'three';
import { InstancedRigidBodies } from '@react-three/rapier';
import { useGame } from '../../Game';

export const getRandomPositions = (count, radius, fixedY = false) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2; 
      const distance = Math.random() * radius; 
      const x = Math.cos(angle) * distance; 
      const z = Math.sin(angle) * distance;
      const y = fixedY ? fixedY : Math.random() + 0.5;
      positions.push([x, y, z]);
  }
  return positions;
}


export const Tree = ({type=1, positions=[]}) => {
  const { nodes, materials } = useGLTF('/game/nature-transformed.glb')
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
    if (leavesRef.current) {
      leavesRef.current.frustumCulled = false;
    }
    if (barkRef.current) {
      barkRef.current.frustumCulled = false;
    }
  }, [positions]);
  
  return (
    <group>
        <instancedMesh
            ref={leavesRef}
            args={[nodes[geometries[type-1].leaves].geometry, materials.leaves, positions.length]}
        />
        <InstancedRigidBodies
          type='fixed'
          colliders="trimesh"
          instances={positions.map((position, index) => ({
            key: index,
            position,
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
          }))}
        >
          <instancedMesh
              ref={barkRef}
              args={[nodes[geometries[type-1].bark].geometry, materials.bark, positions.length]}
          />
        </InstancedRigidBodies>
    </group>
  )
}

export const Bush = ({positions=[]}) => {
  const { nodes, materials } = useGLTF('/game/nature-transformed.glb');
  const {setBerries} = useGame();
  const leavesRef= useRef();
  const cherryRef = useRef();
  const barkRef = useRef();
  const picked = useRef(new Array(positions.length).fill(false));

  useEffect(() => {
    positions.forEach((position, index) => {
      const matrix = new Matrix4();
      matrix.setPosition(...position); 
      leavesRef.current.setMatrixAt(index, matrix);
      barkRef.current.setMatrixAt(index, matrix);
      cherryRef.current.setMatrixAt(index, matrix);
    });
    leavesRef.current.instanceMatrix.needsUpdate = true;
    barkRef.current.instanceMatrix.needsUpdate = true;
    cherryRef.current.instanceMatrix.needsUpdate = true;
    if (leavesRef.current) leavesRef.current.frustumCulled = false;
    if (barkRef.current) barkRef.current.frustumCulled = false;
    if (cherryRef.current) cherryRef.current.frustumCulled = false;
  }, [positions]);
  const handleCollision = (index,rb) => {
    if (rb.name==='player'&&!picked.current[index]) {
      picked.current[index] = true;
      setBerries(v=>v+1)
      const hiddenMatrix = new Matrix4();
      hiddenMatrix.makeTranslation(0, -1000, 0);
      cherryRef.current.setMatrixAt(index, hiddenMatrix);
      cherryRef.current.updateMatrix();
      cherryRef.current.instanceMatrix.needsUpdate = true;
    }
  };
  return (
    <group>
      <InstancedRigidBodies
        type='fixed'
        colliders='ball'
        instances={positions.map((position, index) => ({
          key: index,
          position,
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          onCollisionEnter: ({rigidBodyObject}) => handleCollision(index,rigidBodyObject),
        }))}
      >
          <instancedMesh ref={leavesRef} args={[nodes.Cube250.geometry,materials.leaves, positions.length ]} />
      </InstancedRigidBodies>
      <instancedMesh ref={cherryRef} args={[nodes.Cube250_1.geometry,materials.cherry, positions.length ]}/>
      <instancedMesh ref={barkRef} args={[nodes.Cube250_2.geometry,materials.bark, positions.length ]} />
    </group>
  )
}

export const Trunk = (props) => {
  const { nodes, materials } = useGLTF('/game/nature-transformed.glb')
  return (
    <mesh geometry={nodes.trunk.geometry} material={materials.bark} position={[2.984, 0.789, -76.637]} rotation={[3.112, -0.097, 1.468]} />
  )
}

export const Rocks = ({type=1, count=1, radius=3, position}) => {
    const { nodes, materials } = useGLTF('/game/nature-transformed.glb')
    const ref = useRef();

    const positions = getRandomPositions(count, radius);

    return (
        <InstancedRigidBodies
          type='dynamic'
          colliders='cuboid'
          friction={50}
          mass={100}
          position={position}
          instances={positions.map((position, index) => ({
            key: index,
            position,
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
          }))}
        >
          <instancedMesh
                ref={ref}
                args={[nodes['rock'+type].geometry, materials.Rock, count]}
                frustumCulled={false} 
            />
        </InstancedRigidBodies>
    )
}