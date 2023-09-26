import React, { useContext, useEffect, useRef } from 'react'
import { CanvasStore } from '../store/Context';
import { fabric } from 'fabric';
function Canvas() {
    const {
        canvasObj,
        setCanvasObj
    } = useContext(CanvasStore);


    const canvasRef = useRef(null);

    useEffect(() => {
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            width: 600,
            height: 600,
            enableRetinaScaling: true,
        });

        setCanvasObj(newCanvas)

        // Clean up the canvas when the component unmounts
        return () => {
            newCanvas.dispose();
        };
    }, []);

    const getActiveObject = (e) => {
        console.log("Called");
        console.log(canvasObj.getActiveObject());
    }

    return (
        <>
            <canvas id='canvas' onClick={getActiveObject} ref={canvasRef}></canvas>
        </>
    )
}

export default Canvas