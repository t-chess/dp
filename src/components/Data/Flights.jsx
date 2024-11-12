import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../../hooks/useData';
import { BufferAttribute } from 'three';

function Flights() {
    const ref = useRef();
    const {flightsData} = useData();

    useEffect(() => {
        if (ref.current && flightsData) {
            ref.current.setAttribute('position', new BufferAttribute(flightsData.positions, 3));
            ref.current.setAttribute('color', new BufferAttribute(flightsData.colors, 3));
        }
    }, [flightsData]);

     if (flightsData) return (
        <line>
            <bufferGeometry ref={ref} />
            <lineBasicMaterial vertexColors />
        </line>
    );
}



export default Flights;