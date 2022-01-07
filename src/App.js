import React from 'react';
import './App.css';
import Game from './Game.js';

function App() {
  return (
    <div className='app'>
      <Game rows={60} columns={100} interval={200} />
      <div className='poetry'>人生代代无穷已，江月年年只相似</div>
    </div>
  );
}

export default App;
