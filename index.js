import { gameBoard } from './gameBoard.js';
import * as constants from './const.js';

var modo = 0; //Variable que almacena el modo de juego, por defecto es el modo 0 (Humano vs Humano)

//Evento de click en el modo Human vs Human
constants.modoHumano.addEventListener('click', () => {
    modo = 0;
    console.log('Modo Humano vs Humano '+modo);
});

//Evento de click en el modo Human vs IA Easy
constants.modoIAE.addEventListener('click', () => {
    modo = 1;
    console.log('Modo Humano vs IA Easy '+modo);
});

//Evento de click en el modo Human vs IA Medium
constants.modoIAM.addEventListener('click', () => {
    modo = 2;
    console.log('Modo Humano vs IA Medium '+modo);
});

//Evento de click en el modo Human vs IA Hard
constants.modoIAH.addEventListener('click', () => {
    modo = 3;
    console.log('Modo Humano vs IA Hard '+modo);
});

//--------------------------------------------------------------

const game = new gameBoard(); //Creamos el tablero virtual (Patrón Singleton)

function makeMove(board, col, DOM) { //Actualizo el tablero virtual

    // Encontrar la fila más "abajo" que se encuentre vacía
    let row = null;
    for (let i = board.numRows - 1; i >= 0; i--) {
        if (board.virtualBoard[i][col] === constants.EMPTY) {
            row = i;
            break;
        }
    }

    game.virtualBoard[row][col] = game.currentPlayer; //Actualizamos el tablero virtual

    if (DOM === true) { // Si queremos modificarlo en el DOM también
        const cell = document.getElementById(row + col);
        // Le añadimos la clase correspondiente al jugador actual
        cell.classList.add(game.currentPlayer === constants.PURPLE ? 'purple' : 'blue');
        // Cambiamos el jugador actual
        game.currentPlayer = game.currentPlayer === constants.PURPLE ? constants.BLUE : constants.PURPLE;
    }
}

function mostrarGanador() {

    if (game.currentPlayer === constants.PURPLE) {
        constants.h1Conecta4.innerHTML = 'PURPLE won';
        constants.h1Conecta4.style.color = "rgb(65, 10, 61)";
        constants.h1Conecta4.style.zIndex = 5;
        constants.backButton.style.zIndex = 5;
        constants.restartButton.style.zIndex = 5;
        constants.fondoConecta4.style.zIndex = 3;
        game.deleteBlue();
        constants.fondoConecta4.style.backgroundColor = "rgba(217, 70, 207,0.5)";
    }
    else {
        constants.h1Conecta4.innerHTML = 'BLUE won';
        constants.h1Conecta4.style.color = "darkblue";
        constants.h1Conecta4.style.zIndex = 5;
        constants.backButton.style.zIndex = 5;
        constants.restartButton.style.zIndex = 5;
        constants.fondoConecta4.style.zIndex = 3;
        game.deletePurple();
        constants.fondoConecta4.style.backgroundColor = "rgba(24, 176, 193,0.5)";
    }

    blockCellClick();
}

function mostrarEmpate() {

    constants.h1Conecta4.innerHTML = 'DRAW';
    constants.h1Conecta4.style.zIndex = 5;
    constants.backButton.style.zIndex = 5;
    constants.restartButton.style.zIndex = 5;
    constants.fondoConecta4.style.zIndex = 3;
    constants.fondoConecta4.style.backgroundColor = "rgba(105, 99, 105,0.5)";

    blockCellClick();
}

function blockCellClick() {
    constants.cells.forEach(cell => {
        cell.style.pointerEvents = 'none';
    });
}

function freeCellClick() {
    constants.cells.forEach(cell => {
        cell.style.pointerEvents = 'auto';
    });
}

function resetGame() {

    game.resetBoard();

    constants.h1Conecta4.innerHTML = 'Connect-4';
    constants.h1Conecta4.style.color = "white";
    constants.h1Conecta4.style.zIndex = 0;
    constants.backButton.style.zIndex = 0;
    constants.restartButton.style.zIndex = 0;
    constants.fondoConecta4.style.zIndex = 0;
    constants.fondoConecta4.style.opacity = 1;
    constants.fondoConecta4.style.backgroundColor = "black";

    game.currentPlayer = constants.PURPLE; // SIEMPRE EMPIEZA EL PURPLE, es decir, si hay IA, ESTA SERÁ EL BLUE

    freeCellClick();
}

// Función heurística simple para evaluar el tablero.
function evaluateBoard1(board, player) {
    const opponent = 3 - player; // Calculamos el jugador oponente (1 -> 2, 2 -> 1)
    let score = 0;

    // Evaluar verticalmente y horizontalmente.
    for (let row = 0; row < board.numCols(); row++) {
        for (let col = 0; col < board.numCols()-3; col++) {
            const window = [board.virtualBoard[row][col], board.virtualBoard[row][col + 1], board.virtualBoard[row][col + 2], board.virtualBoard[row][col + 3]];
            score += evaluateWindow(window, player, opponent);
        }
    }

    for (let col = 0; col < board.numCols(); col++) {
        for (let row = 0; row < board.numRows()-3; row++) {
            const window = [board.virtualBoard[row][col], board.virtualBoard[row + 1][col], board.virtualBoard[row + 2][col], board.virtualBoard[row + 3][col]];
            score += evaluateWindow(window, player, opponent);
        }
    }

    // Evaluar diagonalmente (ascendente y descendente).
    for (let row = 0; row < board.numRows()-3; row++) {
        for (let col = 0; col < board.numCols() -3; col++) {
            const windowAsc = [board.virtualBoard[row][col], board.virtualBoard[row + 1][col + 1], board.virtualBoard[row + 2][col + 2], board.virtualBoard[row + 3][col + 3]];
            const windowDesc = [board.virtualBoard[row + 3][col], board.virtualBoard[row + 2][col + 1], board.virtualBoard[row + 1][col + 2], board.virtualBoard[row][col + 3]];
            score += evaluateWindow(windowAsc, player, opponent);
            score += evaluateWindow(windowDesc, player, opponent);
        }
    }

    return score;
}

