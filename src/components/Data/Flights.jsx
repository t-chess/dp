import React, { useRef, useState, useEffect } from 'react';
import { useData } from '../../hooks/useData';
import { BufferAttribute, BufferGeometry, Matrix4, ShaderMaterial } from 'three';

function Flights() {
  const meshRef = useRef();
  const pointsRef = useRef();
  const { flightsData, allFlights, segments } = useData();
  const [visibleFlights, setVisibleFlights] = useState(new Set());
  const totalSegments = segments + 1;

  useEffect(() => {
    if (flightsData&&meshRef.current) {
      const geometry = new BufferGeometry();
      const totalPoints = flightsData.length * totalSegments;

      const positions = new Float32Array(totalPoints * 3);
      const colors = new Float32Array(totalPoints * 3);
      const opacities = new Float32Array(totalPoints).fill(0);

      flightsData.forEach((flight, i) => {
        positions.set(flight.positions, i * totalSegments * 3); 
        colors.set(flight.colors, i * totalSegments * 3);
      });

      geometry.setAttribute('position', new BufferAttribute(positions, 3));
      geometry.setAttribute('color', new BufferAttribute(colors, 3));
      geometry.setAttribute('opacity', new BufferAttribute(opacities, 1));

      meshRef.current.geometry = geometry;
      meshRef.current.geometry.attributes.opacity.needsUpdate = true;
    }
  }, [flightsData]);

  const handlePointClick = (clicked) => {
    // all flights with the same start or end
    const flightsToShow = new Set();
    flightsData.forEach((flight, i) => {
      const start = flight.positions.slice(0, 3).join(',');
      const end = flight.positions.slice(totalSegments*3-3, totalSegments*3).join(',');
      if (start === clicked || end === clicked) {
        flightsToShow.add(i);
      }
    });
    setVisibleFlights(flightsToShow);
  };

  useEffect(() => {
    if (visibleFlights.size > 0) {
      const opacityArray = meshRef.current.geometry.attributes.opacity.array;
      flightsData.forEach((flight, i) => {
        const startIdx = i * totalSegments;
        const isVisible = visibleFlights.has(i);
        for (let j = 0; j < totalSegments; j++) {
          opacityArray[startIdx + j] = isVisible ? 1 : 0;
        }
      });
      meshRef.current.geometry.attributes.opacity.needsUpdate = true;
    }
  }, [visibleFlights, flightsData, totalSegments]);

  useEffect(()=>{
    if (allFlights&&meshRef.current) {
      const opacityArray = meshRef.current.geometry.attributes.opacity.array;
      opacityArray.fill(1);
      meshRef.current.geometry.attributes.opacity.needsUpdate = true;
    } else if (meshRef.current) {
      const opacityArray = meshRef.current.geometry.attributes.opacity.array;
      opacityArray.fill(0);
      meshRef.current.geometry.attributes.opacity.needsUpdate = true;
    }
  }, [allFlights])

  useEffect(() => {
    if (flightsData) {
      const pointPositions = new Float32Array(flightsData.length * 3);

      flightsData.forEach((flight, i) => {
        pointPositions[i * 3] = flight.positions[0];
        pointPositions[i * 3 + 1] = flight.positions[1];
        pointPositions[i * 3 + 2] = flight.positions[2];
      });
      pointsRef.current.instanceMatrix.needsUpdate = true;
      for (let i = 0; i < flightsData.length; i++) {
        const matrix = new Matrix4().setPosition(
          pointPositions[i * 3],
          pointPositions[i * 3 + 1],
          pointPositions[i * 3 + 2]
        );
        pointsRef.current.setMatrixAt(i, matrix);
      }

      pointsRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [flightsData]);

  const lineMaterial = new ShaderMaterial({
    vertexColors: true,
    transparent: true, 
    depthWrite: false, 
    vertexShader: `
      attribute float opacity;
      varying float vOpacity;
      varying vec3 vColor;
  
      void main() {
        vOpacity = opacity; 
        vColor = color;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying float vOpacity;
      varying vec3 vColor;
  
      void main() {
        gl_FragColor = vec4(vColor, vOpacity); 
        if (vOpacity < 0.01) discard; 
      }
    `,
  });
  


  if (flightsData) return (
    <group>
      <lineSegments ref={meshRef} material={lineMaterial}>
        <bufferGeometry attach="geometry" />
      </lineSegments>

      <instancedMesh
        ref={pointsRef}
        args={[null, null, flightsData.length]}
        onClick={(e) => {
          const instanceIndex = e.instanceId;
          const clickedPosition = flightsData[instanceIndex].positions.slice(0, 3).join(',');
          handlePointClick(clickedPosition);
        }}
      >
        <sphereGeometry args={[0.0075, 16, 16]} />
        <meshBasicMaterial color="#e8c73f" />
      </instancedMesh>
    </group>
  );
}

export default Flights;
