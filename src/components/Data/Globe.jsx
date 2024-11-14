import {TextureLoader} from 'three';
import { useLoader } from '@react-three/fiber';
import GeoJson from './GeoJson';
import { useData } from '../../hooks/useData';
import Flights from './Flights';
import Airports from './Airports';


const Globe = () => {
  const {borders,radius} = useData();
  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color={0x222222} wireframe={false} />
      </mesh>
      {borders&&<GeoJson color={0x919191} json={borders} />}

      <Airports />
      <Flights />
    </group>
  );
}

export default Globe;
