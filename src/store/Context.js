import {
    createContext,
    useMemo,
    useRef,
    useState,
  } from 'react';

  export const CanvasStore = createContext(null);
  
  export function StoreContext({ children }) {
    const [canvasObj, setCanvasObj] = useState(null)
    const [menuPanel, setMenuPanel] = useState("simple");

    const canvasRef = useRef(null);

    const canvasProviderValues = useMemo(() => ({
        canvasObj,
        setCanvasObj,
        canvasRef,
        menuPanel,
        setMenuPanel
    }), [
        canvasObj,
        canvasRef,
        menuPanel
    ]);
  
    return (
      <CanvasStore.Provider value={{ ...canvasProviderValues }}>
        {children}
      </CanvasStore.Provider>
    );
  }
  