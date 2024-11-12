import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CatmullRomCurve3, QuadraticBezierCurve3, Vector3 } from "three";

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [borders, setBorders] = useState(); 

    const [flights, setFlights] = useState();
    const [airports, setAirports] = useState();
    const radius = 1;

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
    
                colors[index * 3] = 0;      // R
                colors[index * 3 + 1] = 0;  // G
                colors[index * 3 + 2] = 1;  // B
    
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


    const createCurve = (start, end, segments) => {
        const midPoint = new Vector3().addVectors(start, end).normalize().multiplyScalar(radius * 1.3);
        const curve = new QuadraticBezierCurve3(start, midPoint, end);
        const arcPoints = curve.getPoints(segments).flatMap(point => [point.x, point.y, point.z]);
        console.log(arcPoints)
        return arcPoints;
    };
    
    const flightsData = useMemo(() => {
        if (!airports || !flights) return null
        const segments = 8;
        const pointsPerFlight = segments + 1; 
        const totalPoints = flights.reduce((count, flight) => {
            const departureAirport = airports[flight.departure.iata];
            const arrivalAirport = airports[flight.arrival.iata];
            return departureAirport && arrivalAirport ? count + pointsPerFlight : count;
        }, 0);
        const positions = new Float32Array(totalPoints * 3);
        const colors = new Float32Array(totalPoints * 3);
        const metadata = [];

        let currentIndex = 0; 
        flights.forEach((flight, i) => {
            const departureAirport = airports[flight.departure.iata];
            const arrivalAirport = airports[flight.arrival.iata];
            if (!departureAirport || !arrivalAirport) return; 
            const departurePos = latLongToVector3(departureAirport.latitude, departureAirport.longitude);
            const arrivalPos = latLongToVector3(arrivalAirport.latitude, arrivalAirport.longitude);

            const curve = createCurve(departurePos, arrivalPos, segments);
            curve.forEach((coord, j) => {
                positions[currentIndex * 3 + j] = coord;
            });    
            for (let s = 0; s <= segments; s++) {
                const colorRatio = s / segments;
                colors[currentIndex * 3 + s * 3] = colorRatio;     // Red channel
                colors[currentIndex * 3 + s * 3 + 1] = 0;          // Green channel
                colors[currentIndex * 3 + s * 3 + 2] = 1 - colorRatio; // Blue channel
            }
            metadata.push(flight);
            currentIndex += pointsPerFlight;
        });

        return { positions, colors, metadata };
    }, [flights]);
    

    useEffect(()=>{
        fetchAirports();
        fetchBorders();
    },[])

    useEffect(()=>{
        if (airports) {
            fetchFlights();
        }
    },[airports])

    const fetchBorders = () => {
        fetch('/data/countries.geo.json')
            .then((response) => response.json())
            .then((data) => setBorders(data))
            .catch((error) => console.error("err in borders", error));
    }

    return <DataContext.Provider value={{latLongToVector3, radius, borders, flightsData, airportsData}}>{children}</DataContext.Provider>
}

export const useData = () => {
    return useContext(DataContext);
}