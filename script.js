const EMPTY = 0;
const PURPLE = 1;
const BLUE = 2;

//Elementos del DOM
const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restart');
const backButton = document.getElementById('back');
const cells = document.querySelectorAll('.cell');

const h1Conecta4 = document.getElementById('h1Conecta4');
const fondoConecta4 = document.getElementById('conecta4');

class gameBoard {

    numRows = 6;
    numCols = 7;

    constructor() {
        this.virtualBoard = new Array(this.numRows).fill(null).map(() => new Array(this.numCols).fill(EMPTY));
        this.currentPlayer = PURPLE;
    }

    resetBoard() {
        //TABLERO DOM
        cells.forEach(cell => {
            cell.classList.remove('purple');
            cell.classList.remove('blue');
        });
        //TABLERO VIRTUAL
        this.virtualBoard = new Array(this.numRows).fill(null).map(() => new Array(this.numCols).fill(EMPTY));
    }

    checkFull() {
        for (let i = 0; i < this.virtualBoard.length; i++) {
            if (this.virtualBoard[i].includes(EMPTY)) { // Con el método includes() comprobamos si la fila contiene algún elemento vacío, y evito un bucle anidado
                return false; // La matriz no está llena
            }
        }
        return true; // La matriz está llena
    }

    checkFullColumn(col) {
        for (let i = 0; i < this.virtualBoard.length; i++) {
            if (this.virtualBoard[i][col] === EMPTY) {
                return false; // La columna no está llena
            }
        }
        return true; // La columna está llena
    }

    checkWin() {
        //Verificamos si hay 4 fichas iguales en horizontal, y devolvemos al ganador 
        for (let i = 0; i < this.virtualBoard.length; i++) {
            for (let j = 0; j < this.virtualBoard[i].length - 3; j++) {
                if (this.virtualBoard[i][j] === this.virtualBoard[i][j + 1] && this.virtualBoard[i][j] === this.virtualBoard[i][j + 2] && this.virtualBoard[i][j] === this.virtualBoard[i][j + 3] && this.virtualBoard[i][j] !== EMPTY) {
                    return true;
                }
            }
        }

        //Verificamos si hay 4 fichas iguales en vertical, y devolvemos al ganador
        for (let i = 0; i < this.virtualBoard.length - 3; i++) {
            for (let j = 0; j < this.virtualBoard[i].length; j++) {
                if (this.virtualBoard[i][j] === this.virtualBoard[i + 1][j] && this.virtualBoard[i][j] === this.virtualBoard[i + 2][j] && this.virtualBoard[i][j] === this.virtualBoard[i + 3][j] && this.virtualBoard[i][j] !== EMPTY) {
                    return true;
                }
            }
        }

        //Verificamos si hay 4 fichas iguales en diagonal, y devolvemos al ganador
        for (let i = 0; i < this.virtualBoard.length - 3; i++) {
            for (let j = 0; j < this.virtualBoard[i].length - 3; j++) {
                if (this.virtualBoard[i][j] === this.virtualBoard[i + 1][j + 1] && this.virtualBoard[i][j] === this.virtualBoard[i + 2][j + 2] && this.virtualBoard[i][j] === this.virtualBoard[i + 3][j + 3] && this.virtualBoard[i][j] !== EMPTY) {
                    return true;
                }
            }
        }

        //Verificamos si hay 4 fichas iguales en diagonal inversa, y devolvemos al ganador
        for (let i = 0; i < this.virtualBoard.length - 3; i++) {
            for (let j = 3; j < this.virtualBoard[i].length; j++) {
                if (this.virtualBoard[i][j] === this.virtualBoard[i + 1][j - 1] && this.virtualBoard[i][j] === this.virtualBoard[i + 2][j - 2] && this.virtualBoard[i][j] === this.virtualBoard[i + 3][j - 3] && this.virtualBoard[i][j] !== EMPTY) {
                    return true;
                }
            }
        }

        return false; // No hay ganador
    }

    deletePurple() {
        cells.forEach(cell => {
            cell.classList.remove('purple');
        });
    }

