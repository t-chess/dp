import React, { useRef, useState, useEffect } from 'react';
import { useData } from '../../hooks/useData';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import {BufferAttribute, CanvasTexture, Vector3} from 'three';

const canvas = document.createElement("canvas");
canvas.width = 20;
canvas.height = 20;
const context = canvas.getContext("2d");
context.beginPath();
context.arc(10, 10, 10, 0, Math.PI * 2);
context.fillStyle = "white";
context.fill();
const circleTexture = new CanvasTexture(canvas);


function Airports() {
    const ref = useRef();
    const { airportsData, setSelectedAirport, airportsColor } = useData();
    const { camera, mouse, raycaster, gl } = useThree();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const pointSize = 0.015 * window.devicePixelRatio;

    useEffect(() => {
        if (airportsData && ref.current) {
            ref.current.geometry.setAttribute(
                'color',
                new BufferAttribute(airportsData.colors, 3)
            );
        }
    }, [airportsData]);

    const handlePointerMove = () => {
        if (airportsData && ref.current) {
            raycaster.setFromCamera(mouse, camera);

            let nearestIntersection = null;
            let minDistance = Infinity;
            const threshold = 0.02;

            airportsData.metadata.forEach((airport, index) => {
                const position = new Vector3(
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
                        airportsData.colors[hoveredIndex * 3] = airportsColor[0];
                        airportsData.colors[hoveredIndex * 3 + 1] = airportsColor[1];
                        airportsData.colors[hoveredIndex * 3 + 2] = airportsColor[2];
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
                airportsData.colors[hoveredIndex * 3] = airportsColor[0];
                airportsData.colors[hoveredIndex * 3 + 1] = airportsColor[1];
                airportsData.colors[hoveredIndex * 3 + 2] = airportsColor[2];
                ref.current.geometry.attributes.color.needsUpdate = true;
                setHoveredIndex(null);
            }
        }
    };

    const handleClick = () => {
        if (hoveredIndex !== null) {
            setSelectedAirport(airportsData.metadata[hoveredIndex]);
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
                    <pointsMaterial vertexColors map={circleTexture} size={pointSize} sizeAttenuation={true} transparent={true} alphaTest={0.5} />
                </points>
            )}
        </>
    );
}

export default Airports;
