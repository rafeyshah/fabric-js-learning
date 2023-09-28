import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { fabric } from 'fabric';
import { SketchPicker } from 'react-color';
import { CanvasStore } from '../store/Context';
import cube from './cube.jpg'
import TextProperties from './TextProperties';


function Object() {
    const {
        canvasObj,
    } = useContext(CanvasStore);

    const [color, setColor] = useState()
    const [fillColor, setFillColor] = useState(false)
    const [strokeColor, setStrokeColor] = useState()
    const [strokeColorFill, setStrokeColorFill] = useState(false)
    const [sliderValue, setSliderValue] = useState(1)
    const [strokeWidth, setStrokeWidth] = useState(1)
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
    const [originXValue, setOriginXValue] = useState()
    const [originYValue, setOriginYValue] = useState()
    const [shadowifyCheck, setShadowify] = useState(false)

    const [activeObject, setActiveObject] = useState()

    useEffect(() => {
        setActiveObject(canvasObj.getActiveObject())
        handleMouseDown()
        canvasObj.on('mouse:down', handleMouseDown);
        canvasObj.renderAll()
    }, [canvasObj])

    const handleMouseDown = (event) => {
        const activeObject = canvasObj.getActiveObject();
        if (activeObject) {
            setActiveObject(activeObject)
            setSliderValue(activeObject.opacity * 100)
            setStrokeWidth(activeObject.strokeWidth * 10)
            setColor(activeObject.fill)
            // setStrokeColor(activeObject?.stroke)
            setCheckBox(activeObject.strokeUniform)
            setCacheCheckBox(activeObject.objectCaching)
            setNoScaleCacheCheck(activeObject.noScaleCache)
            setControlCheckBox(activeObject.hasControls)
            setTransparentCornersCheckBox(activeObject.transparentCorners)
            setRemoveBordersCheckBox(activeObject.hasBorders)
            setCenteredRotation(activeObject.centeredRotation)
            setHorizontalMov(activeObject.lockMovementX)
            setVerticalMov(activeObject.lockMovementY)
            setLockHorizontalScaling(activeObject.lockScalingX)
            setLockVerticalScaling(activeObject.lockScalingY)
            setLockRotation(activeObject.lockRotation)
            // setScalePattern(activeObject.fill.repeat)
            setOriginXValue(activeObject.originX)
            setOriginYValue(activeObject.originY)
            setShadowify(activeObject.shadow ? true : false)
        }
    };

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
        } else if (activeObject.group && activeObject.group.lockMovementX === false) {
            activeObject.group.lockMovementX = true
        } else if (horizontalMovTemp === true) {
            activeObject.lockMovementX = true
        } else {
            activeObject.lockMovementX = false
        }
        canvasObj.renderAll()
    }

    const lockVerticalMovFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let verticalMovTemp = !lockVerticalMov
        setVerticalMov(verticalMovTemp)
        if (activeObject.group && activeObject.group.lockMovementY && activeObject.group.lockMovementY === true) {
            activeObject.group.lockMovementY = false
        } else if (activeObject.group && activeObject.group.lockMovementY === false) {
            activeObject.group.lockMovementY = true
        } else if (verticalMovTemp === true) {
            activeObject.lockMovementY = true
        } else {
            activeObject.lockMovementY = false
        }
        canvasObj.renderAll()
    }

    const lockHorizontalScalingFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let lockHorizontalScalingTemp = !lockHorizontalScaling
        setLockHorizontalScaling(lockHorizontalScalingTemp)
        if (activeObject.group && activeObject.group.lockScalingX && activeObject.group.lockScalingX === true) {
            activeObject.group.lockScalingX = false;
        } else if (activeObject.group && activeObject.group.lockScalingX === false) {
            activeObject.group.lockScalingX = true;
        } else if (lockHorizontalScalingTemp === true) {
            activeObject.lockScalingX = true
        } else {
            activeObject.lockScalingX = false
        }
        canvasObj.renderAll()
    }

    const lockVerticalScalingFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let lockVerticalScalingTemp = !lockVerticalScaling
        setLockVerticalScaling(lockVerticalScalingTemp)
        if (activeObject.group && activeObject.group.lockScalingY && activeObject.group.lockScalingY === true) {
            activeObject.group.lockScalingY = false;
        } else if (activeObject.group && activeObject.group.lockScalingY === false) {
            activeObject.group.lockScalingY = true;
        } else if (lockVerticalScalingTemp === true) {
            activeObject.lockScalingY = true
        } else {
            activeObject.lockScalingY = false
        }
        canvasObj.renderAll()
    }

    const lockRotationFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let lockRotationTemp = !lockRotation
        setLockRotation(lockRotationTemp)
        if (activeObject.group && activeObject.group.lockRotation && activeObject.group.lockRotation === true) {
            activeObject.group.lockRotation = false;
        } else if (activeObject.group && activeObject.group.lockRotation === false) {
            activeObject.group.lockRotation = true;
        } else if (lockRotationTemp === true) {
            activeObject.lockRotation = true
        } else {
            activeObject.lockRotation = false
        }
        canvasObj.renderAll()
    }

    const onChangeX = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let orginValueTemp = (e.target.value.includes("left") || e.target.value.includes("center") || e.target.value.includes("right")) ? e.target.value : parseFloat(e.target.value)
        setOriginXValue(orginValueTemp)
        activeObject.originX = orginValueTemp
        canvasObj.renderAll()
    }

    const onChangeY = (e) => {
        let activeObject = canvasObj.getActiveObject()
        let originValueTemp = (e.target.value.includes("top") || e.target.value.includes("center") || e.target.value.includes("bottom")) ? e.target.value : parseFloat(e.target.value)
        activeObject.originY = originValueTemp
        setOriginYValue(originValueTemp)
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
        let checkTemp = !shadowifyCheck
        setShadowify(checkTemp)

        if (checkTemp == true){
            activeObject.set('shadow', new fabric.Shadow(
                    {
                        color: "black",
                        blur: 50,
                        offsetX: 20,
                        offsetY: 20,
                    }
                )
            )
        } else {
            activeObject.set({shadow: null})
        }
        
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
        if (typeof activeObject.fill === "object") {
            activeObject.fill.repeat = 'repeat-x'
            activeObject.dirty = true;
            canvasObj.renderAll()
        }
    }

    const patternRepeatFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        if (typeof activeObject.fill === "object") {
            activeObject.fill.repeat = 'repeat'
            activeObject.dirty = true;
            canvasObj.renderAll()
        }
    }

    const patternRepeatYFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        if (typeof activeObject.fill === "object") {
            activeObject.fill.repeat = 'repeat-y'
            activeObject.dirty = true;
            canvasObj.renderAll()
        }
    }

    const patternNoRepeatFunc = (e) => {
        let activeObject = canvasObj.getActiveObject()
        if (typeof activeObject.fill === "object") {
            activeObject.fill.repeat = 'no-repeat'
            activeObject.dirty = true;
            canvasObj.renderAll()
        }
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
                <Button className={lockHorizontalMov && 'pressed'} variant="outline-dark" onClick={lockHorizontalMovFunc}>Lock Horizontal Movement</Button>
                <Button className={lockVerticalMov && 'pressed'} variant="outline-dark" onClick={lockVerticalMovFunc}>Lock Vertical Movement</Button>
                <Button className={lockHorizontalScaling && 'pressed'} variant="outline-dark" onClick={lockHorizontalScalingFunc}>Lock Horizontal Scaling</Button>
            </div>
            <div className='object-buttons panel-item'>
                <Button className={lockVerticalScaling && 'pressed'} variant="outline-dark" onClick={lockVerticalScalingFunc}>Lock Vertical Scaling</Button>
                <Button className={lockRotation && 'pressed'} variant="outline-dark" onClick={lockRotationFunc}>Lock Rotation</Button>
            </div>
            <div style={{ marginLeft: "1rem" }} className='originX panel-item' onChange={onChangeX}>
                Origin X:
                <input type="radio" checked={originXValue == "left"} value="left" name="originX" /> Left
                <input type="radio" checked={originXValue == "center"} value="center" name="originX" /> Center
                <input type="radio" checked={originXValue == "right"} value="right" name="originX" /> Right
                <input type="radio" checked={originXValue == 0.3} value="0.3" name="originX" /> 0.3
                <input type="radio" checked={originXValue == 0.5} value="0.5" name="originX" /> 0.5
                <input type="radio" checked={originXValue == 0.7} value="0.7" name="originX" /> 0.7
                <input type="radio" checked={originXValue == 1} value="1" name="originX" /> 1
            </div>
            <div style={{ marginLeft: "1rem" }} className='originY panel-item' onChange={onChangeY}>
                Origin Y:
                <input type="radio" checked={originYValue == "top"} value="top" name="originY" /> Top
                <input type="radio" checked={originYValue == "center"} value="center" name="originY" /> Center
                <input type="radio" checked={originYValue == "bottom"} value="bottom" name="originY" /> Bottom
                <input type="radio" checked={originYValue == 0.3} value="0.3" name="originY" /> 0.3
                <input type="radio" checked={originYValue == 0.5} value="0.5" name="originY" /> 0.5
                <input type="radio" checked={originYValue == 0.7} value="0.7" name="originY" /> 0.7
                <input type="radio" checked={originYValue == 1} value="1" name="originY" /> 1
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
                <Button className={shadowifyCheck && 'pressed'} variant='outline-dark' onClick={shadowifyFunc}>Shadowify</Button>
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