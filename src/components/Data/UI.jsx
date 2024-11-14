import { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";

const UI = () => {
    const {selectedAirport, allFlights, setAllFlights} = useData();

    return (
        <div className="ui">
            {selectedAirport && (
                <div className="selectedAirport">
                    <strong>Airport's name: {selectedAirport.airport_name}<br />
                    Country: {selectedAirport.country_name}</strong><br/>
                    Airport's IATA Code: {selectedAirport.iata_code}<br />
                    Timezone: {selectedAirport.timezone}
                </div>
            )}
            <div className="toggles">
                <label>
                    <input checked={allFlights} onChange={(e)=>setAllFlights(e.target.checked)} type="checkbox" />
                    <span>Show all flights</span>
                </label>
            </div>
        </div>
    )
}

export default UI;