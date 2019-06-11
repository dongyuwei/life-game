import React, { Component } from "react";
import LifeGame from "./life_game.js";

class Game extends Component {
  constructor(props) {
    super(props);
    this.lifeGame = new LifeGame(props.rows, props.columns);
    this.state = {
      grid: this.lifeGame.init()
    };
  }

  start = () => {
    this.timer = setInterval(() => {
      this.lifeGame.iterate();
      this.setState(this.lifeGame.grid);
    }, 200);
  };

  pause = () => {
    clearInterval(this.timer);
  };

  restart = () => {
    this.setState(
      {
        grid: this.lifeGame.init()
      },
      () => {
        this.start();
      }
    );
  };

  render() {
    const grid = this.state.grid;
    return (
      <div>
        <div className="controls">
          <button onClick={this.start}>start</button>
          <button onClick={this.pause}>pause</button>
          <button onClick={this.start}>continue</button>
          <button onClick={this.restart}>restart</button>
        </div>

        <table className="gameGrid">
          <tbody>
            {grid.map((rows, i) => {
              return (
                <tr key={i}>
                  {rows.map((cell, j) => {
                    return (
                      <td
                        key={j}
                        className={cell.state === 1 ? "live" : "dead"}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Game;
