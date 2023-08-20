import { EMPTY, PURPLE, BLUE , cells} from './const.js';

//Clase tablero de juego
export class gameBoard {

    numRows = 6;
    numCols = 7;

    constructor(board = null) { //EN JS NO SE PUEDE HACER MÁS DE UN CONSTRUCTOR, POR LO QUE USAMOS UN PARÁMETRO POR DEFECTO

        if (board) { //CONSTRUCTOR DE COPIA
            this.virtualBoard = board.virtualBoard;
            this.currentPlayer = board.currentPlayer;

        } else { //CONSTRUCTOR POR DEFECTO
            this.virtualBoard = new Array(this.numRows).fill(null).map(() => new Array(this.numCols).fill(EMPTY));
            this.currentPlayer = PURPLE;
        }

    }

    get numCols() {
        return this.numCols;
    }

    get numRows() {
        return this.numRows;
    }

    currentPlayer(player) { //Cambiamos el jugador actual
        this.currentPlayer = player;
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

    isGameOver() {
        if (this.checkWin() || this.checkFull()) {
            return true;
        }
        return false;
    }

}