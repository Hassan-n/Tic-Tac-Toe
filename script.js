// HTML Elements
const tiles = Array.from(document.querySelectorAll('.game-cell')); // Selects all game tiles
const resetButtons = Array.from(document.querySelectorAll('.reset')); // Selects all reset buttons
const playerDisplay = document.querySelector('.display-player'); // Displays the current player
const announcer = document.querySelector('.announcer'); // Displays game result messages
const winningMessageElement = document.querySelector('.winning-message') // Displays the winning message

// Game constants
const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

// Game variables
let board = ['', '', '', '', '', '', '', '', '']; // Represents the Tic-Tac-Toe board
let currentPlayer = 'X'; // Keeps track of the current player
let isGameActive = true; // Indicates if the game is still active

/*
    Indexes within the board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/

const winningConditions = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6]
];

// Function to check for a win or tie
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        announce(TIE);
    }
}

// Function to display game result messages
const announce = (type) => {
    switch(type) {
        case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
        case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
        case TIE:
            announcer.innerText = 'Tie';
    }
    announcer.classList.remove('hide');
    winningMessageElement.classList.remove('hide');
};

// Function to check if a tile is a valid move
const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
        return false;
    }
    return true;
};

// Function to update the board with the current player's move
const updateBoard = (index) => {
    board[index] = currentPlayer;
}

// Function to switch the current player
const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

// Function to handle user actions (clicking on a tile)
const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

// Function to reset the game board
const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');
    winningMessageElement.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}

// Add click event listeners to game tiles
tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
});

// Add click event listeners to reset buttons
resetButtons.forEach((resetButton) => {
    resetButton.addEventListener('click', resetBoard);
});
