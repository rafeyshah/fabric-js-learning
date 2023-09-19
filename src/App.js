import './App.css';
import React from 'react';
import Canvas from './Canvas';
import { StoreContext } from './store/Context';
import RightPanel from './RightPanel';

function App() {
 

  return (
    <div className='container'>
      <StoreContext>
        <Canvas></Canvas>
        <RightPanel></RightPanel>
      </StoreContext>
    </div>
  );
}

export default App;
