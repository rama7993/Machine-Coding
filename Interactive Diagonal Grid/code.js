const ROWS = 10; // M rows
const COLS = 10; // N columns

const gridContainer = document.getElementById("grid");

function createGrid() {
  gridContainer.style.gridTemplateRows = `repeat(${ROWS}, 50px)`;
  gridContainer.style.gridTemplateColumns = `repeat(${COLS}, 50px)`;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", handleCellClick);
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  clearGrid();
  toggleCell(row, col);
}

function toggleCell(row, col) {
  const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  cell.classList.add("clicked");
  setDiagonalsColor(row, col);
}

function setDiagonalsColor(row, col) {
  const directions = [
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];

  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
      colorCell(r, c);
      r += dr;
      c += dc;
    }
  }
}

function colorCell(row, col) {
  const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  cell.classList.add("diagonal");
}

function clearGrid() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("clicked", "diagonal");
  });
}

document.getElementById("reset").addEventListener("click", () => clearGrid());

// Initialize
createGrid();
