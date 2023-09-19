import React, { useContext } from 'react'
import { fabric } from 'fabric';
import { CanvasStore } from './store/Context';

function RightPanel() {
    const {
        canvasObj
    } = useContext(CanvasStore);

    const addSquare = () => {
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 50,
            height: 50,
        });

        canvasObj.add(rect);
        canvasObj.setActiveObject(rect)
        canvasObj.renderAll()
    }
    return (
        <>
            <button onClick={addSquare}>Add Square</button>
        </>
    )
}

export default RightPanel