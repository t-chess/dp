import { useEffect } from "react";
import * as THREE from "three";

const DataLayer = ({ geoJson }) => {
    const geometry = new THREE.Group();

    // latitude and longitude to 3D coords
    const latLongToVector3 = (lat, lon, radius=1) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        return new THREE.Vector3(x, y, z);
    }
  
    useEffect(() => {
      geoJson.features.forEach((feature) => {
        const bufferGeo = new THREE.BufferGeometry();
        const geoVertices = [];
  
        if (feature.geometry.type === "Polygon") {
          // for polygon the coords array contains a single polygon
          feature.geometry.coordinates.forEach((ring) => {
            ring.forEach(([lon, lat]) => {
              const vertex = latLongToVector3(lat, lon);
              geoVertices.push(vertex.x, vertex.y, vertex.z);
            });
          });
        } else if (feature.geometry.type === "MultiPolygon") {
          // For MultiPolygon iterate over multiple
          feature.geometry.coordinates.forEach((polygon) => {
            polygon.forEach((ring) => {
              ring.forEach(([lon, lat]) => {
                const vertex = latLongToVector3(lat, lon);
                geoVertices.push(vertex.x, vertex.y, vertex.z);
              });
            });
          });
        }
        bufferGeo.setAttribute('position',new THREE.Float32BufferAttribute(geoVertices, 3));
        const geoMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const geoMesh = new THREE.Line(bufferGeo, geoMaterial);
        geometry.add(geoMesh);
      });
    }, [geoJson]);
  
    if (geoJson) return <primitive object={geometry} />;
  }

  export default DataLayer;