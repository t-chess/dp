import { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";

const UI = () => {
    const {selectedAirport, allFlights, setAllFlights, layers, setLayers} = useData();

    const [open,setOpen] = useState(false);

    const pushToLayers = (data) => {
        setLayers(prev=>([...prev, {id:prev[prev.length-1]?.id+1||1, json:data, color:"#000000"}]))
    }
    const changeInfo = (id, data) => {
        setLayers(prev=>prev.map(layer=>
            layer.id===id ? {...layer, ...data} : layer
        ))
    }

    const loadFile = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();
        fileReader.readAsText(e.target[0].files[0], "UTF-8");
        fileReader.onload = e => {
            pushToLayers(JSON.parse(e.target.result));
        };
        e.target.reset()
    }

    return (
        <>
            <div className="layers">
                <button onClick={()=>setOpen(!open)} className="toggle">{open?'Hide':'Show'}</button>
                {open&&<div className="layerUI"><form onSubmit={loadFile}>
                    <label><h3>Upload geoJSON:</h3></label>
                    <input type='file' />
                    <button type="submit">OK</button>
                </form></div>}
                {open&&layers.map(layer=><LayerUI key={layer.id} {...layer} onChange={changeInfo} />)}
            </div>
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
        </>
    )
}

const LayerUI = ({id, name, color, onChange}) => {
    const [edit, setEdit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEdit(false)
        onChange(id, {name:e.target[0].value, color:e.target[1].value});
    }
    return (
        <div className="layerUI">
            {!edit?
            <div>
                <h3>{name||`Layer ${id}`}</h3>
                <p>Color: <span style={{backgroundColor:color}}></span></p>
                <button onClick={()=>setEdit(true)}>Edit</button>
            </div> :
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Name:</p>
                    <input defaultValue={name} size="1" />
                </label>
                <label>
                    <p>Color:</p>
                    <input type="color" defaultValue={color} />
                </label>
                <button onClick={()=>setEdit(false)}>Back</button>
                <button type="submit" >Save</button>
            </form>
            }
        </div>
    )
}

export default UI;