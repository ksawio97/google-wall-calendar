import React from 'react';
import TopBar from './components/TopBar';
import './index.css';

function App() {
  return (
    <div className="w-screen h-screen">
        <TopBar></TopBar> 
        <h1 className="text-3xl font-bold underline">
            base
        </h1>
    </div>
  );
}

export default App;