    deleteBlue() {
        cells.forEach(cell => {
            cell.classList.remove('blue');
        });
    }

}

const game = new gameBoard();

function mostrarGanador() {
    if (game.currentPlayer === PURPLE) {
        h1Conecta4.innerHTML = 'Ganó el jugador ' + 'PURPLE';
        h1Conecta4.style.fontSize = '60px';
        h1Conecta4.style.color = "rgb(65, 10, 61)";
        h1Conecta4.style.zIndex = 5;
        backButton.style.zIndex = 5;
        restartButton.style.zIndex = 5;
        fondoConecta4.style.zIndex = 3;

        fondoConecta4.style.backgroundColor = "rgba(139, 12, 130,0.5)";
    }
    else {
        h1Conecta4.innerHTML = 'Ganó el jugador ' + 'BLUE';
        h1Conecta4.style.fontSize = '60px';
        h1Conecta4.style.color = "darkblue";
        h1Conecta4.style.zIndex = 5;
        backButton.style.zIndex = 5;
        restartButton.style.zIndex = 5;
        fondoConecta4.style.zIndex = 3;

        fondoConecta4.style.backgroundColor = "rgba(24, 176, 193,0.5)";
    }   

    blockCellClick();
}

function mostrarEmpate() {

    h1Conecta4.innerHTML = 'Empate';
    h1Conecta4.style.fontSize = '60px';
    h1Conecta4.style.zIndex = 5;
    backButton.style.zIndex = 5;
    restartButton.style.zIndex = 5;
    fondoConecta4.style.zIndex = 3;
    fondoConecta4.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    blockCellClick();
}

function blockCellClick() {
    cells.forEach(cell => {
        cell.style.pointerEvents = 'none';
    });
}

function freeCellClick() {
    cells.forEach(cell => {
        cell.style.pointerEvents = 'auto';
    });
}

function resetGame() {

    game.resetBoard();

    h1Conecta4.innerHTML = 'Connect-4';
    h1Conecta4.style.fontSize = '50px';
    h1Conecta4.style.color = "white";
    h1Conecta4.style.zIndex = 0;
    backButton.style.zIndex = 0;
    restartButton.style.zIndex = 0;
    fondoConecta4.style.zIndex = 0;
    fondoConecta4.style.opacity = 1;
    fondoConecta4.style.backgroundColor = "black";

    freeCellClick();
}

//Evento de empezar / reiniar el juego al botón restart
restartButton.addEventListener('click', () => { resetGame(); });

//Evento de volver al menú principal al botón back
backButton.addEventListener('click', () => { resetGame();  });


//Evento de click en cada celda
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        // La columna es el segundo dígito del id de la celda
        const col = cell.id[1];
        console.log(col);

        // Encontrar la fila más "abajo" que se encuentre vacía
        let row = null;
        for (let i = game.numRows - 1; i >= 0; i--) {
            if (game.virtualBoard[i][col] === EMPTY) {
                row = i;
                break;
            }
        }

        console.log(row);
        // Si la celda está vacía, se puede jugar
        if (game.checkFullColumn(col) === false) {
            if (game.virtualBoard[row][col] === EMPTY) {
                game.virtualBoard[row][col] = game.currentPlayer; //Actualizamos el tablero virtual
                // Seleccionamos la celda que corresponde a esa columna y fila
                const cell = document.getElementById(row + col);
                // Le añadimos la clase correspondiente al jugador actual
                cell.classList.add(game.currentPlayer === PURPLE ? 'purple' : 'blue');
                // Cambiamos el jugador actual
                game.currentPlayer = game.currentPlayer === PURPLE ? BLUE : PURPLE;
            }
        }

        if (game.checkWin()) {
            game.currentPlayer = game.currentPlayer === PURPLE ? BLUE : PURPLE;
            mostrarGanador();
            console.log('Ganó el jugador ' + game.currentPlayer);
        }
        else if (game.checkFull()) {
            mostrarEmpate();
            console.log('Tablero lleno, empate');
        }

        console.log(game.virtualBoard);

    });
});


