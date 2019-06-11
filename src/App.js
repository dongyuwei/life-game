import React from "react";
import "./App.css";
import Game from "./Game.js";

function App() {
  return (
    <div className="app">
      <h1>Life Game</h1>
      <Game rows={50} columns={100} interval={100} />
      <div>人生代代无穷已，江月年年只相似。</div>
    </div>
  );
}

export default App;
