import {TextureLoader} from 'three';
import { useLoader } from '@react-three/fiber';
import GeoJson from './GeoJson';
import { useData } from '../../hooks/useData';
import Flights from './Flights';
import Airports from './Airports';


const Globe = () => {
  const {radius,borders} = useData();
  // const mercator  = useLoader(TextureLoader, '/data/Mercator_projection.jpg'); // https://commons.wikimedia.org/wiki/File:Mercator_projection_Square.JPG
  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color="#87ceeb" wireframe={false} />
      </mesh>
      {borders&&<GeoJson color={0xFFFFFF} json={borders} />}

      <Airports />
      <Flights />
    </group>
  );
}

export default Globe;
