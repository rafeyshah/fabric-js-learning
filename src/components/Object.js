import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { CanvasStore } from '../store/Context';

function Object() {
    const [color, setColor] = useState()
    const [fillColor, setFillColor] = useState(false)
    const [strokeColor, setStrokeColor] = useState()
    const [strokeColorFill, setStrokeColorFill] = useState(false)

    const {
        canvasObj,
        setCanvasObj
    } = useContext(CanvasStore);

    const activeObject = canvasObj.getActiveObject()

    const fillColorFunc = (clr) => {
        // let activeObject = canvasObj.getActiveObject()
        setColor(clr.hex);
        activeObject.set({ fill: clr.hex })
        canvasObj.renderAll()
    }

    const strokeColorFunc = (clr) => {
        // let activeObject = canvasObj.getActiveObject()
        setStrokeColor(clr.hex);
        activeObject.set({ stroke: clr.hex })
        canvasObj.renderAll()
    }

    return (
        <>
            <div className='colorpicker'>
                <div>
                    Fill
                    <Button className='button-object' onClick={() => setFillColor(!fillColor)}>Open Fill Bar</Button>
                    {
                        fillColor && <SketchPicker
                            color={color}
                            onChangeComplete={fillColorFunc}
                        />
                    }
                </div>
                <div>
                    Stroke
                    <Button className='button-object' onClick={() => setStrokeColorFill(!strokeColorFill)}>Open Stroke Bar</Button>
                    {
                        strokeColorFill && <SketchPicker
                            color={strokeColor}
                            onChangeComplete={strokeColorFunc}
                        />
                    }
                </div>

            </div>
        </>
    )
}

export default Object