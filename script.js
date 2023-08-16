const numRows = 6;
const numCols = 7;

const EMPTY = 0;
const PURPLE = 1;
const BLUE = 2;

const gameBoard = new Array(numRows).fill(null).map(() => new Array(numCols).fill(EMPTY));

//Elementos del DOM
const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restart');
const cells = document.querySelectorAll('.cell');

