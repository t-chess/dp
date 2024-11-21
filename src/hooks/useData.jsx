import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CatmullRomCurve3, Color, QuadraticBezierCurve3, Vector3 } from "three";

const DataContext = createContext();

export const DataProvider = ({radius, children}) => {
    const [layers, setLayers] = useState([]);

    const [allFlights, setAllFlights] = useState(false);

    const [airports, setAirports] = useState();
    const [selectedAirport, setSelectedAirport] = useState(null); 

    const color = new Color("#75123f");
    const airportsColor = [color.r, color.g, color.b];
    const segments = 8;


    const [flights, setFlights] = useState();
    const timerange = [new Date('2024-11-12T00:05:00+00:00').getTime(), new Date('2024-11-14T01:00:00').getTime()];
    
    const latLongToVector3 = (lat, lon) => {
        if (isNaN(lat)||isNaN(lon)) {
            return new Vector3(0,0,0)
        }
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = lon * (Math.PI / 180);
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        return new Vector3(x, y, z);
    }

    const createCurve = (start, end) => {
        const midPoint = new Vector3().addVectors(start, end).normalize().multiplyScalar(radius * 1.3);
        const curve = new QuadraticBezierCurve3(start, midPoint, end);
        const arcPoints = curve.getPoints(segments).flatMap(point => [point.x, point.y, point.z]);
        return arcPoints;
    };

    const fetchAirports = () => {
        fetch('/data/ALL_AIRPORTS.json')
            .then((response) => response.json())
            .then((data) => {
                const airportLocations = data.reduce((acc, airport) => {
                    acc[airport.iata_code] = {
                        latitude: parseFloat(airport.latitude),
                        longitude: parseFloat(airport.longitude),
                        ...airport
                    };
                    return acc;
                }, {});
                setAirports(airportLocations); 
            })
            .catch((error) => console.error("Error fetching airports:", error));
    };
    const airportsData = useMemo(() => {
        if (airports) {
            const positions = new Float32Array(Object.keys(airports).length * 3);
            const colors = new Float32Array(Object.keys(airports).length * 3); 
    
            const metadata = [];
    
            Object.values(airports).forEach((airport, index) => {
                const lat = parseFloat(airport.latitude);
                const lon = parseFloat(airport.longitude);
                const vector = latLongToVector3(lat, lon);
    
                positions[index * 3] = vector.x;
                positions[index * 3 + 1] = vector.y;
                positions[index * 3 + 2] = vector.z;
    
                colors[index * 3] = airportsColor[0];
                colors[index * 3 + 1] = airportsColor[1];  
                colors[index * 3 + 2] = airportsColor[2];  
    
                metadata.push({
                    ...airport,
                    position: vector,
                });
            });
    
            return { positions, colors, metadata };
        }
        return null;
    }, [airports]);

    const fetchFlights = () => {
        fetch('/data/UNIQUE_FLIGHTS.json')
            .then((response) => response.json())
            .then((data) => setFlights(data))
            .catch((error) => console.error("Error fetching flights:", error));
    };
    
    const flightsData = useMemo(() => {
        if (!airports || !flights) return null
        return flights.map(flight => {
                const departureAirport = airports[flight.departure.iata];
                const arrivalAirport = airports[flight.arrival.iata];
                if (!departureAirport || !arrivalAirport) return null;

                const departurePos = latLongToVector3(departureAirport.latitude, departureAirport.longitude);
                const arrivalPos = latLongToVector3(arrivalAirport.latitude, arrivalAirport.longitude);
                const curvePoints = createCurve(departurePos, arrivalPos);

                const positions = new Float32Array(curvePoints.length);
                const colors = new Float32Array(curvePoints.length);

                curvePoints.forEach((coord, index) => {
                    positions[index] = coord;
                });
                for (let s = 0; s <= segments; s++) {
                    const colorRatio = s / segments;
                    colors[s * 3] = 1.0; // Red remains fully intense at 1.0 for both colors
                    colors[s * 3 + 1] = 0.36 + 0.64 * colorRatio; // Green goes from 0.36 to 1.0
                    colors[s * 3 + 2] = 0.0; // Blue remains 0 to keep within the orange-yellow range
                }
                return {
                    positions,
                    colors,
                    metadata: flight,
                };
            }).filter(Boolean); 
    }, [flights]);

    const fetchBorders = () => {
        fetch('/data/countries.geo.json')
            .then((response) => response.json())
            .then((data) => setLayers([{id:1, color: "#4f4f4f", name:'Countries', json:data}]))
            .catch((error) => console.error("err in borders", error));
    }

    useEffect(()=>{
        fetchAirports();
        fetchBorders();
    },[])

    useEffect(()=>{
        if (airports) {
            fetchFlights();
        }
    },[airports])
    return <DataContext.Provider value={{latLongToVector3, radius, layers, setLayers, flightsData, airportsData, selectedAirport, airportsColor, segments, setSelectedAirport, allFlights, setAllFlights}}>{children}</DataContext.Provider>
}

export const useData = () => {
    return useContext(DataContext);
}