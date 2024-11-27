import { createContext, useContext, useRef, useState } from "react";

const GameContext = createContext({});

export const GameProvider = ({children}) => {
  const [berries, setBerries] = useState(0);
  
  return (
    <GameContext.Provider
      value={{
        berries, setBerries
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  return context;
};
