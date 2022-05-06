const dictionary = [ 'auger', 'agree', 'snack', 'smack', 'smile', 'wings', 'sands', 'prawn', 'price', 'drink', 'brick', 'spite','brink', 'snake', 'glade', 'crown', 'aloud', 'brown' , 'stunt', 'brine', 'about', 'above', 'spade', 'verts', 'bless', 'shark', 'blood', 'scrap', 'snale', 'brake', 'cloud', 'marks', 'house', 'earth', 'plant', 'plans', 'plain', 'place', 'crack', 'peace', 'plane', 'gains', 'greet', 'great', 'greed', 'pains', 'jumps', 'trees', 'weeps', 'audio', 'mouse', 'speak', 'month', 'rakes', 'lives', 'black', 'shake', 'fonts', 'space', 'spice', 'slack', 'sound', 'speed', 'spike', 'spine', 'spins', 'swims', 'slice', 'sweet'];
// create a blank state to work with and update. UI start
const wordleGameState = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    gridFillArrays: Array(7)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentColumn: 0,
};
// Draw and append the grid to the containing boundery
function drawWordleGameGrid(containingTiles) {
    const gridFillArrays = document.createElement('div');
    gridFillArrays.className = 'grid';

    for (let gridSqaureHorizontal = 0; gridSqaureHorizontal < 7; gridSqaureHorizontal++) {
        for (let gridSqaureVertical = 0; gridSqaureVertical < 5; gridSqaureVertical++) {
            drawLetterTiles(gridFillArrays, gridSqaureHorizontal, gridSqaureVertical);
        }
    }

    containingTiles.appendChild(gridFillArrays);
}
// Keeps the data and the UI updated so nothing out of sync, setting content to whats in state
function updateWordleGameLetters() {
    for (let gridSqaureHorizontal = 0; gridSqaureHorizontal < wordleGameState.gridFillArrays.length; gridSqaureHorizontal++) {
        for (let gridSqaureVertical = 0; gridSqaureVertical < wordleGameState.gridFillArrays[gridSqaureHorizontal].length; gridSqaureVertical++) {
            const letterTile = document.getElementById(`letterTile${gridSqaureHorizontal}${gridSqaureVertical}`);
            letterTile.textContent = wordleGameState.gridFillArrays[gridSqaureHorizontal][gridSqaureVertical];
        }
    }
}
// Draw The Letter to the Tiles
function drawLetterTiles(containingTiles, row, column, letter = '') {
    const letterTile = document.createElement('div');
    letterTile.className = 'letterTile';
    letterTile.textContent = letter;
    letterTile.id = `letterTile${row}${column}`;

    containingTiles.appendChild(letterTile);
    return letterTile;
}
// Create keyboard input
function registerKeyboardEvents() {
    document.body.onkeydown = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            if (wordleGameState.currentColumn === 0){
                alert('Please guess a 5 letter word by typing with the keyboard');
            }
            if (wordleGameState.currentColumn <= 4){
                alert('Please type a full 5 letter word');
            }
            if (wordleGameState.currentColumn === 5) {
                const dictionaryWord = collectsCurrentWord();
                if (isWordValid(dictionaryWord)) {
                    revealIfDictionaryWord(dictionaryWord);
                    wordleGameState.currentRow++;
                    wordleGameState.currentColumn = 0;
                } else {
                    alert('Not a valid word.');
                }
            }
        }
        if (key === 'Backspace') {
            removeLetter();
        }
        if (isLetter(key)) {
            addLetter(key);
        }

        updateWordleGameLetters();
    };
}
// Used to collect the letters in the row to form a word
function collectsCurrentWord() {
    return wordleGameState.gridFillArrays[wordleGameState.currentRow].reduce((previous, current) => previous + current);
}
// Return if word is in the dictionary
function isWordValid(dictionaryWord) {
    return dictionary.includes(dictionaryWord);
}
// check all letters in row and shows if they are in the correct position
function revealIfDictionaryWord(guess) {
    const row = wordleGameState.currentRow;
    const animationDuration = 500; // ms

    for (let gridSqaureHorizontal = 0; gridSqaureHorizontal < 5; gridSqaureHorizontal++) {
        const letterTile = document.getElementById(`letterTile${row}${gridSqaureHorizontal}`);
        const letter = letterTile.textContent;

        setTimeout(() => {
            if (letter === wordleGameState.secret[gridSqaureHorizontal]) {
                letterTile.classList.add('right');
            } else if (wordleGameState.secret.includes(letter)) {
                letterTile.classList.add('wrong');
            } else {
                letterTile.classList.add('empty');
            }
        }, ((gridSqaureHorizontal + 1) * animationDuration) / 2);

        letterTile.classList.add('animated');
        letterTile.style.animationDelay = `${(gridSqaureHorizontal * animationDuration) / 2}ms`;
    }

    const isWinner = wordleGameState.secret === guess;
    const isGameOver = wordleGameState.currentRow === 7 - 1

    setTimeout(() => {
        if (isWinner) {
            alert('Congratulations!');
        } else if (isGameOver) {
            alert(`Better luck next time! The word was ${wordleGameState.secret}.`);
        }
    }, 3 * animationDuration);
}
// checks and returns if key is a pressed letter (from a to z upper or lowercase)
function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}
// Adds the letter to the current tile and incs column.
function addLetter(letter) {
    if (wordleGameState.currentColumn === 5) return;
    wordleGameState.gridFillArrays[wordleGameState.currentRow][wordleGameState.currentColumn] = letter;
    wordleGameState.currentColumn++;
}
// deletes the letter to the current tile and decs column.
function removeLetter() {
    if (wordleGameState.currentColumn === 0) return;
    wordleGameState.gridFillArrays[wordleGameState.currentRow][wordleGameState.currentColumn - 1] = '';
    wordleGameState.currentColumn--;
}

function startup() {
    const game = document.getElementById('game');
    drawWordleGameGrid(game);

    registerKeyboardEvents();

    console.log(wordleGameState.secret)
}

startup();