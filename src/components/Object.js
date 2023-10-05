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
        textEditable,
        setTextEditable
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


    const [activeObject, setActiveObject] = useState(canvasObj.getActiveObject())
    const CLIP_POSITIONS = {
        LEFT_TOP: "left-top",
        LEFT_MIDDLE: "left-center",
        LEFT_BOTTOM: "left-bottom",
        CENTER_TOP: "center-top",
        CENTER_MIDDLE: "center-center",
        CENTER_BOTTOM: "center-bottom",
        RIGHT_TOP: "right-top",
        RIGHT_MIDDLE: "right-center",
        RIGHT_BOTTOM: "right-bottom"
    }

    useEffect(() => {
        let activeObject = canvasObj.getActiveObject()
        setActiveObject(activeObject)
        handleMouseDown()
        canvasObj.on('mouse:down', handleMouseDown);
        canvasObj.on('after:render', handleSelection)

        canvasObj.renderAll()
    }, [canvasObj])

    const handleSelection = (event) => {
        let activeObject = canvasObj.getActiveObject()
        if (activeObject && activeObject._element && activeObject._element.classList && activeObject._element.classList[0].includes('img')) {
            fabric.Object.prototype.controls.mr = new fabric.Control({
                x: 0.5,
                y: 0,
                actionHandler: actionScalingOrSkewingCropHandler,
                render: renderLeftOrRight
            })

            fabric.Object.prototype.controls.ml = new fabric.Control({
                x: -0.5,
                y: 0,
                actionHandler: actionScalingOrSkewingCropHandler,
                render: renderLeftOrRight
            })

            fabric.Object.prototype.controls.mt = new fabric.Control({
                x: 0,
                y: -0.5,
                actionHandler: actionScalingOrSkewingCropHandler,
                render: renderTopOrBottom
            })

            fabric.Object.prototype.controls.mb = new fabric.Control({
                x: 0,
                y: 0.5,
                actionHandler: actionScalingOrSkewingCropHandler,
                render: renderTopOrBottom
            })
        }

    }

    const handleMouseDown = (event) => {
        const activeObject = canvasObj.getActiveObject()
        const groupObjects = canvasObj.getObjects();

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

            if (activeObject._element && activeObject._element.classList && activeObject._element.classList[0].includes('img')) {
                fabric.Image.prototype._render = function (ctx) {

                    const width = this.width,
                        height = this.height,
                        cropWidth = this.cropWidth ? this.cropWidth : this.width,
                        cropHeight = this.cropHeight ? this.cropHeight : this.height,
                        cropX = this.cropX,
                        cropY = this.cropY;

                    ctx.save();

                    ctx.drawImage(
                        this._element,
                        Math.max(cropX, 0),
                        Math.max(cropY, 0),
                        Math.max(1, cropWidth),
                        Math.max(1, cropHeight),
                        -width / 2,
                        -height / 2,
                        Math.max(0, width),
                        Math.max(0, height)
                    );

                    ctx.restore();

                }
            }

        }

        if (groupObjects && event && event.subTargets) {
            setActiveObject(event.subTargets[0])
            setTextEditable(event.subTargets[0])
            // console.log(event.subTargets[0]);
            canvasObj.renderAll()
        }

    };

    const render = (shadowOffsetX, shadowOffsetY, fn) => {
        // const angle = activeObject.angle;
        const controlsUtils = fabric.controlsUtils

        return function (ctx, left, top, styleOverride, fabricObject) {
            if (fabricObject.disableCrop) {
                return controlsUtils.renderCircleControl(ctx, left, top, styleOverride, fabricObject);
            }

            ctx.save();
            ctx.translate(left, top);
            //   ctx.rotate(fabric.util.degreesToRadians(angle + fabricObject.angle));
            ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = shadowOffsetX;
            ctx.shadowOffsetY = shadowOffsetY;
            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            ctx.strokeStyle = "#FFFFFF";
            fn.call(this, ctx)
            ctx.stroke();
            ctx.restore();
        }
    }

    const renderLeftOrRight = (ctx, left, top, styleOverride, fabricObject) => {
        render.call(this, 0, 0, function (ctx) {
            ctx.moveTo(0, -8);
            ctx.lineTo(0, 8);
        })(ctx, left, top, styleOverride, fabricObject);
    }

    const renderTopOrBottom = (ctx, left, top, styleOverride, fabricObject) => {
        render.call(this, 0, 0, function (ctx) {
            ctx.moveTo(-8, 0);
            ctx.lineTo(8, 0);
        })(ctx, left, top, styleOverride, fabricObject);
    }

    const actionScalingOrSkewingCropHandler = (eventData, transform, x, y) => {
        const { target, corner } = transform;
        const scalingXOrSkewingY = fabric.controlsUtils.scalingXOrSkewingY
        const scalingYOrSkewingX = fabric.controlsUtils.scalingYOrSkewingX


        applyCrop(transform.target);

        if (corner === "mr" || corner === "ml") {
            return scalingXOrSkewingY(eventData, transform, x, y);
        }

        if (corner === "mt" || corner === "mb") {
            return scalingYOrSkewingX(eventData, transform, x, y);
        }
    }

    const applyCrop = (activeObject) => {

        const crop = getCrop(
            activeObject.getOriginalSize(),
            {
                width: activeObject.getScaledWidth(),
                height: activeObject.getScaledHeight(),
            }
        );

        activeObject.set(crop);
        activeObject.setCoords();
        canvasObj.renderAll()
    }

    const getCrop = (image, size) => {
        const width = size.width;
        const height = size.height;
        const aspectRatio = width / height;

        let newWidth;
        let newHeight;

        const imageRatio = image.width / image.height;

        const activeObject = canvasObj.getActiveObject()
        let clipPosition = activeObject.originX + "-" + activeObject.originY

        if (aspectRatio >= imageRatio) {
            newWidth = image.width;
            newHeight = image.width / aspectRatio;
        } else {
            newWidth = image.height * aspectRatio;
            newHeight = image.height;
        }

        let x = 0;
        let y = 0;

        if (clipPosition === CLIP_POSITIONS.LEFT_TOP) {
            x = 0;
            y = 0;
        } else if (clipPosition === CLIP_POSITIONS.LEFT_MIDDLE) {
            x = 0;
            y = (image.height - newHeight) / 2;
        } else if (clipPosition === CLIP_POSITIONS.LEFT_BOTTOM) {
            x = 0;
            y = image.height - newHeight;
        } else if (clipPosition === CLIP_POSITIONS.CENTER_TOP) {
            x = (image.width - newWidth) / 2;
            y = 0;
        } else if (clipPosition === CLIP_POSITIONS.CENTER_MIDDLE) {
            x = (image.width - newWidth) / 2;
            y = (image.height - newHeight) / 2;
        } else if (clipPosition === CLIP_POSITIONS.CENTER_BOTTOM) {
            x = (image.width - newWidth) / 2;
            y = image.height - newHeight;
        } else if (clipPosition === CLIP_POSITIONS.RIGHT_TOP) {
            x = image.width - newWidth;
            y = 0;
        } else if (clipPosition === CLIP_POSITIONS.RIGHT_MIDDLE) {
            x = image.width - newWidth;
            y = (image.height - newHeight) / 2;
        } else if (clipPosition === CLIP_POSITIONS.RIGHT_BOTTOM) {
            x = image.width - newWidth;
            y = image.height - newHeight;
        } else {
            console.error(
                new Error("Unknown clip position property - " + clipPosition)
            );
        }

        return {
            cropX: x,
            cropY: y,
            cropWidth: newWidth,
            cropHeight: newHeight
        };
    }

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

    const groupSelection = (e) => {
        if (!canvasObj.getActiveObject()) {
            return;
        }
        if (canvasObj.getActiveObject().type !== 'activeSelection') {
            return;
        }
        const group = canvasObj.getActiveObject().toGroup();
        group.subTargetCheck = true;
        canvasObj.add(group);
        canvasObj.renderAll();
    }

    const unGroupSelection = (e) => {
        if (!canvasObj.getActiveObject()) {
            return;
        }
        if (canvasObj.getActiveObject().type !== 'group') {
            return;
        }
        canvasObj.getActiveObject().toActiveSelection();
        canvasObj.requestRenderAll();
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

        if (checkTemp == true) {
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
            activeObject.set({ shadow: null })
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

    const customControlsFunc = (e) => {
        function getObjectSizeWithStroke(object) {
            var stroke = new fabric.Point(
                object.strokeUniform ? 1 / object.scaleX : 1,
                object.strokeUniform ? 1 / object.scaleY : 1
            ).multiply(object.strokeWidth);
            return new fabric.Point(object.width + stroke.x, object.height + stroke.y);
        }
        function polygonPositionHandler(dim, finalMatrix, fabricObject) {
            var x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x),
                y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
            return fabric.util.transformPoint(
                { x: x, y: y },
                fabric.util.multiplyTransformMatrices(
                    fabricObject.canvas.viewportTransform,
                    fabricObject.calcTransformMatrix()
                )
            );
        }
        function actionHandler(eventData, transform, x, y) {
            var polygon = transform.target,
                currentControl = polygon.controls[polygon.__corner],
                mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
                polygonBaseSize = getObjectSizeWithStroke(polygon),
                size = polygon._getTransformedDimensions(0, 0),
                finalPointPosition = {
                    x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
                    y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
                };
            polygon.points[currentControl.pointIndex] = finalPointPosition;
            activeObject.dirty = true
            return true;
        }

        function anchorWrapper(anchorIndex, fn) {
            return function (eventData, transform, x, y) {
                var fabricObject = transform.target,
                    absolutePoint = fabric.util.transformPoint({
                        x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
                        y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
                    }, fabricObject.calcTransformMatrix()),
                    actionPerformed = fn(eventData, transform, x, y),
                    newDim = fabricObject._setPositionDimensions({}),
                    polygonBaseSize = getObjectSizeWithStroke(fabricObject),
                    newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
                    newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
                fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);

                return actionPerformed;
            }
        }

        let activeObject = canvasObj.getActiveObject()
        const lastControl = activeObject.points.length - 1;
        activeObject.cornerStyle = 'circle';
        activeObject.cornerColor = 'rgba(0,0,255,0.5)';
        activeObject.controls = activeObject.points.reduce(function (acc, point, index) {
            acc['p' + index] = new fabric.Control({
                positionHandler: polygonPositionHandler,
                actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                actionName: 'modifyPolygon',
                pointIndex: index,
            });
            return acc;
        }, {});

        canvasObj.renderAll()

    }

    const tryCustomControls = (e) => {
        function getObjectSizeWithStroke(object) {
            var stroke = new fabric.Point(
                object.strokeUniform ? 1 / object.scaleX : 1,
                object.strokeUniform ? 1 / object.scaleY : 1
            ).multiply(object.strokeWidth);
            return new fabric.Point(object.width + stroke.x, object.height + stroke.y);
        }
        function polygonPositionHandler(dim, finalMatrix, fabricObject) {
            var x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x),
                y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
            return fabric.util.transformPoint(
                { x: x, y: y },
                fabric.util.multiplyTransformMatrices(
                    fabricObject.canvas.viewportTransform,
                    fabricObject.calcTransformMatrix()
                )
            );
        }
        function actionHandler(eventData, transform, x, y) {
            var polygon = transform.target,
                currentControl = polygon.controls[polygon.__corner],
                mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
                polygonBaseSize = getObjectSizeWithStroke(polygon),
                size = polygon._getTransformedDimensions(0, 0),
                finalPointPosition = {
                    x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
                    y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
                };
            polygon.points[currentControl.pointIndex] = finalPointPosition;
            activeObject.dirty = true
            return true;
        }

        function anchorWrapper(anchorIndex, fn) {
            return function (eventData, transform, x, y) {
                var fabricObject = transform.target,
                    absolutePoint = fabric.util.transformPoint({
                        x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
                        y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
                    }, fabricObject.calcTransformMatrix()),
                    actionPerformed = fn(eventData, transform, x, y),
                    newDim = fabricObject._setPositionDimensions({}),
                    polygonBaseSize = getObjectSizeWithStroke(fabricObject),
                    newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
                    newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
                fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);

                return actionPerformed;
            }
        }


        let activeObject = canvasObj.getActiveObject()
        const lastControl = activeObject.points.length - 1;
        activeObject.cornerStyle = 'circle';
        activeObject.cornerColor = 'yellow';
        activeObject.transparentCorners = false
        const indicesToKeep = [1, 7];

        activeObject.controls = activeObject.points.reduce(function (acc, point, index) {
            if (indicesToKeep.includes(index)) {
                acc['p' + index] = new fabric.Control({
                    positionHandler: polygonPositionHandler,
                    actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                    actionName: 'modifyPolygon',
                    pointIndex: index,
                });
            }
            return acc;
        }, {});

        canvasObj.renderAll()
    }

    const customControlsDetailed = (e) => {
        function getObjectSizeWithStroke(object) {
            var stroke = new fabric.Point(
                object.strokeUniform ? 1 / object.scaleX : 1,
                object.strokeUniform ? 1 / object.scaleY : 1
            ).multiply(object.strokeWidth);
            return new fabric.Point(object.width + stroke.x, object.height + stroke.y);
        }
        function polygonPositionHandler(dim, finalMatrix, fabricObject) {
            if (this.pointIndex === 1) {
                var x = (17),
                    y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
            } else if (this.pointIndex === 7) {
                var x = (-17),
                    y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
            }
            return fabric.util.transformPoint(
                { x: x, y: y },
                fabric.util.multiplyTransformMatrices(
                    fabricObject.canvas.viewportTransform,
                    fabricObject.calcTransformMatrix()
                )
            );
        }
        function actionHandler(eventData, transform, x, y) {
            var activeObject = transform.target
            var point1 = activeObject.points[1];
            var point7 = activeObject.points[7];
            var midPoint = {
                x: (point1.x + point7.x) / 3,
                y: (point1.y + point7.y) / 3
            };

            var radius = 10;

            for (var i = 0; i < activeObject.points.length; i++) {
                var angle = (i / (activeObject.points.length - 2)) * (2 * Math.PI);

                var newX = midPoint.x + radius * Math.cos(angle);
                var newY = midPoint.y + radius * Math.sin(angle);

                activeObject.points[i] = new fabric.Point(newX, newY);
            }

            activeObject.setCoords();
            activeObject.dirty = true
            canvasObj.renderAll();

            return true;
        }

        function anchorWrapper(anchorIndex, fn) {
            return function (eventData, transform, x, y) {
                var fabricObject = transform.target,
                    absolutePoint = fabric.util.transformPoint({
                        x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
                        y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
                    }, fabricObject.calcTransformMatrix()),
                    actionPerformed = fn(eventData, transform, x, y),
                    newDim = fabricObject._setPositionDimensions({}),
                    polygonBaseSize = getObjectSizeWithStroke(fabricObject),
                    newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
                    newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
                fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);

                return actionPerformed;
            }
        }


        let activeObject = canvasObj.getActiveObject()
        const lastControl = activeObject.points.length - 1;
        activeObject.cornerStyle = 'circle';
        activeObject.cornerColor = 'black';
        activeObject.transparentCorners = true
        const indicesToKeep = [1, 7];

        activeObject.controls = activeObject.points.reduce(function (acc, point, index) {
            if (indicesToKeep.includes(index)) {
                acc['p' + index] = new fabric.Control({
                    positionHandler: polygonPositionHandler,
                    actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                    actionName: 'modifyPolygon',
                    pointIndex: index,
                });
            }
            return acc;
        }, {});

        canvasObj.renderAll()
    }

    const defaultControls = (e) => {
        let poly = canvasObj.getActiveObject()
        poly.cornerColor = 'blue';
        poly.cornerStyle = 'rect';
        poly.controls = fabric.Object.prototype.controls;
        poly.dirty = true;
        canvasObj.renderAll()
    }

    let button
    console.log("Active Object: ", activeObject);
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
                <Button variant="outline-dark" onClick={groupSelection}>Group Selection</Button>
                <Button variant="outline-dark" onClick={unGroupSelection}>Ungroup Selection</Button>
            </div>
            <div className='object-buttons panel-item'>
                <Button variant="outline-dark" onClick={customControlsFunc}>Custom Controls</Button>
                <Button variant='outline-dark' onClick={tryCustomControls}>Trying Custom Controls</Button>
                <Button variant='outline-dark' onClick={customControlsDetailed}>More Detailed Controls</Button>
                <Button variant='outline-dark' onClick={defaultControls}>Default Controls</Button>
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