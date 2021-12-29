import './styles.css';
import { placeShipRandomForComputer, makeComputerAttack } from './computerPlayer';
// eslint-disable-next-line import/no-cycle
import changeShipPosition from './changeShipPosition';
import Players from './players';
// eslint-disable-next-line import/no-cycle

// explain button
document.querySelector('.explain').addEventListener('click', () => {
  document.querySelector('.explain-box').id = '';
  document.querySelector('.exit-explain').addEventListener('click', () => {
    document.querySelector('.explain-box').id = 'display-none-div';
  });
});
const p1 = new Players('John', true);
const computer = new Players('Computer', false);

p1.setEnemy(computer);
computer.setEnemy(p1);
// function to place ships randomly for computer board
placeShipRandomForComputer(computer);

placeShipRandomForComputer(p1);

// create playground
const createGrid = (ctn, arr) => {
  // eslint-disable-next-line no-param-reassign
  ctn.innerHTML = '';

  for (let i = 0; i < 100; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('box');
    if (arr) {
      const x = Math.trunc(i / 10);
      const y = i % 10;
      if (arr[x][y] >= 1 && arr[x][y] <= 10) cell.classList.add('shipBox');
      if (arr[x][y] === -1) cell.classList.add('shipHitBox');
      if (arr[x][y] === -100) cell.classList.add('shipSunkBox');
      if (arr[x][y] === -3) cell.classList.add('aroundShipHitBox');
      if (arr[x][y] === -2) cell.classList.add('emptyBox');
      if (arr[x][y] === 0) cell.classList.add('whiteBox');
      // add x,y attribute for box
      cell.setAttribute('x', x);
      cell.setAttribute('y', y);
    }
    ctn.appendChild(cell);
  }
};
// play flow
let playerBoard = document.querySelector('.player-board');
let playerPlayBoard = document.querySelector('.player-play-board');
createGrid(playerBoard, p1.playerGB.arrayGB);
createGrid(playerPlayBoard, p1.visualArray());
// sleep
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
// remove gray (disable) ctn
const removeGray = (ctn) => {
  ctn.classList.remove('gray-board');
};
// add gray (disable) ctn
const addGray = (ctn) => {
  ctn.classList.add('gray-board');
};

// ctn1 -> main turn
const cssTurn = async (ctn1, ctn2) => {
  removeGray(ctn1);
  removeGray(ctn2);
  addGray(ctn2);
};
const computerMove = () => {
  const computerResult = makeComputerAttack(computer);
  // create grid of computer play (p1.arrayGB)

  createGrid(playerBoard, p1.playerGB.arrayGB);
  if (computerResult === -1) computerMove();
};

const playMain = async (box) => {
  // turn of player first
  // turn player, attack action
  const x = parseInt(box.getAttribute('x'), 10);
  const y = parseInt(box.getAttribute('y'), 10);
  const result = p1.attackPosition(x, y);
  createGrid(playerPlayBoard, p1.visualArray());
  // -1 -> player hit the ship -> continue
  // add gray to the playerboard
  if (result === -1) {
    // turn gray as player turn
    cssTurn(playerPlayBoard, playerBoard);
    // eslint-disable-next-line no-use-before-define
    createEventListener(playerPlayBoard);
  } else {
    cssTurn(playerBoard, playerPlayBoard);
    // computer move
    await sleep(1000);
    computerMove();
    await sleep(1000);
    // if not return turn to player
    cssTurn(playerPlayBoard, playerBoard);
    // eslint-disable-next-line no-use-before-define
    createEventListener(playerPlayBoard);
  }
};
// create eventlistener for box in p1.visualarray()
const createEventListener = (ctn) => {
  // only whitebox is clickable;
  const boxs = ctn.querySelectorAll('.whiteBox');

  boxs.forEach((box) => box.addEventListener('click', () => {
    playMain(box);
  }));
};
// changeship position form
changeShipPosition();
const updateDOMAfterChangePosition = () => {
  playerBoard = document.querySelector('.player-board');
  playerPlayBoard = document.querySelector('.player-play-board');
};
// game start below (functions called)
const startGame = () => {
  updateDOMAfterChangePosition();
  // turn player (playerplayboard) first
  cssTurn(playerPlayBoard, playerBoard);
  createEventListener(playerPlayBoard);
};

startGame();
// div change ship position program here

export {
  createGrid, p1, startGame, computer,
};
