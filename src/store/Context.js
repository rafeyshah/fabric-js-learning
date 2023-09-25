import {
    createContext,
    useMemo,
    useRef,
    useState,
  } from 'react';

  export const CanvasStore = createContext(null);
  
  export function StoreContext({ children }) {
    const [canvasObj, setCanvasObj] = useState(null)
    const canvasRef = useRef(null);

    const canvasProviderValues = useMemo(() => ({
        canvasObj,
        setCanvasObj,
        canvasRef,
    }), [
        canvasObj,
        canvasRef,
    ]);
  
    return (
      <CanvasStore.Provider value={{ ...canvasProviderValues }}>
        {children}
      </CanvasStore.Provider>
    );
  }
  