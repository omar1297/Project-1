document.addEventListener('DOMContentLoaded', () => {
    
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X'; 
    let gameActive = true; 

    
    const startGame = () => {
    
        cells.forEach(cell => {
            cell.innerText = ''; 
            cell.addEventListener('click', handleClickInBox); 
        });
    }

    
    const handleClickInBox = (event) => {
        const clickedCell = event.target;
       
        if (!gameActive || clickedCell.innerText !== '') return;
        
        // Set the current cell text to the current player (X or O)
        clickedCell.innerText = currentPlayer;

        
        if (checkWinner()) {
            announceWinner(currentPlayer); 
            gameActive = false; 
            return;
        }


        if (checkDraw()) {
            announceDraw(); 
            gameActive = false;
            return;
        }

        
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

    
    const checkDraw = () => {
       
        return [...cells].every(cell => cell.innerText !== '');
    }

    // Announce the winner
    const announceWinner = (player) => {
        alert(`Player ${player} wins!`); 
    }

    // Announce a draw
    const announceDraw = () => {
        alert('Its a draw!'); 
    }

    
    startGame();
});
