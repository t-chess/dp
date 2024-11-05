import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [layers, setLayers] = useState([]);

    const pushToLayers = (data) => {
        setLayers(prev=>([...prev, {id:prev[prev.length-1]?.id+1||1, json:data}]))
    }

    const changeInfo = (id, data) => {
        setLayers(prev=>prev.map(layer=>
            layer.id===id ? {...layer, ...data} : layer
        ))
    }

    return <DataContext.Provider value={{layers,pushToLayers, changeInfo}}>{children}</DataContext.Provider>
}

export const useData = () => {
    return useContext(DataContext);
}