class Cell {
  constructor(state, row, column) {
    this.state = state; // 0: death, 1: live
    this.row = row;
    this.column = column;
  }

  setNextState(neighbors) {
    const lives = neighbors.reduce((acc, cell) => {
      if (cell) {
        acc = acc + cell.state;
      }
      return acc;
    }, 0);

    if (this.state === 0) {
      if (lives === 3) {
        this.state = 1;
      }
    } else {
      if (lives >= 4 || lives <= 1) {
        this.state = 0;
      }
    }
  }
}

class LifeGame {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = [];
  }

  init() {
    const rows = this.rows;
    const columns = this.columns;
    const grid = this.grid;
    for (var i = 0; i < rows; i++) {
      grid[i] = [];
      for (var j = 0; j < columns; j++) {
        grid[i][j] = new Cell(random(0, 1), i, j);
      }
    }
    return grid;
  }

  iterate() {
    const rows = this.rows;
    const columns = this.columns;
    const grid = this.grid;
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        const cell = grid[i][j];
        cell.setNextState(this.getNeighbors(grid, cell));
      }
    }
  }

  getNeighbors(grid, cell) {
    const x = cell.row,
      y = cell.column;
    const neightbors = [];

    if (grid[x - 1]) {
      neightbors.push(grid[x - 1][y - 1]);
      neightbors.push(grid[x - 1][y]);
      neightbors.push(grid[x - 1][y + 1]);
    }
    if (grid[x + 1]) {
      neightbors.push(grid[x + 1][y - 1]);
      neightbors.push(grid[x + 1][y]);
      neightbors.push(grid[x + 1][y + 1]);
    }

    if (grid[x][y - 1]) {
      neightbors.push(grid[x][y - 1]);
    }
    if (grid[x][y + 1]) {
      neightbors.push(grid[x][y + 1]);
    }

    return neightbors;
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default LifeGame;
