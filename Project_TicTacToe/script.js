let ply1;
let ply2;
const board = '<h1>Welcome to Tic-Tac-Toe Game</h1><p id="pname"></p><div id="inner-container"></div>'

function startGame() {
    ply1 = document.getElementById("ply1").value;
    ply2 = document.getElementById("ply2").value;
    alert(`${ply1}: X\n${ply2}: O`);

    document.getElementById("container").innerHTML = board;
    initGame();
}

function initGame() {
    const cells = document.getElementById('inner-container');
    const status = document.getElementById('pname');
    let currentPlayer = ply1;
    let gameBoard = Array(9).fill('');
    let gameActive = true;

    // Initialize the game board
    updateBoard();

    // Add click event listeners to each cell
    cells.addEventListener('click', (event) => cellClick(event.target.dataset.index));

    // Handle cell click
    function cellClick(index) {
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer === ply1 ? 'X' : "O";
            updateBoard();

            if (checkWinner()) {
                document.getElementById("container").innerHTML = `<h1>${currentPlayer} wins!</h1>`;
                gameActive = false;
            } else if (gameBoard.every(cell => cell !== '')) {
                document.getElementById("container").innerHTML = `<h1>"It's a tie!!!"</h1>`;
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === ply1 ? ply2 : ply1;
                status.textContent = `${currentPlayer}'s turn`;
            }
        }
    }

    // Checking for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    // Update the game board in the webpage
    function updateBoard() {
        cells.innerHTML = '';
        gameBoard.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('box');
            cell.dataset.index = index;
            cell.textContent = value;
            cells.appendChild(cell);
        });

        if (gameActive) {
            status.textContent = `${currentPlayer}'s turn`;
        }
    }
}