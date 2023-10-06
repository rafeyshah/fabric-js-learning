import React, { useContext, useEffect, useState } from 'react'
import { CanvasStore } from '../store/Context';
import { Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';


function TextProperties({ currentObject }) {
    const {
        canvasObj,
        textEditable
    } = useContext(CanvasStore);

    const [activeObject, setActiveObject] = useState(currentObject)
    // const [groupActiveObj, setGroupActiveObj] = useState()
    const [textBoxValue, setTextBoxValue] = useState(currentObject.text)
    const [fontFamily, setFontFamily] = useState(currentObject.fontFamily)
    const [textAlign, setTextAlign] = useState(currentObject.getActiveObject?.textAlign)
    const [fontSize, setFontSize] = useState(currentObject?.fontSize)
    const [lineHeight, setLineHeight] = useState(currentObject?.lineHeight)
    const [charSpace, setCharSpace] = useState(currentObject?.charSpace)
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const [underline, setUnderline] = useState(false)
    const [linethrough, setLinethrough] = useState(false)
    const [overline, setOverline] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState("")
    const [backgroundColorCheck, setBackgroundColorCheck] = useState(false)
    const [move, setMove] = useState(false)


    useEffect(() => {
        const activeObject2 = textEditable ? textEditable : canvasObj.getActiveObject();
        setActiveObject(activeObject2)

        canvasObj.on('mouse:down', handleMouseDown);
        canvasObj.on('after:render', handleSelection)
        canvasObj.renderAll()
    }, [canvasObj])

    useEffect(() => {
        handleSelection()
    }, [move])

    // useEffect(()=> {

    //     const left = groupObjects.left
    //     const top = groupObjects.top
    //     const width = groupObjects.getScaledWidth()
    //     const height = groupObjects.getScaledHeight()
    // }, [canvasObj])

    const handleMouseDown = (event) => {
        // console.log("Text Editable: ", textEditable);
        // console.log("Active Object: ", canvasObj.getActiveObject());
        const activeObject = textEditable ? textEditable : canvasObj.getActiveObject();
        // console.log("Selected Object:  ", activeObject);
        // console.log("Active Object: ", activeObject);
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
            setItalic(activeObject.fontStyle == "italic" ? true : false)
            setUnderline(activeObject.underline)
            setLinethrough(activeObject.linethrough)
            setOverline(activeObject.overline)
            setBackgroundColor(activeObject.backgroundColor)

            // console.log("Inside");
        }
    };

    const handleSelection = (e) => {
        const groupObject = canvasObj.getActiveObject()
        const activeObject = textEditable ? textEditable : canvasObj.getActiveObject()
        if (activeObject) {
            setTextBoxValue(activeObject.text)
        }

        if (move == true && groupObject && groupObject._objects) {
            let groupObjectTrans = groupObject.getBoundingRect(true, true);
            // let left = groupObjectTrans.left
            // let top = groupObjectTrans.top
            // let width = groupObjectTrans.width
            // let height = groupObjectTrans.height

            let activeObjectTrans = activeObject.calcTransformMatrix();

            console.log("\n\n***************");
            console.log("Group Object");
            // console.log("Top: ", top);
            console.log("Left: ", groupObject.left);
            console.log("Width: ", groupObject.width);

            // console.log("Width: ", width);
            // console.log("Height: ", height);
            console.log("\nEditable Text");
            console.log("Top: ", activeObjectTrans[5]);
            console.log("Left: ", activeObjectTrans[4]);
            console.log("Width: ", activeObject.width);
            // console.log("Heigh/t: ", activeObject.height);
            console.log("***************");

            let leftBorder = (activeObjectTrans[4] - activeObject.width / 2)
            let topBorder = (activeObjectTrans[5] - activeObject.height / 2)
            console.log(`leftBorder: ${leftBorder} >= width: ${groupObject.width}`);
            if (leftBorder <= groupObject.left) {
                groupObject.width += 20
                activeObject.left += 5
            }
            else if (leftBorder >= groupObject.width) {
                groupObject.width = groupObject.width + 25;
                activeObject.left = activeObject.left - 50;
            }
            else if (topBorder <= groupObject.top) {
                groupObject.height += 20
                activeObject.top += 5
            }
            else if (topBorder >= groupObject.height) {
                groupObject.height += 20
                activeObject.top -= 50
            }

            setMove(false)
            groupObject.dirty = true
            activeObject.dirty = true
            canvasObj.renderAll()

        }
    }

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

    const leftMove = () => {
        textEditable.dirty = true
        setActiveObject(textEditable)

        let rightPrev = activeObject.left
        activeObject.set({
            left: rightPrev - 15
        })
        setMove(true)
        canvasObj.renderAll()
    }

    const rightMove = () => {

        // let groupObjects = canvasObj.groupObjects()s
        // console.log("\n\n");

        // var m = activeObject.calcTransformMatrix();

        // return {left: m[4], top: m[5]};
        // console.log("Bounding Rect Left: ", m[4])
        // console.log("Bounding Rect Top: ", m[5])
        // console.log("Active Object: ", activeObject)
        // console.log("Active Object Width: ", activeObject.width);
        // console.log("Active Object Height: ", activeObject.height);

        textEditable.dirty = true
        setActiveObject(textEditable)

        let leftPrev = activeObject.left
        activeObject.set({
            left: leftPrev + 15
        })

        setMove(true)
        canvasObj.renderAll()

    }

    const topMove = () => {
        textEditable.dirty = true
        setActiveObject(textEditable)

        let bottomPrev = activeObject.top
        activeObject.set({
            top: bottomPrev - 15
        })
        setMove(true)
        canvasObj.renderAll()
    }

    const downMove = () => {
        textEditable.dirty = true
        setActiveObject(textEditable)

        let topPrev = activeObject.top
        activeObject.set({
            top: topPrev + 15
        })
        setMove(true)
        canvasObj.renderAll()
    }

    return (
        <div style={{ border: "1px solid black", padding: "20px", flexDirection: "column" }}>
            <div>
                Text Specific Controls
                <textarea style={{ marginLeft: "13px" }} type='textarea' rows="3" column="80" value={textBoxValue} onChange={changeTextFunc} />
            </div>
            <div className='button-object'>
                <Button variant='outline-dark' onClick={leftMove}>Left Move</Button>
                <Button variant='outline-dark' onClick={rightMove}>Right Move</Button>
                <Button variant='outline-dark' onClick={topMove}>Top Move</Button>
                <Button variant='outline-dark' onClick={downMove}>Down Move</Button>
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