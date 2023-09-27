import React, { useContext, useEffect, useState } from 'react'
import { CanvasStore } from '../store/Context';
import { Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';


function TextProperties() {
    const {
        canvasObj
    } = useContext(CanvasStore);

    const [activeObject, setActiveObject] = useState(canvasObj.getActiveObject())
    const [textBoxValue, setTextBoxValue] = useState(canvasObj.getActiveObject().text)
    const [fontFamily, setFontFamily] = useState(canvasObj.getActiveObject().fontFamily)
    const [textAlign, setTextAlign] = useState(canvasObj.getActiveObject.textAlign)
    const [fontSize, setFontSize] = useState(canvasObj.getActiveObject().fontSize)
    const [lineHeight, setLineHeight] = useState(canvasObj.getActiveObject().lineHeight)
    const [charSpace, setCharSpace] = useState(canvasObj.getActiveObject().charSpace)
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const [underline, setUnderline] = useState(false)
    const [linethrough, setLinethrough] = useState(false)
    const [overline, setOverline] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState("")
    const [backgroundColorCheck, setBackgroundColorCheck] = useState(false)


    useEffect(()=> {
        canvasObj.on('mouse:down', handleMouseDown);
        canvasObj.on('after:render', handleSelection)
        canvasObj.renderAll()
    }, [])

    const handleMouseDown = (event) => {
        const activeObject = canvasObj.getActiveObject();
        if (activeObject) {
            setActiveObject(activeObject)
            setTextBoxValue(activeObject.text)
            setFontFamily(activeObject.fontFamily)
            setTextAlign(activeObject.textAlign)
            setBackgroundColor(activeObject.backgroundColor)
            setFontSize(activeObject.fontSize)
            setLineHeight(activeObject.lineHeight)
            setCharSpace(activeObject.charSpacing)
            setBold(activeObject.fontWeight == "bold" ? true : false)
            setItalic(activeObject.fontStyle == "italic" ? true :  false)
            setUnderline(activeObject.underline)
            setLinethrough(activeObject.linethrough)
            setOverline(activeObject.overline)
            setBackgroundColor(activeObject.backgroundColor)

            console.log("Active Object: ", activeObject);
        } 
    };

    const handleSelection = (e) => {
        const activeObject = canvasObj.getActiveObject()
        if (activeObject) {
            setTextBoxValue(activeObject.text)
        }
    }

    const changeTextFunc = (e) => {
        console.log("E: ", e.target.value);
        let textBoxValueTemp = e.target.value
        setTextBoxValue(textBoxValueTemp)
        activeObject.set({
            text: textBoxValueTemp
        })
        canvasObj.renderAll()
    }

    const changeFontFamilyFunc = (e) => {
        let textBoxValueTemp = e.target.value
        setFontFamily(textBoxValueTemp)
        activeObject.set({
            fontFamily: textBoxValueTemp
        })
        canvasObj.renderAll()
    }

    const changeTextAlignFunc = (e) => {
        let textBoxValueTemp = e.target.value
        setTextAlign(textBoxValueTemp)
        activeObject.set({
            textAlign: textBoxValueTemp
        })
        canvasObj.renderAll()
    }

    const backgroundColorFunc = (clr) => {
        let activeObject = canvasObj.getActiveObject()
        setBackgroundColor(clr.hex)
        activeObject.set({
            backgroundColor: clr.hex
        })
        canvasObj.renderAll()
    }

    const changeFontSizeFunc = (e) => {
        setFontSize(e.target.value)
        activeObject.set({
            fontSize: e.target.value
        })
        canvasObj.renderAll()
    }

    const changeLineHeighFunc = (e) => {
        setLineHeight(e.target.value)
        activeObject.set({
            lineHeight: e.target.value
        })
        canvasObj.renderAll()
    }

    const changeCharSpacFunc = (e) => {
        setCharSpace(e.target.value)
        activeObject.set({
            charSpacing: e.target.value
        })
        canvasObj.renderAll()
    }

    const changeBoldFunc = (e) => {
        let boldTemp = !bold
        if (boldTemp === true) {
            setBold(boldTemp)
            activeObject.set({
                fontWeight: 'bold'
            })
        } else {
            activeObject.set({
                fontWeight: 'normal'
            })
            setBold(boldTemp)
        }
        canvasObj.renderAll()
    }

    const changeItalicFunc = (e) => {
        let italicTemp = !italic
        if (italicTemp === true) {
            setItalic(italicTemp)
            activeObject.set({
                fontStyle: 'italic'
            })
        } else {
            setItalic(italicTemp)
            activeObject.set({
                fontStyle: 'normal'
            })
        }
        canvasObj.renderAll()
    }

    const underlineTextFunc = (e) => {
        let underlineTemp = !underline
        if (underlineTemp === true) {
        }
        else {
        }
        setUnderline(underlineTemp)
        activeObject.set({
            underline: underlineTemp
        })
        canvasObj.renderAll()
    }

    const linethroughFunc = (e) => {
        let linethroughTemp = !linethrough
        if (linethroughTemp === true) {
        } else {
        }
        setLinethrough(linethroughTemp)
        activeObject.set({
            linethrough: !linethrough
        })
        canvasObj.renderAll()
    }

    const overlineFunc = (e) => {
        let overlineTemp = !overline
        if (overlineTemp === true) {
        } else {
        }
        setOverline(overlineTemp)
        activeObject.set({
            overline: overlineTemp
        })
        canvasObj.renderAll()
    }

    return (
        <div style={{ border: "1px solid black", padding: "20px", flexDirection: "column" }}>
            <div>
                Text Specific Controls
                <textarea style={{ marginLeft: "13px" }} type='textarea' rows="3" column="80" value={textBoxValue} onChange={changeTextFunc} />
            </div>
            <div>
                Font Family:
                <select value={fontFamily} onChange={changeFontFamilyFunc} style={{ marginLeft: "13px", marginTop: "15px" }}>
                    <option value="Comic Sans">Comic Sans</option>
                    <option value="helvetica">Helvetica</option>
                    <option value="georgia">Georgia</option>
                </select>
            </div>
            <div>
                Text Align:
                <select value={textAlign} onChange={changeTextAlignFunc} style={{ marginLeft: "13px", marginTop: "15px" }}>
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>
            </div>
            <div style={{ marginLeft: "13px", marginTop: "15px" }}>
                Background Color:
                <Button variant='outline-dark' className='button-object' onClick={() => setBackgroundColorCheck(!backgroundColorCheck)}>Open Fill Bar</Button>
                {
                    backgroundColorCheck && <SketchPicker
                        color={backgroundColor}
                        onChangeComplete={backgroundColorFunc}
                    />
                }
            </div>
            <div style={{ marginLeft: "13px", marginTop: "15px", display: 'flex', alignItems: 'center' }}>
                Font Size:
                <input
                    type='range'
                    onChange={changeFontSizeFunc}
                    min={6}
                    max={150}
                    step={1}
                    value={fontSize}
                    className='custom-slider' />
            </div>
            <div style={{ marginLeft: "13px", marginTop: "15px", display: 'flex', alignItems: 'center' }}>
                Line Height:
                <input
                    type='range'
                    onChange={changeLineHeighFunc}
                    min={1}
                    max={20}
                    step={1}
                    value={lineHeight}
                    className='custom-slider' />
            </div>
            <div style={{ marginLeft: "13px", marginTop: "15px", display: 'flex', alignItems: 'center' }}>
                Char Spacing:
                <input
                    type='range'
                    onChange={changeCharSpacFunc}
                    min={2}
                    max={500}
                    step={2}
                    value={charSpace}
                    className='custom-slider' />
            </div>
            <div style={{ marginTop: "15px" }} className='button-object'>
                <Button className={bold === true && 'pressed'} variant="outline-secondary" onClick={changeBoldFunc}>Bold</Button>
                <Button className={italic === true && 'pressed'} style={{ marginLeft: "5px" }} onClick={changeItalicFunc} variant="outline-secondary">Italic</Button>
                <Button className={underline === true && 'pressed'} style={{ marginLeft: "5px" }} onClick={underlineTextFunc} variant="outline-secondary">Underline</Button>
                <Button className={linethrough === true && 'pressed'} style={{ marginLeft: "5px" }} onClick={linethroughFunc} variant="outline-secondary">Linethrough</Button>
                <Button className={overline === true && 'pressed'} style={{ marginLeft: "5px" }} onClick={overlineFunc} variant="outline-secondary">Overline</Button>
            </div>
        </div>
    )
}

export default TextProperties