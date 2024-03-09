document.addEventListener('DOMContentLoaded', () => {
    // Select the game board and individual cells
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X'; // Set the initial player to X
    let gameActive = true; // Set the game state to active

    // Initialize the game
    const startGame = () => {
        // Loop through each cell and add click event listeners
        cells.forEach(cell => {
            cell.innerText = ''; // Clear the cell content
            cell.addEventListener('click', handleClickInBox); // Add click event listener
        });
    }

    // Handle cell click event
    const handleClickInBox = (event) => {
        const clickedCell = event.target;
        // If the game is not active or the cell is already filled, return
        if (!gameActive || clickedCell.innerText !== '') return;
        
        // Set the current cell text to the current player (X or O)
        clickedCell.innerText = currentPlayer;

        // Check for a winner
        if (checkWinner()) {
            announceWinner(currentPlayer); // If there's a winner, announce the winner
            gameActive = false; // Set the game state to inactive
            return;
        }

        // Check for a draw
        if (checkDraw()) {
            announceDraw(); // If it's a draw, announce the draw
            gameActive = false; // Set the game state to inactive
            return;
        }

        // Switch to the next player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Check for a winner
    const checkWinner = () => {
        // Define winning combinations
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        // Check if any winning combination is achieved
        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            return cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText;
        });
    }

    // Check for a draw
    const checkDraw = () => {
        // Check if all cells are filled
        return [...cells].every(cell => cell.innerText !== '');
    }

    // Announce the winner
    const announceWinner = (player) => {
        alert(`Player ${player} wins!`); // Display prompt with winner
    }

    // Announce a draw
    const announceDraw = () => {
        alert('Its a draw!'); // Display prompt for draw
    }

    // Start the game
    startGame();
});
