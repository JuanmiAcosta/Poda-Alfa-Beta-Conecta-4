//Estados tablero virtual
export const EMPTY = 0;
export const PURPLE = 1;
export const BLUE = 2;

//Profundidad máxima del árbol de búsqueda
export const MAX_DEPTH = 5;

//Eventos de click en los botones de los modos de juego
export const modoHumano = document.getElementById('HvsH'); //Modo 0
export const modoIAE = document.getElementById('HvsAIE');  //Modo 1
export const modoIAM = document.getElementById('HvsAIM');  //Modo 2
export const modoIAH = document.getElementById('HvsAIH');  //Modo 3

//Resto de elementos del DOM
export const boardElement = document.getElementById('board');
export const restartButton = document.getElementById('restart');
export const backButton = document.getElementById('back');
export const cells = document.querySelectorAll('.cell');
export const h1Conecta4 = document.getElementById('h1Conecta4');
export const fondoConecta4 = document.getElementById('conecta4');