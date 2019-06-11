import React from "react";
import "./App.css";
import Game from "./Game.js";

function App() {
  return (
    <div className="app">
      <Game rows={50} columns={100} />
    </div>
  );
}

export default App;
