import React from "react";
import "./App.css";
import Game from "./Game.js";

function App() {
  return (
    <div className="app">
      <Game rows={50} columns={50} />
    </div>
  );
}

export default App;
