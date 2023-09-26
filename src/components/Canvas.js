import React, { useContext, useEffect, useRef } from 'react'
import { CanvasStore } from '../store/Context';
import { fabric } from 'fabric';
function Canvas() {
    const {
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

    return (
        <>
            <canvas id='canvas' ref={canvasRef}></canvas>
        </>
    )
}

export default Canvas