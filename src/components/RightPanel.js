import React, { useState } from 'react'
import Simple from './Simple'
import Nav from 'react-bootstrap/Nav';
import Object from './Object';
import CanvasProperties from './CanvasProperties';


function RightPanel() {
    const [menuPanel, setMenuPanel] = useState("simple")
    return (

        <div className='right-panel' >

            <Nav
                onSelect={(selectedKey) => setMenuPanel(selectedKey)}
            >
                <Nav.Item>
                    <Nav.Link eventKey="simple">Simple</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="object">Object Properties</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="canvas">Canvas</Nav.Link>
                </Nav.Item>
            </Nav>

            {menuPanel === "simple" && <Simple />}
            {menuPanel === "object" && <Object />}
            {menuPanel === "canvas" && <CanvasProperties />}

        </div>
    )
}

export default RightPanel