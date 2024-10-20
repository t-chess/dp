import { useGLTF } from "@react-three/drei";
import { createContext, forwardRef, useContext } from "react";

const ModelContext = createContext();
export const ModelProvider = forwardRef(({ children, src }, ref) => {
  const data = useGLTF(src);

  if (data)
    return (
      <ModelContext.Provider value={{ data, ref }}>
        {children}
      </ModelContext.Provider>
    );
});

export const useModel = () => {
  return useContext(ModelContext);
};
