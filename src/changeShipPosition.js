// eslint-disable-next-line import/no-cycle
import {
  computer, createGrid, p1, startGame,
} from '.';
import { placeShipRandomForComputer } from './computerPlayer';
import Players from './players';

const draftPlayer = new Players('DraftPlayer');

const clearArr = (arr) => {
  for (let i = 0; i <= 9; i += 1) {
    for (let j = 0; j <= 9; j += 1) {
      // eslint-disable-next-line no-param-reassign
      arr[i][j] = 0;
    }
  }
  return true;
};
const changeShipDivCreate = (ctn) => {
  // eslint-disable-next-line no-param-reassign
  ctn.innerHTML = '';

  for (let i = 0; i < 100; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('box');
    const x = Math.trunc(i / 10);
    const y = i % 10;
    cell.setAttribute('x', x);
    cell.setAttribute('y', y);
    ctn.appendChild(cell);
  }
};
const randomPositionButton = (drafter, ctn, unDisplayDiv) => {
  const btn = document.querySelector('.random-button');
  btn.addEventListener('click', () => {
    // eslint-disable-next-line no-param-reassign
    unDisplayDiv.id = 'display-none-div';
    placeShipRandomForComputer(drafter);
    createGrid(ctn, drafter.playerGB.arrayGB);
  });
};
const clearPositionButton = (ctn) => {
  const btn = document.querySelector('.clear-button');
  btn.addEventListener('click', () => {
    changeShipDivCreate(ctn);
  });
};
const manualPositionButton = (div, clearCtn) => {
  const btn = document.querySelector('.manual-button');
  btn.addEventListener('click', () => {
    clearArr(draftPlayer.playerGB.arrayGB);

    changeShipDivCreate(clearCtn);

    // eslint-disable-next-line no-param-reassign
    div.id = '';
    // eslint-disable-next-line no-use-before-define
    verticalHorizontalButtons(draftPlayer, 0);
  });
};
//
const removeActiveClass = (btn) => {
  btn.classList.remove('active');
};
const addActiveClass = (btn) => {
  btn.classList.add('active');
};
// hover when move mouse on the board
const hoverHorizontal = (drafter, shipIndex) => {
  // lengthofship value
  const lengthOfShip = parseInt(drafter.playerGB.shipList[shipIndex].length, 10);
  // set up DOM
  const ctn = document.querySelector('.change-ship-position-board');
  const boxs = ctn.querySelectorAll('.box');
  boxs.forEach((box) => box.addEventListener('mouseover', () => {
    const x = parseInt(box.getAttribute('x'), 10);
    const y = parseInt(box.getAttribute('y'), 10);
    boxs.forEach((item) => {
      item.classList.remove('greenHover');
    });
    if (lengthOfShip + y - 1 <= 9) {
      for (let j = y; j <= lengthOfShip + y - 1; j += 1) {
        const boxIndex = x * 10 + j;
        boxs[boxIndex].classList.add('greenHover');
      }
      box.addEventListener('click', () => {
        const result = drafter.playerGB.placeShip(x, y, 'horizontal', drafter.playerGB.shipList[shipIndex]);
        // eslint-disable-next-line no-use-before-define
        if (!result) verticalHorizontalButtons(drafter, shipIndex);

        createGrid(document.querySelector('.change-ship-position-board'), drafter.playerGB.arrayGB);
        // eslint-disable-next-line no-use-before-define
        if (shipIndex + 1 <= 9)verticalHorizontalButtons(drafter, shipIndex + 1);
      });
    }
  }));
};
// vertically hover
const hoverVertical = (drafter, shipIndex) => {
  // lengthofship value
  const lengthOfShip = parseInt(drafter.playerGB.shipList[shipIndex].length, 10);
  // set up DOM
  const ctn = document.querySelector('.change-ship-position-board');
  const boxs = ctn.querySelectorAll('.box');
  boxs.forEach((box) => box.addEventListener('mouseover', () => {
    const x = parseInt(box.getAttribute('x'), 10);
    const y = parseInt(box.getAttribute('y'), 10);
    boxs.forEach((item) => {
      item.classList.remove('greenHover');
    });
    if (lengthOfShip + x - 1 <= 9) {
      for (let i = x; i <= lengthOfShip + x - 1; i += 1) {
        const boxIndex = i * 10 + y;
        boxs[boxIndex].classList.add('greenHover');
      }
      box.addEventListener('click', () => {
        const result = drafter.playerGB.placeShip(x, y, 'vertical', drafter.playerGB.shipList[shipIndex]);
        // eslint-disable-next-line no-use-before-define
        if (!result) verticalHorizontalButtons(drafter, shipIndex);
        createGrid(document.querySelector('.change-ship-position-board'), drafter.playerGB.arrayGB);
        // eslint-disable-next-line no-use-before-define
        if (shipIndex + 1 <= 9) verticalHorizontalButtons(drafter, shipIndex + 1);
      });
    }
  }));
};
const verticalHorizontalButtons = (drafter, shipIndex) => {
  // eventListener for vertical and horizontal buttons
  createGrid(document.querySelector('.change-ship-position-board'), drafter.playerGB.arrayGB);
  const verticalButton = document.querySelector('.vertical-button');
  const horizontalButton = document.querySelector('.horizontal-button');
  verticalButton.addEventListener('click', () => {
    removeActiveClass(verticalButton); removeActiveClass(horizontalButton);
    addActiveClass(verticalButton);
    verticalHorizontalButtons(drafter, shipIndex);
  });
  horizontalButton.addEventListener('click', () => {
    removeActiveClass(verticalButton); removeActiveClass(horizontalButton);
    addActiveClass(horizontalButton);
    verticalHorizontalButtons(drafter, shipIndex);
  });

  // event when hover over the board
  if (horizontalButton.classList.contains('active')) hoverHorizontal(drafter, shipIndex);
  else hoverVertical(drafter, shipIndex);
};
const saveButton = () => {
  const btn = document.querySelector('.save-change-button');
  btn.addEventListener('click', () => {
    // check if the arr is fully placed, 10 is the last ship
    let check = false;
    const arr = draftPlayer.playerGB.arrayGB;
    for (let i = 0; i <= 9; i += 1) {
      for (let j = 0; j <= 9; j += 1) {
        if (arr[i][j] === 10) check = true;
      }
    }
    if (!check) {
      document.querySelector('.red').id = '';
      return false;
    }
    // true -> save conditions are satified, process to start a new game with new array

    p1.playerGB.updateArrayGB(arr);// updatedisplay inside updatearraygb
    placeShipRandomForComputer(computer);
    computer.playerGB.updateDisplayArray();
    createGrid(document.querySelector('.player-board'), p1.playerGB.arrayGB);
    createGrid(document.querySelector('.player-play-board'), p1.visualArray());
    document.querySelector('.change-ship-position-div').id = 'display-none-div';
    startGame();
    return true;
  });
};
const changeShipPosition = () => {
  // change ship button event
  const changeShipPostionDiv = document.querySelector('.change-ship-position-div');
  const changeShipPositionButton = document.querySelector('.change-ship-position-button');
  const changeShipPositionBoard = document.querySelector('.change-ship-position-board');
  const buttonsDiv = document.querySelector('.buttons-div-change-ship-position');
  changeShipPositionButton.addEventListener('click', () => {
    changeShipPostionDiv.id = ''; // make visible
    // clear array of old draftplayer
    clearArr(draftPlayer.playerGB.arrayGB);
    changeShipDivCreate(changeShipPositionBoard);
    // auto random
    randomPositionButton(draftPlayer, changeShipPositionBoard, buttonsDiv);
    clearPositionButton(changeShipPositionBoard);
    manualPositionButton(buttonsDiv, changeShipPositionBoard);
    saveButton();
  });
};

export default changeShipPosition;
