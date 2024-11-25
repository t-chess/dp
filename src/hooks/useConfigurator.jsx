import { createContext, useContext, useState } from "react";

const mainColors = [
  { color: "#1f3b73", name: "blue" },
  { color: "#C0C0C0", name: "silver" },
  { color: "#484848", name: "black" },
  { color: "#ffd700", name: "yellow" }
];

const stripesColors = [
  { color: "#f0f0f0", name: "white" },
  { color: "#484848", name: "black" },
  { color: "#1f3b73", name: "blue" },
  { color: "#ff69b4", name: "hot_pink" }
];

const seats = [
  {color: "#484848",name: "leather"},
  {color: "#484848",name: "fabric"}
]

const ConfiguratorContext = createContext({});

export const ConfiguratorProvider = ({children}) => {
  const [wheels, setWheels] = useState(1);
  const [lights, setLights] = useState(true);
  const [mainColor, setMainColor] = useState(mainColors[0]);
  const [stripesColor, setStripesColor] = useState(stripesColors[0]);

  const [mode, setMode] = useState();
  const [seat, setSeat] = useState(seats[0].name);

  return (
    <ConfiguratorContext.Provider
      value={{
        wheels, setWheels,
        lights, setLights,
        mainColors,mainColor, setMainColor,
        stripesColors, stripesColor, setStripesColor,
        seats,seat,setSeat,
        mode, setMode
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  const context = useContext(ConfiguratorContext);
  return context;
};
