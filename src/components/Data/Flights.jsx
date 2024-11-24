import React, { useRef, useState, useEffect } from 'react';
import { useData } from '../../hooks/useData';
import { BufferAttribute, BufferGeometry, Matrix4, ShaderMaterial } from 'three';

function Flights() {
  const meshRef = useRef();
  const pointsRef = useRef();
  const { flightsData, allFlights, segments, darkmode, selectedAirport } = useData();
  const [visibleFlights, setVisibleFlights] = useState(new Set());
  const totalSegments = segments + 1;

  useEffect(() => {
    if (flightsData&&meshRef.current) {
      const geometry = new BufferGeometry();
      const totalPoints = flightsData.length * totalSegments;

      const positions = new Float32Array(totalPoints * 3);
      const opacities = new Float32Array(totalPoints).fill(0);

      flightsData.forEach((flight, i) => {
        positions.set(flight.positions, i * totalSegments * 3); 
      });

      geometry.setAttribute('position', new BufferAttribute(positions, 3));
      geometry.setAttribute('opacity', new BufferAttribute(opacities, 1));

      meshRef.current.geometry = geometry;
      meshRef.current.geometry.attributes.opacity.needsUpdate = true;
    }
  }, [flightsData]);

  useEffect(()=>{
    if (flightsData) {
      const flightsToShow = new Set();
      flightsData.forEach((flight, i) => {
        if (flight.metadata.arrival.iata === selectedAirport.iata_code || flight.metadata.departure.iata === selectedAirport.iata_code) {
          flightsToShow.add(i);
        }
      });
      setVisibleFlights(flightsToShow);
    }
  },[selectedAirport])

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

  useEffect(()=>{
    if (flightsData&&meshRef.current) {
      const colors = new Float32Array(flightsData.length * totalSegments * 3);
      flightsData.forEach((flight, i) => {
        for (let s = 0; s <= segments; s++) {
          const index = (i * totalSegments + s) * 3;
          const colorRatio = s / segments;
          if (darkmode) {
            // yellow-orange (dark)
            colors[index] = 1.0; 
            colors[index + 1] = 0.36 + 0.64 * colorRatio; 
            colors[index + 2] = 0.0; 
          } else {
            // blue-violet (light)
            colors[index] = 0.36 + 0.64 * colorRatio;
            colors[index + 1] = 0.0; 
            colors[index + 2] = 1.0; 
          }
        }
      });
      meshRef.current.geometry.setAttribute('color', new BufferAttribute(colors, 3));
      meshRef.current.geometry.attributes.color.needsUpdate = true;
    }
  }, [darkmode, flightsData])

  useEffect(() => {
    if (flightsData&&pointsRef.current) {
      const matrix = new Matrix4();
        flightsData.forEach((flight, i) => {
            const [x, y, z] = flight.positions;
            matrix.setPosition(x, y, z);
            pointsRef.current.setMatrixAt(i, matrix);
        });
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
      >
        <sphereGeometry args={[0.0075, 16, 16]} />
        <meshBasicMaterial color="#e8c73f" />
      </instancedMesh>
    </group>
  );
}

export default Flights;
