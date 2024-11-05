import { useThree } from "@react-three/fiber";
import { memo, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// latitude and longitude to 3D coords
const latLongToVector3 = (lat, lon, radius=1.01) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

const DataLayer = memo(({ json, color = 0x000000  }) => {
    const geometryGroup = useRef(new THREE.Group());
    const materialsRef = useRef(null);
    const { camera, gl } = useThree();

    const [hovered, setHovered] = useState();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

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
      console.log('geometry init');
    }
  
    useEffect(() => {
      initGeometry();
    }, [json]);

    useEffect(()=>{
      if (color) materialsRef.current?.color.set(color)
    }, [color])

    useEffect(() => {
      const handleMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(geometryGroup.current.children, true);
  
        setHovered(intersects.length > 0?intersects[0].object.userData.feature:null); 
      };
  
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [camera]);
  
    if (json) return <primitive object={geometryGroup.current} />;
  })

  export default DataLayer;