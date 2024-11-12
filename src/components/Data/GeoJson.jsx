import { useThree } from "@react-three/fiber";
import { memo, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useData } from "../../hooks/useData";

const GeoJson = memo(({ json, color = 0x000000  }) => {
    const geometryGroup = useRef(new THREE.Group());
    const materialsRef = useRef(null);
    const {latLongToVector3} = useData();

    const initGeometry = () => {
      geometryGroup.current.clear(); 
      let data = json.type==="Feature"?[json]:json.features; 
      data.forEach((feature) => {
        if (feature.geometry.type === "Polygon"||feature.geometry.type === "MultiPolygon") {
          const polygons = feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates;
          polygons.forEach((polygon) => {
            const vertices = [];
            polygon.forEach((ring) => {
              ring.forEach(([lon, lat]) => {
                const vertex = latLongToVector3(lat, lon);
                vertices.push(vertex.x, vertex.y, vertex.z);
              });
            });
            const bufferGeo = new THREE.BufferGeometry();
            bufferGeo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
            const geoMaterial = new THREE.MeshBasicMaterial({
              color,
              side: THREE.DoubleSide,
              depthTest: true
            });
            const mesh = new THREE.Line(bufferGeo, geoMaterial);
            mesh.userData = { feature }; // !!!
            geometryGroup.current.add(mesh);
          });
        }
      });
    }
  
    useEffect(() => {
      initGeometry();
    }, [json]);

    useEffect(()=>{
      if (color) materialsRef.current?.color.set(color)
    }, [color])
  
    if (json) return <primitive object={geometryGroup.current} />;
  })

  export default GeoJson;