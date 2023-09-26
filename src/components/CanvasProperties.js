import React, { useContext, useEffect, useState } from 'react'
import { CanvasStore } from '../store/Context';
import { Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { fabric } from 'fabric';

function CanvasProperties() {
    const {
        canvasObj,
    } = useContext(CanvasStore);

    const [noOfObjects, setNoOfObjects] = useState(0)
    const [pngURL, setPNGURL] = useState()
    const [svgUrl, setSvgUrl] = useState()
    const [jsonUrl, setJsonUrl] = useState()
    const [backgroundColor, setBackgroundColor] = useState()
    const [brush, setBrush] = useState()
    const [lineWidthSlider, setLineWidthSlider] = useState(1)
    const [shadowLineSlider, setShadowLineSlider] = useState(1)
    const [backgroundColorCheck, setBackgroundColorCheck] = useState(false)
    const [lineColor, setLineColor] = useState(1)
    const [lineColorCheck, setLineColorCheck] = useState(false)
    const [drawingMode, setDrawingMode] = useState(false)
    const [enableHDPI, setEnableHDPI] = useState(false)
    const [offscreenRender, setOffScreenRender] = useState(false)

    useEffect(() => {
        setNoOfObjects(canvasObj.getObjects().length)
    }, [canvasObj])

    const imageToCanvasFunc = (e) => {
        let pngURL = canvasObj.toDataURL();
        canvasObj.renderAll()
        setPNGURL(pngURL)
    }

    const imagetoCanvas3x = (e) => {
        let pngURL = canvasObj.toDataURL({ multiplier: 3 });
        canvasObj.renderAll()
        setPNGURL(pngURL)
    }

    const canvasToSvg = (e) => {
        let svgUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(canvasObj.toSVG())
        setSvgUrl(svgUrl)
    }

    const canvasToJson = (e) => {
        let jsonUrl = canvasObj.toJSON()
        setJsonUrl(jsonUrl)
    }

    const clearCanvas = (e) => {
        canvasObj.clear()
    }

    const clearSelectedGroup = (e) => {
        canvasObj.remove(...canvasObj.getActiveObjects())
        canvasObj.discardActiveObject(...canvasObj.getActiveObjects())
        canvasObj.renderAll()
    }

    const backgroundColorFunc = (clr) => {
        setBackgroundColor(clr.hex);
        canvasObj.backgroundColor = clr.hex
        canvasObj.renderAll()
    }

    const enterDrawingMode = (e) => {
        let drawingModeTemp = !drawingMode
        if (drawingModeTemp === true) {
            e.target.classList.add('pressed')
        } else {
            e.target.classList.remove('pressed')
        }
        setDrawingMode(drawingModeTemp)
        canvasObj.isDrawingMode = drawingModeTemp
        canvasObj.freeDrawingBrush.width = 5;
        canvasObj.freeDrawingBrush.color = '#00aeff';
    }

    const changeBrushFunc = (e) => {
        let brushTemp = e.target.value
        setBrush(brushTemp)
        if (brushTemp === "circle") {
            canvasObj.freeDrawingBrush = new fabric.CircleBrush(canvasObj);
        } else if (brushTemp === "pencil") {
            canvasObj.freeDrawingBrush = new fabric.PencilBrush(canvasObj)
        } else if (brushTemp === "spray") {
            canvasObj.freeDrawingBrush = new fabric.SprayBrush(canvasObj)
        }
        canvasObj.renderAll()
    }

    const lineWidthSliderFunc = (e) => {
        let sliderTemp = e.target.value
        console.log(sliderTemp);
        setLineWidthSlider(sliderTemp)
        canvasObj.freeDrawingBrush.width = sliderTemp
        canvasObj.renderAll()
    }

    const lineColorFunc = (clr) => {
        let hexColortemp = clr.hex
        setLineColor(hexColortemp)
        canvasObj.freeDrawingBrush.color = clr.hex
        canvasObj.renderAll()
    }

    const shadowLineColorFunc = (e) => {
        let lineSlidertemp = e.target.value;
        setShadowLineSlider(lineSlidertemp)
        canvasObj.freeDrawingBrush.shadow = new fabric.Shadow({
            blur: parseInt(e.target.value, 10) || 0,
            offsetX: 0,
            offsetY: 0,
            affectStroke: true,
            color: 'black',
        })
        canvasObj.renderAll()
    }

    const enableHDPIfunc = (e) => {
        let activeObject = canvasObj.getActiveObject();
        let enableHDPItemp = !enableHDPI;

        activeObject.set({
            left: Math.round(activeObject.left),
            top: Math.round(activeObject.top),
        });

        setEnableHDPI(enableHDPItemp);
        canvasObj.enableRetinaScaling = enableHDPItemp;
        canvasObj.renderAll();
    }

    const offscreenRenderFunc = (e) => {
        let offscreenRenderTemp = !offscreenRender
        setOffScreenRender(offscreenRender)
        canvasObj.skipOffscreen = offscreenRenderTemp
        canvasObj.renderAll()
    }

    return (
        <div>
            <div>
                Canvas complexity (number of paths): {noOfObjects}
            </div>
            <div className='object-buttons' style={{ marginTop: "10px" }}>
                Rasterize canvas to
                <Button variant='outline-dark' onClick={imageToCanvasFunc}>Image</Button>
                <Button variant='outline-dark' onClick={imagetoCanvas3x}>Image 3X Multiplied</Button>
                <Button variant='outline-dark' onClick={canvasToSvg}>SVG</Button>
                <Button variant='outline-dark' onClick={canvasToJson}>JSON</Button>
            </div>
            <div className='object-buttons' style={{ marginTop: "10px" }}>
                <Button onClick={clearCanvas} variant='outline-danger'>Clear Canvas</Button>
                <Button onClick={clearSelectedGroup} variant='outline-danger' >Remove Selected Group</Button>
            </div>
            <div className='object-buttons' style={{ marginTop: "10px" }}>
                Canvas background
                <Button variant='outline-dark' className='button-object' onClick={() => setBackgroundColorCheck(!backgroundColorCheck)}>Open Background Color Bar</Button>
                {
                    backgroundColorCheck && <SketchPicker
                        color={backgroundColor}
                        onChangeComplete={backgroundColorFunc}
                    />
                }
            </div>

            <div style={{ marginTop: "10px" }}>
                <Button variant='outline-dark' onClick={enterDrawingMode}>Enter Free Drawing</Button>
            </div>

            <div>
                Mode:
                <select value={brush} onChange={changeBrushFunc} style={{ marginLeft: "13px", marginTop: "10px" }}>
                    <option value="pencil">Pencil</option>
                    <option value="circle">Circle</option>
                    <option value="spray">Spray</option>
                </select>
            </div>

            <div style={{ marginTop: "10px", display: 'flex', alignItems: 'center' }} >
                Line Width:
                <input
                    type='range'
                    onChange={lineWidthSliderFunc}
                    min={1}
                    max={10}
                    step={1}
                    value={lineWidthSlider}
                    className='custom-slider' />
            </div>

            <div style={{ marginTop: "10px" }}>
                Line Color:
                <Button variant='outline-dark' className='button-object' onClick={() => setLineColorCheck(!lineColorCheck)}>Open Stroke Bar</Button>
                {
                    lineColorCheck && <SketchPicker
                        color={lineColor}
                        onChangeComplete={lineColorFunc}
                    />
                }
            </div>

            <div style={{ marginTop: "10px", display: 'flex', alignItems: 'center' }}>
                Line Shadow Width:
                <input
                    type='range'
                    onChange={shadowLineColorFunc}
                    min={1}
                    max={10}
                    step={1}
                    value={shadowLineSlider}
                    className='custom-slider' />
            </div>

            <div style={{ marginTop: "10px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                <div>
                    Enable HDPI Scaling
                    <input
                        type='checkbox'
                        onChange={enableHDPIfunc}
                        value={enableHDPI}
                        style={{ marginLeft: "10px" }}
                    />
                </div>
                <div style={{ marginLeft: "20px" }}>
                    Skip offscreen rendering
                    <input
                        type='checkbox'
                        onChange={offscreenRenderFunc}
                        value={offscreenRender}
                        style={{ marginLeft: "10px" }}
                    />
                </div>
            </div>

            <div style={{ marginTop: "10rem" }}>
                IMAGE:
                <img src={pngURL} alt='pngURL' />
            </div>

            <div style={{ marginTop: "3rem" }}>
                SVG:
                {
                    svgUrl &&
                    <img src={svgUrl} alt='svgURL' />
                }
            </div>

            <div style={{ marginTop: "3rem" }}>
                JSON:
                {
                    jsonUrl &&
                    <textarea rows="10" column="80" value={JSON.stringify(jsonUrl)} />
                }
            </div>

        </div>
    )
}

export default CanvasProperties