import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { fabric } from 'fabric';
import { SketchPicker } from 'react-color';
import { CanvasStore } from '../store/Context';
import cube from './cube.jpg'
import TextProperties from './TextProperties';


function Object() {
    const {
        canvasObj
    } = useContext(CanvasStore);

    const [color, setColor] = useState()
    const [fillColor, setFillColor] = useState(false)
    const [strokeColor, setStrokeColor] = useState()
    const [strokeColorFill, setStrokeColorFill] = useState(false)
    const [sliderValue, setSliderValue] = useState(canvasObj.getActiveObject().opacity)
    const [strokeWidth, setStrokeWidth] = useState(canvasObj.getActiveObject().strokeWidth)
    const [checkbox, setCheckBox] = useState(false)
    const [cacheCheckBox, setCacheCheckBox] = useState(false)
    const [noScaleCacheCheck, setNoScaleCacheCheck] = useState(false)
    const [controlCheckBox, setControlCheckBox] = useState(false)
    const [transparentCornersCheckBox, setTransparentCornersCheckBox] = useState(false)
    const [removeBordersCheckBox, setRemoveBordersCheckBox] = useState(false)
    const [centeredRotation, setCenteredRotation] = useState(false)
    const [lockHorizontalMov, setHorizontalMov] = useState(false)
    const [lockVerticalMov, setVerticalMov] = useState(false)
    const [lockHorizontalScaling, setLockHorizontalScaling] = useState(false)
    const [lockVerticalScaling, setLockVerticalScaling] = useState(false)
    const [lockRotation, setLockRotation] = useState(false)
    const [scalePattern, setScalePattern] = useState(1.00001)

    const [activeObject, setActiveObject] = useState()

    useEffect(() => {
        let activeObject = canvasObj.getActiveObject()
        setActiveObject(activeObject)
        console.log("Active Object: ",  activeObject);
        canvasObj.renderAll()
    }, [canvasObj.getActiveObject()])

    const fillColorFunc = (clr) => {
        let activeObject = canvasObj.getActiveObject()
        setColor(clr.hex);
        activeObject.set({ fill: clr.hex })
        canvasObj.renderAll()
    }

    const strokeColorFunc = (clr) => {
        let activeObject = canvasObj.getActiveObject()
        setStrokeColor(clr.hex);
        activeObject.set({ stroke: clr.hex })
        canvasObj.renderAll()
    }

    const changeOpacity = (e) => {
        let activeObject = canvasObj.getActiveObject()
        setSliderValue(e.target.value)
        activeObject.opacity = e.target.value / 100
        canvasObj.renderAll()
    }

    const changeStrokeWidth = (e) => {
        let activeObject = canvasObj.getActiveObject()
        setStrokeWidth(e.target.value)
        activeObject.strokeWidth = (e.target.value / 10)
        canvasObj.renderAll()
    }

    const checkBoxFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let checkboxTemp = !checkbox
        setCheckBox(checkboxTemp)
        if (checkboxTemp === true) {
            activeObject.strokeUniform = true;
            activeObject.strokeWidth = 1
        } else {
            activeObject.strokeUniform = false
        }
        canvasObj.renderAll()
    }

    const lockHorizontalMovFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let horizontalMovTemp = !lockHorizontalMov
        setHorizontalMov(horizontalMovTemp)
        if (activeObject.group && activeObject.group.lockMovementX && activeObject.group.lockMovementX === true) {
            activeObject.group.lockMovementX = false
            e.target.classList.remove('pressed')
        } else if (activeObject.group && activeObject.group.lockMovementX === false) {
            e.target.classList.add('pressed')
            activeObject.group.lockMovementX = true
        } else if (horizontalMovTemp === true) {
            e.target.classList.add('pressed')
            activeObject.lockMovementX = true
        } else {
            activeObject.lockMovementX = false
            e.target.classList.remove('pressed')
        }
        canvasObj.renderAll()
    }

    const lockVerticalMovFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let verticalMovTemp = !lockVerticalMov
        setVerticalMov(verticalMovTemp)
        if (activeObject.group && activeObject.group.lockMovementY && activeObject.group.lockMovementY === true) {
            activeObject.group.lockMovementY = false
            e.target.classList.remove('pressed')
        } else if (activeObject.group && activeObject.group.lockMovementY === false) {
            activeObject.group.lockMovementY = true
            e.target.classList.add('pressed')
        } else if (verticalMovTemp === true) {
            e.target.classList.add('pressed')
            activeObject.lockMovementY = true
        } else {
            activeObject.lockMovementY = false
            e.target.classList.remove('pressed')
        }
        canvasObj.renderAll()
    }

    const lockHorizontalScalingFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let lockHorizontalScalingTemp = !lockHorizontalScaling
        setLockHorizontalScaling(lockHorizontalScalingTemp)
        if (activeObject.group && activeObject.group.lockScalingX && activeObject.group.lockScalingX === true) {
            activeObject.group.lockScalingX = false;
            e.target.classList.remove('pressed')
        } else if (activeObject.group && activeObject.group.lockScalingX === false) {
            activeObject.group.lockScalingX = true;
            e.target.classList.add('pressed')
        } else if (lockHorizontalScalingTemp === true) {
            e.target.classList.add('pressed')
            activeObject.lockScalingX = true
        } else {
            activeObject.lockScalingX = false
            e.target.classList.remove('pressed')
        }
        canvasObj.renderAll()
    }

    const lockVerticalScalingFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let lockVerticalScalingTemp = !lockVerticalScaling
        setLockVerticalScaling(lockVerticalScalingTemp)
        if (activeObject.group && activeObject.group.lockScalingY && activeObject.group.lockScalingY === true) {
            activeObject.group.lockScalingY = false;
            e.target.classList.remove('pressed')
        } else if (activeObject.group && activeObject.group.lockScalingY === false) {
            activeObject.group.lockScalingY = true;
            e.target.classList.add('pressed')
        } else if (lockVerticalScalingTemp === true) {
            e.target.classList.add('pressed')
            activeObject.lockScalingY = true
        } else {
            activeObject.lockScalingY = false
            e.target.classList.remove('pressed')
        }
        canvasObj.renderAll()
    }

    const lockRotationFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let lockRotationTemp = !lockRotation
        setLockRotation(lockRotationTemp)
        if (activeObject.group && activeObject.group.lockRotation && activeObject.group.lockRotation === true) {
            activeObject.group.lockRotation = false;
            e.target.classList.remove('pressed')
        } else if (activeObject.group && activeObject.group.lockRotation === false) {
            activeObject.group.lockRotation = true;
            e.target.classList.add('pressed')
        } else if (lockRotationTemp === true) {
            e.target.classList.add('pressed')
            activeObject.lockRotation = true
        } else {
            activeObject.lockRotation = false
            e.target.classList.remove('pressed')
        }
        canvasObj.renderAll()
    }

    const onChangeX = (e) => {
        let activeObject = canvasObj.getActiveObject()
        activeObject.originX = (e.target.value.includes("left") || e.target.value.includes("center") || e.target.value.includes("right")) ? e.target.value : parseFloat(e.target.value)
        canvasObj.renderAll()
    }

    const onChangeY = (e) => {
        let activeObject = canvasObj.getActiveObject()
        activeObject.originY = (e.target.value.includes("top") || e.target.value.includes("center") || e.target.value.includes("bottom")) ? e.target.value : parseFloat(e.target.value)
        canvasObj.renderAll()
    }

    const cacheCheckBoxFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let checkboxTemp = !cacheCheckBox
        setCacheCheckBox(checkboxTemp)
        activeObject.objectCaching = checkboxTemp === true ? true : false
        canvasObj.renderAll()
    }

    const noScaleCacheCheckFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let checkboxTemp = !noScaleCacheCheck
        setNoScaleCacheCheck(checkboxTemp)
        activeObject.noScaleCache = checkboxTemp === true ? true : false
        canvasObj.renderAll()
    }

    const controlCheckBoxFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let checkBoxTemp = !controlCheckBox
        setControlCheckBox(checkBoxTemp)
        activeObject.hasControls = checkBoxTemp
        canvasObj.renderAll()
    }

    const transparentCornersCheckBoxFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let checkBoxTemp = !transparentCornersCheckBox
        setTransparentCornersCheckBox(checkBoxTemp)
        activeObject.transparentCorners = checkBoxTemp
        canvasObj.renderAll()
    }

    const removeBordersFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let checkBoxTemp = !removeBordersCheckBox
        setRemoveBordersCheckBox(checkBoxTemp)
        activeObject.hasBorders = checkBoxTemp
        canvasObj.renderAll()
    }

    const centeredRotationFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let checkBoxTemp = !centeredRotation
        setCenteredRotation(checkBoxTemp)
        activeObject.centeredRotation = checkBoxTemp
        canvasObj.renderAll()
    }

    const bringBackwards = (e) => {
        let activeObject = canvasObj.getActiveObject()
        canvasObj.sendBackwards(activeObject)
        canvasObj.renderAll()
    }

    const bringForwards = (e) => {
        let activeObject = canvasObj.getActiveObject()
        canvasObj.bringForward(activeObject)
        canvasObj.renderAll()
    }

    const sendToFrontFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        canvasObj.bringToFront(activeObject)
        canvasObj.renderAll()
    }

    const sendToBackFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        canvasObj.sendToBack(activeObject)
        canvasObj.renderAll()
    }

    const gradentifyFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        activeObject.set('fill', new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'pixels', // or 'percentage'
            coords: { x1: 0, y1: 0, x2: 100, y2: 0 },
            colorStops: [
                { offset: 0, color: '#ffafbd' },
                { offset: 1, color: '#ffc3a0' }]
        }));
        canvasObj.renderAll()
    }

    const shadowifyFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        activeObject.set('shadow', new fabric.Shadow(
            {
                color: "black",
                blur: 50,
                offsetX: 20,
                offsetY: 20,
            }
        ))
        canvasObj.renderAll()
    }

    const patternifyFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        const image = new Image();
        image.src = cube;
        image.onload = () => {
            activeObject.set('fill', new fabric.Pattern({
                source: image,
                repeat: 'repeat'
            }))
        }
        canvasObj.renderAll()
    }

    const clipPathFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let clipPath = new fabric.Circle({ radius: 15, top: 0, left: 0 });
        activeObject.set({
            clipPath: clipPath
        })
        canvasObj.renderAll()
    }

    const invertedClipPathFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let clipPath = new fabric.Circle({ radius: 15, top: 0, left: 0 });
        clipPath.inverted = true
        activeObject.set({
            clipPath: clipPath
        })
        canvasObj.renderAll()
    }

    const patternRepeatXFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let scaleTemp = scalePattern + 0.00001
        setScalePattern(scaleTemp)
        activeObject.fill.repeat = 'repeat-x'
        activeObject.scale(scaleTemp)
        canvasObj.renderAll()
    }

    const patternRepeatFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let scaleTemp = scalePattern + 0.00001
        setScalePattern(scaleTemp)
        activeObject.scale(scaleTemp)
        activeObject.fill.repeat = 'repeat'
        canvasObj.renderAll()
    }

    const patternRepeatYFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let scaleTemp = scalePattern + 0.00001
        setScalePattern(scaleTemp)
        activeObject.scale(scaleTemp)
        activeObject.fill.repeat = 'repeat-y'
        canvasObj.renderAll()
    }

    const patternNoRepeatFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let scaleTemp = scalePattern + 0.00001
        setScalePattern(scaleTemp)
        activeObject.scale(scaleTemp)
        activeObject.fill.repeat = 'no-repeat'
        canvasObj.renderAll()
    }

    let button
    if (activeObject && activeObject.text) {
        button = <TextProperties />
    } else {
        button = null
    }

    return (

        <>
            <div style={{ marginTop: "50px", marginLeft: "1rem" }} className='panel-item'>
                Fill
                <Button className='button-object' variant='outline-dark' onClick={() => setFillColor(!fillColor)}>Open Fill Bar</Button>
                {
                    fillColor && <SketchPicker
                        color={color}
                        onChangeComplete={fillColorFunc}
                    />
                }
            </div>
            <div style={{ marginLeft: "1rem" }} className='panel-item'>
                Stroke
                <Button className='button-object' variant='outline-dark' onClick={() => setStrokeColorFill(!strokeColorFill)}>Open Stroke Bar</Button>
                {
                    strokeColorFill && <SketchPicker
                        color={strokeColor}
                        onChangeComplete={strokeColorFunc}
                    />
                }
            </div>
            <div style={{ marginLeft: "1rem", display: 'flex', alignItems: 'center' }} className='panel-item'>
                Opacity
                <input
                    type='range'
                    onChange={changeOpacity}
                    min={1}
                    max={100}
                    step={1}
                    value={sliderValue}
                    className='custom-slider' />
            </div>
            <div style={{ marginLeft: "1rem", display: 'flex', alignItems: 'center' }} className='panel-item'>
                Stroke Width
                <input
                    style={{ marginLeft: "5px" }}
                    type='range'
                    onChange={changeStrokeWidth}
                    min={1}
                    max={100}
                    step={1}
                    value={strokeWidth}
                    id='custom-slider' />
                <div style={{ marginLeft: "5px" }}>
                    Stroke Uniform
                    <input type='checkbox' checked={checkbox} onChange={checkBoxFunc} />
                </div>
            </div>

            {button}

            <div className='object-buttons panel-item'>
                <Button variant="outline-dark" onClick={lockHorizontalMovFunc}>Lock Horizontal Movement</Button>
                <Button variant="outline-dark" onClick={lockVerticalMovFunc}>Lock Vertical Movement</Button>
                <Button variant="outline-dark" onClick={lockHorizontalScalingFunc}>Lock Horizontal Scaling</Button>
            </div>
            <div className='object-buttons panel-item'>
                <Button variant="outline-dark" onClick={lockVerticalScalingFunc}>Lock Vertical Scaling</Button>
                <Button variant="outline-dark" onClick={lockRotationFunc}>Lock Rotation</Button>
            </div>
            <div style={{ marginLeft: "1rem" }} className='originX panel-item' onChange={onChangeX}>
                Origin X:
                <input type="radio" value="left" name="originX" /> Left
                <input type="radio" value="center" name="originX" /> Center
                <input type="radio" value="right" name="originX" /> Right
                <input type="radio" value="0.3" name="originX" /> 0.3
                <input type="radio" value="0.5" name="originX" /> 0.5
                <input type="radio" value="0.7" name="originX" /> 0.7
                <input type="radio" value="1" name="originX" /> 1
            </div>
            <div style={{ marginLeft: "1rem" }} className='originY panel-item' onChange={onChangeY}>
                Origin Y:
                <input type="radio" value="top" name="originY" /> Top
                <input type="radio" value="center" name="originY" /> Center
                <input type="radio" value="bottom" name="originY" /> Bottom
                <input type="radio" value="0.3" name="originY" /> 0.3
                <input type="radio" value="0.5" name="originY" /> 0.5
                <input type="radio" value="0.7" name="originY" /> 0.7
                <input type="radio" value="1" name="originY" /> 1
            </div>
            <div style={{ marginLeft: "1rem" }} className='object-buttons panel-item'>
                Cache:
                <input style={{ marginLeft: "10px" }} type='checkbox' checked={cacheCheckBox} onChange={cacheCheckBoxFunc} />
                <div style={{ marginLeft: "15px" }}>
                    No Scale Cache
                    <input style={{ marginLeft: "10px" }} type='checkbox' checked={noScaleCacheCheck} onChange={noScaleCacheCheckFunc} />
                </div>
            </div>
            <div style={{ marginLeft: "1rem" }} className='object-buttons panel-item'>
                Controls:
                <input style={{ marginLeft: "10px" }} type='checkbox' checked={controlCheckBox} onChange={controlCheckBoxFunc} />
                <div style={{ marginLeft: "15px" }}>
                    Transparent Corners
                    <input style={{ marginLeft: "10px" }} type='checkbox' checked={transparentCornersCheckBox} onChange={transparentCornersCheckBoxFunc} />
                </div>
                <div style={{ marginLeft: "15px" }}>
                    Borders
                    <input style={{ marginLeft: "10px" }} type='checkbox' checked={removeBordersCheckBox} onChange={removeBordersFunc} />
                </div>
                <div style={{ marginLeft: "15px" }}>
                    Centered Rotation
                    <input style={{ marginLeft: "10px" }} type='checkbox' checked={centeredRotation} onChange={centeredRotationFunc} />
                </div>
            </div>
            <div className='object-buttons panel-item'>
                <Button variant='outline-dark' onClick={bringForwards}>Bring Forwards</Button>
                <Button variant='outline-dark' onClick={bringBackwards}>Bring Backwards</Button>
                <Button variant='outline-dark' onClick={sendToFrontFunc}>Send to Front</Button>
                <Button variant='outline-dark' onClick={sendToBackFunc}>Send to Back</Button>
            </div>
            <div className='object-buttons panel-item'>
                <Button variant='outline-dark' onClick={gradentifyFunc}>Gradentify</Button>
                <Button variant='outline-dark' onClick={shadowifyFunc}>Shadowify</Button>
                <Button variant='outline-dark' onClick={patternifyFunc}>Patternify</Button>
                <Button variant='outline-dark' onClick={clipPathFunc}>Clip</Button>
                <Button variant='outline-dark' onClick={invertedClipPathFunc}>Clip Inverted</Button>
            </div>
            <div className='object-buttons panel-item'>
                <Button variant='outline-dark' onClick={patternRepeatFunc}>Pattern repeat</Button>
                <Button variant='outline-dark' onClick={patternRepeatXFunc}>Pattern repeat-x</Button>
                <Button variant='outline-dark' onClick={patternRepeatYFunc}>Pattern repeat-y</Button>
                <Button variant='outline-dark' onClick={patternNoRepeatFunc}>Pattern repeat-none</Button>
            </div>
        </>
    )
}

export default Object