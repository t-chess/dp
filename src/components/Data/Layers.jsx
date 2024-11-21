import { memo, useEffect, useRef, useState } from "react";
import { useData } from "../../hooks/useData";
import { BufferGeometry, DoubleSide, Float32BufferAttribute, Group, Line, MeshBasicMaterial } from "three";

const Layers = () => {
  const {layers} = useData();

  return layers.map(l=><GeoJson key={l.id} json={l.json} color={l.color} />)
}

const GeoJson = memo(({ json, color  }) => {
    const geometryGroup = useRef(new Group());
    const materialsRef = useRef(new MeshBasicMaterial({ side: DoubleSide, depthTest: true }));
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
            const bufferGeo = new BufferGeometry();
            bufferGeo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
            const mesh = new Line(bufferGeo, materialsRef.current);
            mesh.userData = { feature }; 
            geometryGroup.current.add(mesh);
          });
        }
      });
    }
  
    useEffect(() => {
      if (json) initGeometry();
    }, [json]);

    useEffect(()=>{
      if (color&&materialsRef.current) materialsRef.current.color.set(color)
    }, [color])
  
    if (json) return <primitive object={geometryGroup.current} />;
  })

  export default Layers;