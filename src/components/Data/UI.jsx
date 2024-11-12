import { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import LayerUI from "./LayerUI";

const UI = () => {
    const {layers, pushToLayers} = useData();

    const loadFile = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();
        fileReader.readAsText(e.target[0].files[0], "UTF-8");
        fileReader.onload = e => {
            pushToLayers(JSON.parse(e.target.result));
        };
        e.target.reset()

    }

    const fetchURL = (value) => {
        // e.preventDefault();
        fetch(value)
            .then((response) => response.json())
            .then((data) => pushToLayers(data))
            .catch((error) => console.error("err in url", error));
    }

    useEffect(()=>{
        fetchURL('/countries.geo.json')
    },[])

    return (
        <>
            <div className="data_ui_left">
                <div  className='item'>
                    <label>Upload geoJSON from file</label>
                    <form onSubmit={loadFile}>
                        <input type="file" required /><button type="submit">OK</button>
                    </form>
                </div>
                <div  className='item'>
                    <label>or URL</label>
                    <form onSubmit={fetchURL}>
                        <input type="url" placeholder="URL" required /><button type="submit">OK</button>
                    </form>
                </div>
                <div  className='item'>
                    <label>or type it</label>
                    <form>
                        <textarea required></textarea><button type="submit">OK</button>
                    </form>
                </div>
            </div>
            <div className="data_ui_right">
                <h3>Layers</h3>
                <div>
                    {layers.map(layer=><LayerUI key={layer.id} {...layer} />)}
                </div>
            </div>
        </>
    )
}

export default UI;


// https://raw.githubusercontent.com/openlayers/openlayers/refs/heads/main/examples/data/geojson/polygon-samples.geojson