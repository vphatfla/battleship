import Ship from './ship';
// ship list
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

const Gameboard = () => {
  // create 10x10 grid fresh with all 0
  const arrayGB = new Array(10);
  for (let i = 0; i < arrayGB.length; i += 1) {
    arrayGB[i] = new Array(10);
  }
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      arrayGB[i][j] = 0;
    }
  }

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
      if (y - 1 >= 0) { arrayGB[x][y - 1] = -10; }
      if (y + ship.length <= 9) { arrayGB[x][y + ship.length] = -10; }
    } else if (direction === 'vertical') {
      for (let i = 0; i < ship.length; i += 1) {
        arrayGB[x + i][y] = ship.name;
        // check if left col and right col is exist and make them unavalable
        if (y - 1 >= 0) { arrayGB[x + i][y - 1] = -10; }
        if (y + 1 <= 9) { arrayGB[x + i][y + 1] = -10; }
      }
      // head and tail
      if (x - 1 >= 0) { arrayGB[x - 1][y] = -10; }
      if (x + ship.length <= 9) { arrayGB[x + ship.length][y] = -10; }
    }

    // return true when successfully place
    return true;
  };

  const receiveAttack = (x, y) => {
    // return false when miss, -10 or the ship is not clickable
    if (arrayGB[x][y] === 0) return false;
    return true;
  };

  return {
    arrayGB, placeShip, receiveAttack,
  };
};

export {
  Gameboard, shipList,
};
