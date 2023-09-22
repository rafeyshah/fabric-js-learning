import React, { useContext } from 'react'
import { fabric } from 'fabric';
import { CanvasStore } from '../store/Context';
import bug from '../bug.png'
import svgPath from './bench.svg'
import Button from 'react-bootstrap/Button';
function Simple() {
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

    const firstGradient = () => {
        const circle = new fabric.Circle({
            left: 100,
            top: 100,
            radius: 50
        });

        const gradient = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'pixels',
            coords: { x1: 0, y1: 0, x2: 0, y2: circle.height },
            colorStops: [
                { offset: 0, color: '#000' },
                { offset: 1, color: '#fff' }
            ]
        })

        circle.set('fill', gradient);

        canvasObj.add(circle)
        canvasObj.setActiveObject(circle)
        canvasObj.renderAll()
    }

    const secondGradient = () => {
        const triangle = new fabric.Triangle({
            left: 500,
            top: 200,
            width: 120,
            height: 150
        })

        const gradient = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'percentage',
            coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
            colorStops: [
                { offset: 0, color: 'red' },
                { offset: 0.2, color: 'orange' },
                { offset: 0.4, color: 'yellow' },
                { offset: 0.6, color: 'green' },
                { offset: 0.8, color: 'blue' },
                { offset: 1, color: 'purple' }
            ]
        })

        triangle.set('fill', gradient)

        canvasObj.add(triangle)
        canvasObj.setActiveObject(triangle)
        canvasObj.renderAll()
    }

    const thirdGradient = () => {
        const rect = new fabric.Rect({
            left: 250,
            top: 250,
            width: 150,
            height: 150,
            angle: 75
        })

        const gradient = new fabric.Gradient({
            type: 'radial',
            gradientUnits: 'pixels',
            coords: { r1: 0, r2: 75, x1: 75, y1: 75, x2: 75, y2: 75 },
            colorStops: [
                { offset: 0, color: '#000' },
                { offset: 1, color: '#fff' }
            ]
        })

        rect.set('fill', gradient)

        canvasObj.add(rect)
        canvasObj.setActiveObject(rect)
        canvasObj.renderAll()
    }

    const arcOne = () => {
        const startPoint = new fabric.Point(50, 50);
        const endPoint = new fabric.Point(350, 350);
        const controlPoint = new fabric.Point(500, 100);
        const pathString = `M ${startPoint.x} ${startPoint.y} Q ${controlPoint.x} ${controlPoint.y} ${endPoint.x} ${endPoint.y}`;

        const curvedLine = new fabric.Path(pathString, {
            stroke: 'blue',
            strokeWidth: 2,
            fill: '',
            selectable: false
        });


        canvasObj.add(curvedLine);
        canvasObj.setActiveObject(curvedLine)
        canvasObj.renderAll()
    }

    const arcTwo = () => {
        const curvedCircle = new fabric.Circle({
            radius: 150,
            left: 100,
            top: 100,
            angle: 0,
            startAngle: 0,
            endAngle: 180,
            stroke: '#000',
            strokeWidth: 3,
            fill: 'red'
        });

        const moreHalf = new fabric.Circle({
            radius: 150,
            left: 100,
            top: 100,
            angle: 0,
            startAngle: 180,
            endAngle: 270,
            stroke: '#000',
            strokeWidth: 3,
            fill: 'red'
        })

        const triangle = new fabric.Triangle({
            left: 100,
            top: 100,
            width: 250,
            height: 250,
            fill: 'red',
            stroke: '#000',
            strokeWidth: 3,
        })

        const group = new fabric.Group([curvedCircle, moreHalf, triangle], {
            left: 300,
            top: 100,
            angle: -10
        })

        canvasObj.add(group)
        canvasObj.setActiveObject(group)
        canvasObj.renderAll()
    }

    const arcThree = () => {
        // const startPoint = new fabric.Point(50, 50);
        // const endPoint = new fabric.Point(350, 350);
        // const controlPoint = new fabric.Point(500, 100);
        // const pathString = `M ${startPoint.x} ${startPoint.y} Q ${controlPoint.x} ${controlPoint.y} ${endPoint.x} ${endPoint.y}`;

        const curvedLine = new fabric.Path(`M 50 50 Q 300 20 200 200`, {
            stroke: 'blue',
            strokeWidth: 2,
            fill: '',
        });
        const curvedLineTwo = new fabric.Path(`M 100 100 Q 20 300 300 300`, {
            stroke: 'blue',
            strokeWidth: 2,
            fill: '',
        });
        const curvedLineThree = new fabric.Path(`M 200 200 Q 300 20 400 400`, {
            stroke: 'blue',
            strokeWidth: 2,
            fill: '',
        });

        const group = new fabric.Group([curvedLine, curvedLineTwo, curvedLineThree], {
            left: 300,
            top: 300,
        })


        canvasObj.add(group);
        canvasObj.setActiveObject(group)
        canvasObj.renderAll()
    }

    const arcFour = () => {

        const square = new fabric.Rect({
            left: 250,
            top: 250,
            width: 150,
            height: 150,
            angle: 35
        })

        const rect = new fabric.Rect({
            left: 500,
            top: 250,
            width: 300,
            height: 150,
        })

        const circle = new fabric.Circle({
            radius: 150,
            left: 250,
            top: 250,
            angle: 0,
            stroke: '#000',
            strokeWidth: 3,
            fill: 'red'
        })

        const group = new fabric.Group([square, rect, circle], {
            left: 100,
            top: 100,
        })

        canvasObj.add(group);
        canvasObj.setActiveObject(group)
        canvasObj.renderAll()
    }

    const svgPathOne = () => {
        var path = new fabric.Path('M121.32,0L44.58,0C36.67,0,29.5,3.22,24.31,8.41c-5.19,5.19-8.41,12.37-8.41,20.28c0,15.82,12.87,28.69,28.69,28.69c0,0,4.4,0,7.48,0C36.66,72.78,8.4,101.04,8.4,101.04C2.98,106.45,0,113.66,0,121.32c0,7.66,2.98,14.87,8.4,20.29l0,0c5.42,5.42,12.62,8.4,20.28,8.4c7.66,0,14.87-2.98,20.29-8.4c0,0,28.26-28.25,43.66-43.66c0,3.08,0,7.48,0,7.48c0,15.82,12.87,28.69,28.69,28.69c7.66,0,14.87-2.99,20.29-8.4c5.42-5.42,8.4-12.62,8.4-20.28l0-76.74c0-7.66-2.98-14.87-8.4-20.29C136.19,2.98,128.98,0,121.32,0z');

        canvasObj.add(path.set({ left: 100, top: 200 }));
        canvasObj.setActiveObject(path)
        canvasObj.renderAll()
    }

    const svgPathTwo = () => {
        const path = new fabric.Path('M18.43 255.8L192 224L100.8 292.6C90.67 302.8 97.8 320 112 320h222.7c-9.499-26.5-14.75-54.5-14.75-83.38V194.2L200.3 106.8C176.5 90.88 145 92.75 123.3 111.2l-117.5 116.4C-6.562 238 2.436 258 18.43 255.8zM575.2 289.9l-100.7-50.25c-16.25-8.125-26.5-24.75-26.5-43V160h63.99l28.12 22.62C546.1 188.6 554.2 192 562.7 192h30.1c11.1 0 23.12-6.875 28.5-17.75l14.37-28.62c5.374-10.87 4.25-23.75-2.999-33.5l-74.49-99.37C552.1 4.75 543.5 0 533.5 0H296C288.9 0 285.4 8.625 290.4 13.62L351.1 64L292.4 88.75c-5.874 3-5.874 11.37 0 14.37L351.1 128l-.0011 108.6c0 72 35.99 139.4 95.99 179.4c-195.6 6.75-344.4 41-434.1 60.88c-8.124 1.75-13.87 9-13.87 17.38C.0463 504 8.045 512 17.79 512h499.1c63.24 0 119.6-47.5 122.1-110.8C642.3 354 617.1 310.9 575.2 289.9zM489.1 66.25l45.74 11.38c-2.75 11-12.5 18.88-24.12 18.25C497.7 95.25 484.8 83.38 489.1 66.25z')
        canvasObj.add(path.set({ left: 100, top: 200 }));
        canvasObj.setActiveObject(path)
        canvasObj.renderAll()
    }

    const svgPathThree = () => {
        const path = new fabric.Path('M640 320V368C640 385.7 625.7 400 608 400H574.7C567.1 445.4 527.6 480 480 480C432.4 480 392.9 445.4 385.3 400H254.7C247.1 445.4 207.6 480 160 480C112.4 480 72.94 445.4 65.33 400H32C14.33 400 0 385.7 0 368V256C0 228.9 16.81 205.8 40.56 196.4L82.2 92.35C96.78 55.9 132.1 32 171.3 32H353.2C382.4 32 409.1 45.26 428.2 68.03L528.2 193C591.2 200.1 640 254.8 640 319.1V320zM171.3 96C158.2 96 146.5 103.1 141.6 116.1L111.3 192H224V96H171.3zM272 192H445.4L378.2 108C372.2 100.4 362.1 96 353.2 96H272V192zM525.3 400C527 394.1 528 389.6 528 384C528 357.5 506.5 336 480 336C453.5 336 432 357.5 432 384C432 389.6 432.1 394.1 434.7 400C441.3 418.6 459.1 432 480 432C500.9 432 518.7 418.6 525.3 400zM205.3 400C207 394.1 208 389.6 208 384C208 357.5 186.5 336 160 336C133.5 336 112 357.5 112 384C112 389.6 112.1 394.1 114.7 400C121.3 418.6 139.1 432 160 432C180.9 432 198.7 418.6 205.3 400z')
        canvasObj.add(path.set({ left: 100, top: 200 }))
        canvasObj.setActiveObject(path)
        canvasObj.renderAll()
    }

    const svgPathFour = () => {
        fabric.loadSVGFromURL(svgPath, (objects, options) => {
            const obj = new fabric.Group(objects);
            obj.set({
                top: 200,
                left: 200
            })
            canvasObj.add(obj);
            canvasObj.setActiveObject(obj)
            canvasObj.renderAll();
        })
    }

    return (
        <>
            <div style={{marginTop: "50px"}} className='panel-item'>
                <Button onClick={addSquare}>Add Square</Button>
                <Button onClick={addRectangle}>Add Rectangle</Button>
                <Button onClick={addCircle}>Add Circle</Button>
                <Button onClick={addTriangle}>Add Triangle</Button>
                <Button onClick={addPolygon}>Add Polygon</Button>
            </div>
            <div className='panel-item'> 
                <Button onClick={line}>Add Line</Button>
                <Button onClick={addText}>Text</Button>
                <Button onClick={editableText}>Edit Text</Button>
                <Button onClick={addPattern}>Pattern</Button>
            </div>
            <div className='panel-item'>
                <Button onClick={addImage}>Image (simple)</Button>
                <Button onClick={addImageFromUrl}>Image (URL)</Button>
            </div>
            <div className='panel-item'>
                <Button onClick={firstGradient}>First Gradient</Button>
                <Button onClick={secondGradient}>Second Gradient</Button>
                <Button onClick={thirdGradient}>Third Gradient</Button>
            </div>
            <div className='panel-item'>
                <Button onClick={arcOne}>Arc 1</Button>
                <Button onClick={arcTwo}>Arc 2</Button>
                <Button onClick={arcThree}>Arc 3</Button>
                <Button onClick={arcFour}>Arc 4</Button>
            </div>
            <div className='panel-item'>
                <Button onClick={svgPathOne}>SVG Path 1</Button>
                <Button onClick={svgPathTwo}>SVG Path 2</Button>
                <Button onClick={svgPathThree}>SVG Path 3</Button>
                <Button onClick={svgPathFour}>SVG Path 4</Button>
            </div>
        </>
    )
}

export default Simple