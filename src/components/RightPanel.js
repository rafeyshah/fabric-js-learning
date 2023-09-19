import React, { useContext } from 'react'
import { fabric } from 'fabric';
import { CanvasStore } from '../store/Context';
import bug from '../bug.png'

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
            { x: 250, y: 180 },
            { x: 150, y: 180 },
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
        const line = new fabric.Line([50, 10, 200, 150], {
            stroke: '#CCF381'
        });

        canvasObj.add(line);
        canvasObj.setActiveObject(line)
        canvasObj.renderAll()
    }

    const addText = () => {
        const text = new fabric.Text("Hello World", {
            fontFamily: 'Comic Sans',
            fontSize: 20,
            top: 400,
            left: 100
        });

        canvasObj.add(text);
        canvasObj.setActiveObject(text)
        canvasObj.renderAll()
    }

    const editableText = () => {
        const textEditable = new fabric.Textbox(
            'Editable Textbox', {
            width: 500,
            editable: true
        });
        canvasObj.add(textEditable);
        canvasObj.setActiveObject(textEditable)
        canvasObj.renderAll()
    }

    const addPattern = () => {
        const image = new Image();
        image.src = bug;
        image.width = 100
        image.height = 100

        image.onload = () => {
            const repeatPattern = new fabric.Pattern({
                source: image,
                repeat: 'repeat'
            });

            const rect = new fabric.Rect({
                left: 100,
                top: 100,
                width: 400,
                height: 400,
                fill: repeatPattern,
                angle: 45
            });

            canvasObj.add(rect);
            canvasObj.setActiveObject(rect);
            canvasObj.renderAll();
        };

    }

    const addImage = () => {
        fabric.Image.fromURL(bug, function (oImg) {
            oImg.set({
                top: 100,
                left: 400,
                width: 250,
                height: 250,
                angle: 90
            })

            canvasObj.add(oImg);
            canvasObj.setActiveObject(oImg);
            canvasObj.renderAll();
        })
    }

    const addImageFromUrl = () => {
        const url = 'https://images.pexels.com/photos/1005012/pexels-photo-1005012.jpeg?auto=compress&cs=tinysrgb&w=600';

        fabric.Image.fromURL(url, function (oImg) {
            oImg.set({
                flipX: true,
                top: 100,
                left: 100,
            });

            oImg.scale(0.5)
            
            canvasObj.add(oImg);
            canvasObj.setActiveObject(oImg);
            canvasObj.renderAll();
        });
    }

    return (
        <div className='right-panel'>
            <div>
                <button onClick={addSquare}>Add Square</button>
                <button onClick={addRectangle}>Add Rectangle</button>
                <button onClick={addCircle}>Add Circle</button>
                <button onClick={addTriangle}>Add Triangle</button>
                <button onClick={addPolygon}>Add Polygon</button>
            </div>
            <div>
                <button onClick={line}>Add Line</button>
                <button onClick={addText}>Text</button>
                <button onClick={editableText}>Edit Text</button>
                <button onClick={addPattern}>Pattern</button>
            </div>
            <div>
                <button onClick={addImage}>Image (simple)</button>
                <button onClick={addImageFromUrl}>Image (URL)</button>
            </div>
        </div>
    )
}

export default RightPanel