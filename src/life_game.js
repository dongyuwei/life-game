class Cell {
  constructor(state, row, column) {
    this.state = state; // 0: death, 1: live
    this.row = row;
    this.column = column;
  }

  setNextState(liveNeighbours) {
    // 游戏规则：
    // - Any live cell with two or three live neighbours survives.
    // - Any dead cell with three live neighbours becomes a live cell.
    // - All other live cells die in the next generation. Similarly, all other dead cells stay dead.

    if (this.state === 1) {
      if (liveNeighbours !== 2 && liveNeighbours !== 3) {
        this.state = 0;
      }
    } else {
      if (liveNeighbours === 3) {
        this.state = 1;
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

  initRandomly() {
    return initGrid(this.rows, this.columns, this.grid);
  }

  initWithDeadCells() {
    return initGrid(this.rows, this.columns, this.grid, 0);
  }

  iterate() {
    const rows = this.rows;
    const columns = this.columns;
    const previousGrid = this.grid;
    const nextGrid = [];
    for (var i = 0; i < rows; i++) {
      nextGrid[i] = [];
      for (var j = 0; j < columns; j++) {
        const cell = new Cell(previousGrid[i][j].state, i, j);
        cell.setNextState(
          this.getAliveNeighbors(previousGrid, i, j, cell.state)
        );
        nextGrid[i][j] = cell;
      }
    }
    this.grid = nextGrid;
    return nextGrid;
  }

  getAliveNeighbors(grid, x, y, state) {
    let lives = 0;
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (grid[x + i] && grid[x + i][y + j]) {
          lives = lives + grid[x + i][y + j].state;
        }
      }
    }
    return lives - state;
  }
}

function initGrid(rows, columns, grid, initState) {
  for (var i = 0; i < rows; i++) {
    grid[i] = grid[i] || [];
    for (var j = 0; j < columns; j++) {
      const state = initState === 0 ? initState : random0or1();
      grid[i][j] = new Cell(state, i, j);
    }
  }
  return grid;
}

function random0or1() {
  return Math.random() > 0.5 ? 1 : 0;
}

export default LifeGame;
