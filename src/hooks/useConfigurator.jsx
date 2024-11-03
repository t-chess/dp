import { createContext, useContext, useState } from "react";

const surfaceColors = [
  {
    color: "#683434",
    name: "red",
  },
  {
    color: "#1a5e1a",
    name: "green",
  },
  {
    color: "#659994",
    name: "blue",
  },
  {
    color: "#ffa500",
    name: "yellow",
  },
]

const insidesColors = [
  {
    color: "#683434",
    name: "brown",
  },
  {
    color: "#1a5e1a",
    name: "green",
  }
];

const ConfiguratorContext = createContext({});

export const ConfiguratorProvider = (props) => {
  const [wheels, setWheels] = useState(1);
  const [lights, setLights] = useState(false);
  const [surfaceColor, setSurfaceColor] = useState(surfaceColors[0]);

  const [mode, setMode] = useState('main');
  const [insidesColor, setInsidesColor] = useState(insidesColors[0]);

  return (
    <ConfiguratorContext.Provider
      value={{
        wheels, setWheels,
        lights, setLights,
        surfaceColors,surfaceColor,setSurfaceColor,
        insidesColors,insidesColor,setInsidesColor,
        mode, setMode
      }}
    >
      {props.children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  const context = useContext(ConfiguratorContext);
  return context;
};
