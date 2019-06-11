import React, { Component } from "react";
import LifeGame from "./life_game.js";

class Game extends Component {
  constructor(props) {
    super(props);
    this.interval = props.interval;
    this.lifeGame = new LifeGame(props.rows, props.columns);
    this.state = {
      grid: this.lifeGame.reset(),
      liveCells: 0
    };
  }

  start = () => {
    clearInterval(this.timer);
    this.setState(
      {
        grid:
          this.state.liveCells === 0
            ? this.lifeGame.initRandomly()
            : this.state.grid
      },
      () => {
        this.continue();
      }
    );
  };

  pause = () => {
    clearInterval(this.timer);
  };

  continue = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.lifeGame.iterate();
      this.setState({
        grid: this.lifeGame.grid
      });
    }, this.interval);
  };

  next = () => {
    const grid = this.lifeGame.iterate();
    this.setState({
      grid: grid
    });
  };

  reset = () => {
    clearInterval(this.timer);
    this.setState({
      grid: this.lifeGame.reset(),
      liveCells: 0
    });
  };

  setIterationInterval = e => {
    this.interval = e.target.value;
    this.continue();
  };

  toggleCellState(cell) {
    cell.state = cell.state === 0 ? 1 : 0;

    this.setState({
      liveCells: this.state.liveCells + cell.state
    });
  }

  render() {
    const { grid } = this.state;
    return (
      <div>
        <div className="controls">
          <button onClick={this.start}>start</button>
          <button onClick={this.next}>next</button>
          <button onClick={this.pause}>pause</button>
          <button onClick={this.continue}>continue</button>
          <button onClick={this.reset}>reset</button>
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
                        onClick={e => {
                          this.toggleCellState(cell);
                        }}
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
