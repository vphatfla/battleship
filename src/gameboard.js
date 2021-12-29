import Ship from './ship';

const createShipList = () => {
  const shipList = [];
  // 1 ship length 4
  shipList[0] = Ship(1, 4);

  // 2 ship length 3
  shipList[1] = Ship(2, 3);
  shipList[2] = Ship(3, 3);

  // 3 ship length 2
  shipList[3] = Ship(4, 2);
  shipList[4] = Ship(5, 2);
  shipList[5] = Ship(6, 2);

  // 4 ship length 4
  shipList[6] = Ship(7, 1);
  shipList[7] = Ship(8, 1);
  shipList[8] = Ship(9, 1);
  shipList[9] = Ship(10, 1);
  return shipList;
};

const Gameboard = () => {
  // ship
  // ship list
  const shipList = createShipList();

  // create 10x10 grid fresh with all 0,
  const arrayGB = new Array(10);
  // eslint-disable-next-line prefer-const
  let displayArray = new Array(10);
  for (let i = 0; i < arrayGB.length; i += 1) {
    arrayGB[i] = new Array(10);
    displayArray[i] = new Array(10);
  }
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      arrayGB[i][j] = 0;
      displayArray[i][j] = 0; // create 10x10 grid fresh with all 0,
    }
  }
  // display array, displayArray use to display on pages,
  // and for interface of enemy, it will change value of boxes if any boxes of arrayGB changes

  // place the ship function
  const placeShip = (x, y, direction, ship) => {
    // check if the length of ship is not over the walls
    if ((direction === 'horizontal' && y > (9 - ship.length + 1))
    || (direction === 'vertical' && x > (9 - ship.length + 1))) return false;
    // check the available of the coordinate, the 0 value is the avalable
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i += 1) {
        if (arrayGB[x][y + i] !== 0) return false;
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < ship.length; i += 1) {
        if (arrayGB[x + i][y] !== 0) return false;
      }
    }

    // place the ship, i + 1 display the position of the ship ex: 1,2,3,4,5
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i += 1) {
        arrayGB[x][y + i] = ship.name;
        // check if the above row is exist
        // if yes then put then = - 10 unavalable to place other ship
        if (x - 1 >= 0) { arrayGB[x - 1][y + i] = -10; }
        if (x + 1 <= 9) { arrayGB[x + 1][y + i] = -10; }
      }
      // make the one at the head and tail of the ship unavable, example: -10 0 1 -10
      if (y - 1 >= 0) {
        arrayGB[x][y - 1] = -10;
        // DIALOG BOX
        if (x - 1 >= 0) arrayGB[x - 1][y - 1] = -10;
        if (x + 1 <= 9) arrayGB[x + 1][y - 1] = -10;
      }
      if (y + ship.length <= 9) {
        arrayGB[x][y + ship.length] = -10;
        // DIALOG BOX
        if (x - 1 >= 0) arrayGB[x - 1][y + ship.length] = -10;
        if (x + 1 <= 9) arrayGB[x + 1][y + ship.length] = -10;
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < ship.length; i += 1) {
        arrayGB[x + i][y] = ship.name;
        // check if left col and right col is exist and make them unavalable
        if (y - 1 >= 0) { arrayGB[x + i][y - 1] = -10; }
        if (y + 1 <= 9) { arrayGB[x + i][y + 1] = -10; }
      }
      // head and tail
      if (x - 1 >= 0) {
        arrayGB[x - 1][y] = -10;
        // DIALOGBOX
        if (y - 1 >= 0) arrayGB[x - 1][y - 1] = -10;
        if (y + 1 <= 9) arrayGB[x - 1][y + 1] = -10;
      }
      if (x + ship.length <= 9) {
        arrayGB[x + ship.length][y] = -10;
        // DIALOGBOX
        if (y - 1 >= 0) arrayGB[x + ship.length][y - 1] = -10;
        if (y + 1 <= 9) arrayGB[x + ship.length][y + 1] = -10;
      }
    }

    // return true when successfully place

    return true;
  };
  // markNoDiagonal used to mark that when the player hit the ship
  // the only ways make sense to move next is vertical or horizontal
  // and there is no ship can place next to this box
  // so Diagonal boxes should be = -10
  const markNoDiagonal = (x, y) => {
    if (x > 0) {
      if (y > 0) arrayGB[x - 1][y - 1] = -3;
      if (y < 9) arrayGB[x - 1][y + 1] = -3;
    }
    if (x < 9) {
      if (y > 0) arrayGB[x + 1][y - 1] = -3;
      if (y < 9) arrayGB[x + 1][y + 1] = -3;
    }
  };
  // mark the tail and head of ship =-3; if length = 1; mark up down left right boxes -> -3
  const markHeadTalsWhenShipSunk = (x, y, ship) => {
    // console.log(x, ' ', y, ' and table : before ');
    // console.table(arrayGB);
    arrayGB[x][y] = -100;
    if (ship.length === 1) {
      if (x > 0) arrayGB[x - 1][y] = -3;
      if (x < 9) arrayGB[x + 1][y] = -3;
      if (y > 0) arrayGB[x][y - 1] = -3;
      if (y < 9) arrayGB[x][y + 1] = -3;
    } else {
      // vertical way
      // go up
      if (x > 0) {
        if (arrayGB[x - 1][y] === -1) {
          // console.log('go up');
          for (let i = x - 1; i >= 0; i -= 1) {
            if (arrayGB[i][y] !== -1) {
              arrayGB[i][y] = -3;
              break;
            } else if (arrayGB[i][y] === -1) arrayGB[i][y] = -100;
          }
          if (x < 9 && arrayGB[x + 1][y] !== -1
            && arrayGB[x + 1][y] !== -100) arrayGB[x + 1][y] = -3;
        }
      }
      // go down
      if (x < 9) {
        if (arrayGB[x + 1][y] === -1) {
          // console.log('go down');
          for (let i = x + 1; i <= 9; i += 1) {
            if (arrayGB[i][y] !== -1) {
              arrayGB[i][y] = -3;
              break;
            } else if (arrayGB[i][y] === -1) arrayGB[i][y] = -100;
          }
          if (x > 0 && arrayGB[x - 1][y] !== -1
            && arrayGB[x - 1][y] !== -100) arrayGB[x - 1][y] = -3;
        }
      }

      // vertical condition
      // right to left
      if (y > 0) {
        if (arrayGB[x][y - 1] === -1) {
          // console.log('right to left');
          for (let j = y - 1; j >= 0; j -= 1) {
            // console.log(' j step = ', j);
            if (arrayGB[x][j] !== -1) {
              // console.table('in != -1 at j = ', j);
              arrayGB[x][j] = -3;

              break;
            } else if (arrayGB[x][j] === -1) { arrayGB[x][j] = -100; }
          }
          if (y < 9 && arrayGB[x][y + 1] !== -1
            && arrayGB[x][y + 1] !== -100) arrayGB[x][y + 1] = -3;
        }
      }
      // right to left
      if (y < 9) {
        if (arrayGB[x][y + 1] === -1) {
          // console.log('left to right');
          for (let j = y + 1; j <= 9; j += 1) {
            // console.log(' j step = ', j);
            if (arrayGB[x][j] !== -1) {
              // console.log('in != -1 at j = ', j);
              arrayGB[x][j] = -3;

              break;
            } else if (arrayGB[x][j] === -1) arrayGB[x][j] = -100;
          }
          if (y > 0 && arrayGB[x][y - 1] !== -1
            && arrayGB[x][y - 1] !== -100) arrayGB[x][y - 1] = -3;
        }
      }
      // console.log('table after ');
      // console.table(arrayGB);
    }
  };
    // compare displayarray with arrayGB
  const updateDisplayArray = () => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        displayArray[i][j] = 0;
        if (arrayGB[i][j] === -2 || arrayGB[i][j] === -1 || arrayGB[i][j] === -3
            || arrayGB[i][j] === -100) { displayArray[i][j] = arrayGB[i][j]; }
      }
    }
  };
  // function to update arraygb
  const updateArrayGB = (arr) => {
    for (let i = 0; i <= 9; i += 1) {
      for (let j = 0; j <= 9; j += 1) {
        arrayGB[i][j] = arr[i][j];
      }
    }
    updateDisplayArray();
  };
  const receiveAttack = (x, y) => {
    // return false if click in the already-clicked box
    // -1 = ship is hit at x,y but is not sunk yet
    // -100 = ship is hit at x,y and the ship is sunk
    // -3 = boxes around the ship, does not make senses to kick here so disable them
    // -2 = empty box -> miss

    if (arrayGB[x][y] === -1 || arrayGB[x][y] === -3 || arrayGB[x][y] === -2
      || arrayGB[x][y] === -100) return false;

    if (arrayGB[x][y] >= 1 && arrayGB[x][y] <= 10) {
      // index is value - 1
      const indexOfShip = arrayGB[x][y] - 1;
      shipList[indexOfShip].hit();
      // -1 for any is-ship being clicked
      arrayGB[x][y] = -1;
      markNoDiagonal(x, y);
      if (shipList[indexOfShip].isSunk()) {
        markHeadTalsWhenShipSunk(x, y, shipList[indexOfShip]);
      }
      updateDisplayArray();
      return -1; // return -1 as hit a ship
    }
    // keep testing it
    // -2 for any no-ship box being clicked
    arrayGB[x][y] = -2;
    updateDisplayArray();
    return -2;
  };

  const isAllShipSunk = () => {
    for (let i = 0; i < shipList.length; i += 1) {
      if (shipList[i].isSunk() === false) return false;
    }
    return true;
  };

  return {
    arrayGB,
    shipList,
    placeShip,
    receiveAttack,
    isAllShipSunk,
    displayArray,
    updateDisplayArray,
    updateArrayGB,
  };
};
export {
  Gameboard, createShipList,
};
