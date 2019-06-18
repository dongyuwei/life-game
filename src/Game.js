import React, { Component } from "react";
import LifeGame from "./life_game.js";

class Game extends Component {
  constructor(props) {
    super(props);
    this.interval = props.interval;
    this.lifeGame = new LifeGame(props.rows, props.columns);
    this.tableCells = [];
    for (var i = 0; i < props.rows; i++) {
      this.tableCells[i] = [];
    }

    this.state = {
      grid: this.lifeGame.reset(),
      liveCells: 0
    };
  }

  start = () => {
    clearInterval(this.timer);
    if (this.state.liveCells === 0) {
      this.setState(
        {
          grid: this.lifeGame.initRandomly()
        },
        () => {
          this.continue();
        }
      );
    } else {
      this.continue();
    }
  };

  pause = () => {
    clearInterval(this.timer);
  };

  continue = () => {
    clearInterval(this.timer);
    const game = this.lifeGame;
    this.timer = setInterval(() => {
      const grid = game.iterate();
      const rows = game.rows;
      const columns = game.columns;
      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          const cellEl = this.tableCells[i][j];
          const cell = grid[i][j];
          if (cellEl.dataset.state !== grid[i][j].state.toString()) {
            cellEl.className = cell.state === 1 ? "live" : "dead";
            cellEl.dataset.state = cell.state;
          }
        }
      }
    }, this.interval);
  };

  next = () => {
    this.setState({
      grid: this.lifeGame.iterate()
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

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
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
                        id={`cell-${i}-${j}`}
                        data-state={cell.state}
                        key={j}
                        onClick={e => {
                          this.toggleCellState(cell);
                        }}
                        className={cell.state === 1 ? "live" : "dead"}
                        ref={el => {
                          this.tableCells[i][j] = el;
                        }}
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
