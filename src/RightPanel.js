import React, { useContext } from 'react'
import { fabric } from 'fabric';
import { CanvasStore } from './store/Context';

function RightPanel() {
    const {
        canvasObj
    } = useContext(CanvasStore);

    const addSquare = () => {
        const square = new fabric.Rect({
            left: 100,
            top: 50,
            fill: '#00539C',
            width: 50,
            height: 50,
        });

        canvasObj.add(square);
        canvasObj.setActiveObject(square)
        canvasObj.renderAll()
    }

    const addRectangle = () => {
        const rect = new fabric.Rect({
            left: 100,
            top: 130,
            fill: '#EEA47F',
            width: 100,
            height: 50
        })

        canvasObj.add(rect);
        canvasObj.setActiveObject(rect)
        canvasObj.renderAll()
    }

    const addCircle = () => {
        const circle = new fabric.Circle({
            radius: 25,
            fill: '#FBEAEB',
            left: 100,
            top: 180
        })

        canvasObj.add(circle);
        canvasObj.setActiveObject(circle)
        canvasObj.renderAll()
    }

    const addTriangle = () => {
        const triangle = new fabric.Triangle({
            width: 120,
            height: 150,
            fill: '#F9E795',
            left: 100,
            top: 230
        });

        canvasObj.add(triangle);
        canvasObj.setActiveObject(triangle)
        canvasObj.renderAll()
    }

    const addPolygon = () => {
        const polygonPoints = [
            { x: 200, y: 10 },
            { x: 250, y: 50 },
            { x: 250, y: 180},
            { x: 150, y: 180},
            { x: 150, y: 50 }
        ];

        const polygon = new fabric.Polygon(polygonPoints, {
            fill: '#F96167',
            left: 300,
            top: 300,
        });

        canvasObj.add(polygon)
        canvasObj.setActiveObject(polygon)
        canvasObj.renderAll()
    }

    const line = () => {
        var line = new fabric.Line([50, 10, 200, 150], {
            stroke: '#CCF381'
        });
  
        canvasObj.add(line);
        canvasObj.setActiveObject(line)
        canvasObj.renderAll()
    }

    return (
        <>
            <div className='right-panel'>
                <button onClick={addSquare}>Add Square</button>
                <button onClick={addRectangle}>Add Rectangle</button>
                <button onClick={addCircle}>Add Circle</button>
                <button onClick={addTriangle}>Add Triangle</button>
                <button onClick={addPolygon}>Add Polygon</button>
                <button onClick={line}>Add Line</button>
            </div>
        </>
    )
}

export default RightPanel