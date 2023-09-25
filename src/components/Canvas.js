import React, { useContext, useEffect, useRef } from 'react'
import { CanvasStore } from '../store/Context';
import { fabric } from 'fabric';
function Canvas() {
    const {
        setCanvasObj,
        image,
        setImage
    } = useContext(CanvasStore);


    const canvasRef = useRef(null);
    const imageRef = useRef(null)

    useEffect(() => {
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            width: 600,
            height: 600,
        });

        setCanvasObj(newCanvas)
        setImage(imageRef)

        // Clean up the canvas when the component unmounts
        return () => {
            newCanvas.dispose();
        };
    }, []);

    return (
        <>
            <canvas id='canvas' ref={canvasRef}></canvas>
            Image:
            <img ref={imageRef} />
        </>
    )
}

export default Canvas