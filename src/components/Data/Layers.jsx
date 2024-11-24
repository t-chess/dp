import { memo, useEffect, useRef, useState } from "react";
import { useData } from "../../hooks/useData";
import { BufferGeometry, DoubleSide, Float32BufferAttribute, Group, Line, Mesh, MeshBasicMaterial, SphereGeometry } from "three";

const Layers = () => {
  const {layers} = useData();

  return layers.map(l=><GeoJson key={l.id} json={l.json} color={l.color} />)
}

export default Layers;


const GeoJson = memo(({ json, color  }) => {
    const geometryGroup = useRef(new Group());
    const materialsRef = useRef(new MeshBasicMaterial({ side: DoubleSide, depthTest: true }));
    const {latLongToVector3} = useData();

    const createVertices = (coordinates) =>
      coordinates.flatMap(([lon, lat]) => {
        const vertex = latLongToVector3(lat, lon);
        return [vertex.x, vertex.y, vertex.z];
      });
  
    const addGeometry = (vertices, isLine = true) => {
      const geometry = new BufferGeometry();
      geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
      const mesh = isLine
        ? new Line(geometry, materialsRef.current)
        : new Mesh(geometry, materialsRef.current);
      return mesh;
    };

    const initGeometry = () => {
      geometryGroup.current.clear(); 
      let data = json.type==="Feature"?[json]:json.features; // Feature or FeatureCollection

      data.forEach(feature => {
        const { type, coordinates } = feature.geometry;
  
        if (type === "Polygon" || type === "MultiPolygon") {
          const polygons = type === "Polygon" ? [coordinates] : coordinates;
          polygons.forEach((polygon) => {
            const vertices = polygon.flatMap((ring) => createVertices(ring));
            const line = addGeometry(vertices, true);
            line.userData = { feature };
            geometryGroup.current.add(line);
          });
        } else if (type === "Point" || type === "MultiPoint") {
          const points = type === "Point" ? [coordinates] : coordinates;
          points.forEach(([lon, lat]) => {
            const position = latLongToVector3(lat, lon);
            const pointGeometry = new SphereGeometry(0.005, 7, 7);
            const pointMesh = new Mesh(pointGeometry, materialsRef.current);
            pointMesh.position.set(position.x, position.y, position.z);
            pointMesh.userData = { feature };
            geometryGroup.current.add(pointMesh);
          });
        } else if (type === "LineString" || type === "MultiLineString") {
          const lines = type === "LineString" ? [coordinates] : coordinates;
          lines.forEach((lineString) => {
            const vertices = createVertices(lineString);
            const line = addGeometry(vertices, true);
            line.userData = { feature };
            geometryGroup.current.add(line);
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
