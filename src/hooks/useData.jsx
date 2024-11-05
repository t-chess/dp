import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [layers, setLayers] = useState([]);

    const pushToLayers = (data) => {
        setLayers(prev=>([...prev, {id:prev[prev.length-1]?.id+1||1, json:data}]))
    }

    return <DataContext.Provider value={{layers,pushToLayers}}>{children}</DataContext.Provider>
}

export const useData = () => {
    return useContext(DataContext);
}