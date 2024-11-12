import React, { useRef, useState, useEffect } from 'react';
import { useData } from '../../hooks/useData';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

function Airports() {
    const ref = useRef();
    const { airportsData } = useData();
    const { camera, mouse, raycaster, gl } = useThree();
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const pointSize = 0.01 * window.devicePixelRatio;

    useEffect(() => {
        if (airportsData && ref.current) {
            ref.current.geometry.setAttribute(
                'color',
                new THREE.BufferAttribute(airportsData.colors, 3)
            );
        }
    }, [airportsData]);

    const handlePointerMove = () => {
        if (airportsData && ref.current) {
            raycaster.setFromCamera(mouse, camera);

            let nearestIntersection = null;
            let minDistance = Infinity;
            const threshold = 0.01;

            airportsData.metadata.forEach((airport, index) => {
                const position = new THREE.Vector3(
                    airportsData.positions[index * 3],
                    airportsData.positions[index * 3 + 1],
                    airportsData.positions[index * 3 + 2]
                );

                const distanceToRay = raycaster.ray.distanceToPoint(position);
                if (distanceToRay < threshold && distanceToRay < minDistance) {
                    minDistance = distanceToRay;
                    nearestIntersection = index;
                }
            });

            if (nearestIntersection !== null) {
                if (hoveredIndex !== nearestIntersection) {
                    // reset 
                    if (hoveredIndex !== null) {
                        airportsData.colors[hoveredIndex * 3] = 0;      // R
                        airportsData.colors[hoveredIndex * 3 + 1] = 0;  // G
                        airportsData.colors[hoveredIndex * 3 + 2] = 1;  // B
                    }

                    // set new 
                    airportsData.colors[nearestIntersection * 3] = 1;      // R
                    airportsData.colors[nearestIntersection * 3 + 1] = 0.5;  // G
                    airportsData.colors[nearestIntersection * 3 + 2] = 0;  // B

                    ref.current.geometry.attributes.color.needsUpdate = true;
                    setHoveredIndex(nearestIntersection);
                }
            } else if (hoveredIndex !== null) {
                // reset 
                airportsData.colors[hoveredIndex * 3] = 0;
                airportsData.colors[hoveredIndex * 3 + 1] = 0;
                airportsData.colors[hoveredIndex * 3 + 2] = 1;
                ref.current.geometry.attributes.color.needsUpdate = true;
                setHoveredIndex(null);
            }
        }
    };

    const handleClick = () => {
        if (hoveredIndex !== null) {
            setSelectedAirport(airportsData.metadata[hoveredIndex]);
        } else {
            setSelectedAirport(null);
        }
    };

    useEffect(() => {
        gl.domElement.addEventListener('mousemove', handlePointerMove);
        gl.domElement.addEventListener('click', handleClick);

        return () => {
            gl.domElement.removeEventListener('mousemove', handlePointerMove);
            gl.domElement.removeEventListener('click', handleClick);
        };
    }, [gl, handlePointerMove, handleClick]);

    return (
        <>
            {airportsData && (
                <points ref={ref}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            array={airportsData.positions}
                            count={airportsData.positions.length / 3}
                            itemSize={3}
                        />
                        <bufferAttribute
                            attach="attributes-color"
                            array={airportsData.colors}
                            count={airportsData.colors.length / 3}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <pointsMaterial vertexColors size={pointSize} />
                </points>
            )}

            {selectedAirport && (
                <Html style={{ position: 'absolute', left: '15px', bottom: '15px', pointerEvents: 'none' }}>
                    <div style={{
                        background: 'white',
                        padding: '5px',
                        borderRadius: '3px',
                        color: 'black'
                    }}>
                        <strong>{selectedAirport.iata_code}</strong><br />
                        {selectedAirport.airport_name + ", " + selectedAirport.country_name}
                    </div>
                </Html>
            )}
        </>
    );
}

export default Airports;
