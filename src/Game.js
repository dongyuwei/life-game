import React, { Component } from "react";
import LifeGame from "./life_game.js";

class Game extends Component {
  constructor(props) {
    super(props);
    this.interval = props.interval;
    this.lifeGame = new LifeGame(props.rows, props.columns);
    this.state = {
      grid: this.lifeGame.init()
    };
  }

  start = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.lifeGame.iterate();
      this.setState({
        grid: this.lifeGame.grid
      });
    }, this.interval);
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

  setIterationInterval = e => {
    this.interval = e.target.value;
    this.start();
  };

  render() {
    const { grid } = this.state;
    return (
      <div>
        <div className="controls">
          <button onClick={this.start}>start</button>
          <button onClick={this.pause}>pause</button>
          <button onClick={this.start}>continue</button>
          <button onClick={this.restart}>restart</button>
          <input
            onChange={this.setIterationInterval}
            placeholder="设置迭代速度（迭代间隔）"
          />
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
