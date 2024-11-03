import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [borders, setBorders] = useState();

    useEffect(()=>{
        fetch("/countries.geo.json")
        .then((response) => response.json())
        .then((data) => setBorders(data))
        .catch((error) => console.error("err in borders file", error));
    },[])

    return <DataContext.Provider value={{borders}}>{children}</DataContext.Provider>
}

export const useData = () => {
    return useContext(DataContext);
}