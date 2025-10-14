const soundWin = new Audio('aplausos.mp3');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let turn = 'X';
let cells = Array(9).fill(null);
let gameActive = true;

// Crear el tablero
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  board.appendChild(cell);
}

// Manejar clics
board.addEventListener('click', (e) => {
  if (!gameActive) return;
  const cell = e.target;
  const index = cell.dataset.index;

  if (!cell.classList.contains('cell') || cells[index]) return;

  cells[index] = turn;
  cell.textContent = turn;

  if (checkWin()) {
    statusText.textContent = `Ganó: ${turn}!`;
    sonidoAplausos.play();
    gameActive = false;
    return;
  }

  if (cells.every(c => c)) {
    statusText.textContent = "Empate!";
    gameActive = false;
    return;
  }

  turn = turn === 'X' ? 'O' : 'X';
  statusText.textContent = `Turno de: ${turn}`;
});

// Reiniciar
restartBtn.addEventListener('click', () => {
  cells.fill(null);
  document.querySelectorAll('.cell').forEach(c => c.textContent = '');
  turn = 'X';
  gameActive = true;
  statusText.textContent = `Turno de: X`;
});

// Comprobar si alguien gana
function checkWin() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8], // filas
    [0,3,6], [1,4,7], [2,5,8], // columnas
    [0,4,8], [2,4,6]           // diagonales
  ];

  return wins.some(comb => {
    const [a,b,c] = comb;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}
