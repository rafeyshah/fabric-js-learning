import React, { useContext, useEffect, useState, useRefs } from 'react'
import { CanvasStore } from '../store/Context';
import { Button } from 'react-bootstrap';

function CanvasProperties() {
    const {
        canvasObj,
        image,
        setImage
    } = useContext(CanvasStore);

    const [noOfObjects, setNoOfObjects] = useState(0)

    useEffect(() => {
        setNoOfObjects(canvasObj.getObjects().length)
    }, [canvasObj])

    const imageToCanvasFunc = (e) => {
        let pngURL = canvasObj.toDataURL();
        

    }
    
    return (
        <div>
            <div>
                Canvas complexity (number of paths): {noOfObjects}
            </div>
            <div className='object-buttons' style={{marginTop: "10px"}}> 
                Rasterize canvas to
                <Button onClick={imageToCanvasFunc}>Image</Button>
                <Button>Image 3X Multiplied</Button>
                <Button>SVG</Button>
                <Button>JSON</Button>
            </div>
        </div>
    )
}

export default CanvasProperties