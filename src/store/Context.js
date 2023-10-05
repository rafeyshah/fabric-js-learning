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
    const [activeObject, setActiveObject] = useState()
    const [textEditable, setTextEditable] = useState(null)

    const canvasRef = useRef(null);

    const canvasProviderValues = useMemo(() => ({
        canvasObj,
        setCanvasObj,
        canvasRef,
        menuPanel,
        setMenuPanel,
        activeObject,
        setActiveObject,
        textEditable,
        setTextEditable
    }), [
        canvasObj,
        canvasRef,
        menuPanel,
        activeObject,
        textEditable
    ]);
  
    return (
      <CanvasStore.Provider value={{ ...canvasProviderValues }}>
        {children}
      </CanvasStore.Provider>
    );
  }
  