// Función para evaluar una ventana de 4 celdas.
function evaluateWindow(window, player, opponent) {
    let playerCount = 0;
    let opponentCount = 0;

    for (let cell of window) {
        if (cell === player) {
            playerCount++;
        } else if (cell === opponent) {
            opponentCount++;
        }
    }

    if (playerCount === 4) {
        return 1000; // El jugador actual tiene 4 en línea.
    } else if (opponentCount === 4) {
        return -1000; // El oponente tiene 4 en línea.
    } else if (playerCount === 3 && opponentCount === 0) {
        return 100; // El jugador actual tiene 3 en línea.
    } else if (playerCount === 2 && opponentCount === 0) {
        return 10; // El jugador actual tiene 2 en línea.
    } else if (opponentCount === 3 && playerCount === 0) {
        return -100; // El oponente tiene 3 en línea.
    } else if (opponentCount === 2 && playerCount === 0) {
        return -10; // El oponente tiene 2 en línea.
    } else {
        return 0; // Ninguno tiene 4, 3 o 2 en línea.
    }
}

function podaAlfaBeta(board, depth, maximizingPlayer, alpha, beta, heuristic) {

    if (depth === 0 || board.isGameOver()) {
        return evaluateBoard(maximizingPlayer);
    }

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (let col = 0; col < board.numCols(); col++) {
            if (board.checkFullColumn(col)) {
                const newBoard = new gameBoard(board);
                newBoard.currentPlayer(maximizingPlayer);
                makeMove(newBoard, col, false);
                const evaluation = minimaxAlphaBeta(newBoard, depth - 1, false, alpha, beta, heuristic);
                maxEval = Math.max(maxEval, evaluation);
                alpha = Math.max(alpha, evaluation);
                if (beta <= alpha) {
                    break; // Poda Alfa-Beta
                }
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let col = 0; col < board.numCols(); col++) {
            if (board.checkFullColumn(col)) {
                const newBoard = new gameBoard(board);
                newBoard.currentPlayer(3 - maximizingPlayer);
                makeMove(newBoard, col, false);
                const evaluation = minimaxAlphaBeta(newBoard, depth - 1, true, alpha, beta, heuristic);
                minEval = Math.min(minEval, evaluation);
                beta = Math.min(beta, evaluation);
                if (beta <= alpha) {
                    break; // Poda Alfa-Beta
                }
            }
        }
        return minEval;
    }

}

// Función principal para determinar el mejor movimiento para el jugador 2 utilizando Minimax con poda Alfa-Beta.
function findBestMovePlayer2(board, depth, heuristic) {
    let bestMove = -1;
    let bestEval = -Infinity;
    const alpha = -Infinity;
    const beta = Infinity;

    for (let col = 0; col < board.numCols(); col++) {
        if (board.checkFullColumn(col)) {
            const newBoard = new gameBoard(board);
            newBoard.currentPlayer(2);
            makeMove(newBoard, col, false);
            const evaluation = minimaxAlphaBeta(newBoard, depth - 1, false, alpha, beta, heuristic);

            if (evaluation > bestEval) {
                bestEval = eval;
                bestMove = col;
            }
        }
    }

    return bestMove;
}

//Evento de empezar / reiniar el juego al botón restart
constants.restartButton.addEventListener('click', () => { resetGame(); });

//Evento de volver al menú principal al botón back
constants.backButton.addEventListener('click', () => { resetGame(); });

if (modo === 0) { //Modo Humano vs Humano

    console.log('Modo Humano vs Humano en click');
    constants.cells.forEach(cell => {
        cell.addEventListener('click', () => {
            // La columna es el segundo dígito del id de la celda
            const col = cell.id[1];
            console.log(col);

            // Si la celda está vacía, se puede jugar
            if (game.checkFullColumn(col) === false) {
                makeMove(game, col, true);
            }

            if (game.checkWin()) {
                game.currentPlayer = game.currentPlayer === constants.PURPLE ? constants.BLUE : constants.PURPLE;
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

} 
/*
else if (modo === 1) {

    constants.cells.forEach(cell => {
        cell.addEventListener('click', () => {
            // La columna es el segundo dígito del id de la celda
            const col = cell.id[1];
            console.log(col);

            // Si la celda está vacía, se puede jugar
            if (game.checkFullColumn(col) === false) {
                makeMove(game, col, true);
                if (game.checkWin()) {
                    game.currentPlayer = game.currentPlayer === constants.PURPLE ? constants.BLUE : constants.PURPLE;
                    mostrarGanador();
                    console.log('Ganó el jugador ' + game.currentPlayer);
                }
                else if (game.checkFull()) {
                    mostrarEmpate();
                    console.log('Tablero lleno, empate');
                }
                const colPlayer2 = findBestMovePlayer2(game, MAX_DEPTH, evaluateBoard1);
                makeMove(game, colPlayer2, true);
            }

            if (game.checkWin()) {
                game.currentPlayer = game.currentPlayer === constants.PURPLE ? constants.BLUE : constants.PURPLE;
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
}
*/

