import React, { useContext, useState } from 'react'
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

    const changeTextFunc = (e) => {
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
            e.target.classList.add('pressed')
        } else {
            activeObject.set({
                fontWeight: 'normal'
            })
            e.target.classList.remove('pressed')
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
            e.target.classList.add('pressed')
        } else {
            setItalic(italicTemp)
            activeObject.set({
                fontStyle: 'normal'
            })
            e.target.classList.remove('pressed')
        }
        canvasObj.renderAll()
    }

    const underlineTextFunc = (e) => {
        let underlineTemp = !underline
        if (underlineTemp === true) {
            e.target.classList.add('pressed')
        }
        else {
            e.target.classList.remove('pressed')
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
            e.target.classList.add('pressed')
        } else {
            e.target.classList.remove('pressed')
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
            e.target.classList.add('pressed')
        } else {
            e.target.classList.remove('pressed')
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
            <div style={{ marginLeft: "13px", marginTop: "15px" }}>
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
            <div style={{ marginLeft: "13px", marginTop: "15px" }}>
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
            <div style={{ marginLeft: "13px", marginTop: "15px" }}>
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
                <Button variant="outline-secondary" onClick={changeBoldFunc}>Bold</Button>
                <Button style={{ marginLeft: "5px" }} onClick={changeItalicFunc} variant="outline-secondary">Italic</Button>
                <Button style={{ marginLeft: "5px" }} onClick={underlineTextFunc} variant="outline-secondary">Underline</Button>
                <Button style={{ marginLeft: "5px" }} onClick={linethroughFunc} variant="outline-secondary">Linethrough</Button>
                <Button style={{ marginLeft: "5px" }} onClick={overlineFunc} variant="outline-secondary">Overline</Button>
            </div>
        </div>
    )
}

export default TextProperties