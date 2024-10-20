import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
  const [mode, setMode] = useState("static");

  const [skydomeRadius, setSkydomeRadius] = useState(300);

  const [FOV, setFOV] = useState(50);

  // useEffect(()=>{
  //   if (mode==='dynamic') {}
  // }, [mode])
  return (
    <SceneContext.Provider
      value={{
        skydomeRadius,
        setSkydomeRadius,
        FOV,
        setFOV,
        mode,
        setMode,
      }}
    >
      <Outlet />
    </SceneContext.Provider>
  );
};

export const useScene = () => {
  return useContext(SceneContext);
};
