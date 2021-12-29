function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// placeship
const placeShipRandomForComputer = (computer) => {
  // clear the arraygb first
  for (let i = 0; i <= 9; i += 1) {
    for (let j = 0; j <= 9; j += 1) {
      // eslint-disable-next-line no-param-reassign
      computer.playerGB.arrayGB[i][j] = 0;
    }
  }
  // total 9 ships
  for (let i = 0; i <= 9; i += 1) {
    let check = false;
    // x and y randomly from 0-9
    // z random 0 or 1, 0 -> vertical and 1 -> horizontal
    while (!check) {
      const x = getRandomInt(10);
      const y = getRandomInt(10);
      const z = getRandomInt(2);
      let direction;
      if (z === 0) direction = 'vertical';
      else direction = 'horizontal';
      check = computer.playerGB.placeShip(x, y, direction, computer.playerGB.shipList[i]);
    }
  }
};

// lastX,Y are used to store the previous move of computer
// if this is the first move, x = -1;
const makeComputerAttack = (computer) => {
  const a = computer.visualArray();
  // search for -1 first in a
  let checkIfSomeShipIsHit = false; // assume that there is no -1
  let xNow = 0; let
    yNow = 0; // xNow and yNow stand for the point of the ship being hit
    // if we have the check turn true which is the point is being hit, we now checking around
    // xNow and yNow
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (a[i][j] === -1) {
        checkIfSomeShipIsHit = true;
        xNow = i;
        yNow = j;
        break;
      }
    }
    if (checkIfSomeShipIsHit) break;
  }
  // now check
  if (!checkIfSomeShipIsHit) {
    // if there is no ship being hit yet ( no  -1)
    let xRandom = getRandomInt(10);
    let yRandom = getRandomInt(10);
    while (a[xRandom][yRandom] !== 0) {
      xRandom = getRandomInt(10);
      yRandom = getRandomInt(10);
    }
    return computer.attackPosition(xRandom, yRandom);
  }

  // case 1: check to the right
  if (yNow <= 8 && a[xNow][yNow + 1] === -1) {
    for (let j = yNow; j <= 9; j += 1) {
      if (a[xNow][j] === 0) {
        return computer.attackPosition(xNow, j);
      } if (a[xNow][j] !== -1) break;
    }
    // attack to the left if there is no available on the right
    return computer.attackPosition(xNow, yNow - 1);
  }

  // case 2: check below
  if (xNow <= 8 && a[xNow + 1][yNow] === -1) {
    for (let i = xNow; i <= 9; i += 1) {
      if (a[i][yNow] === 0) {
        return computer.attackPosition(i, yNow);
      } if (a[i][yNow] !== -1) break;
    }
    // attack to the above position if there is no available below xNow
    return computer.attackPosition(xNow - 1, yNow);
  }
  // case 3: go left if there is a 0
  if (yNow >= 1 && a[xNow][yNow - 1] === 0) {
    return computer.attackPosition(xNow, yNow - 1);
  }
  // case 4: go above if there is a 0
  if (xNow >= 1 && a[xNow - 1][yNow] === 0) {
    return computer.attackPosition(xNow - 1, yNow);
  }
  // case 5: go right if there is a 0
  if (yNow <= 8 && a[xNow][yNow + 1] === 0) {
    return computer.attackPosition(xNow, yNow + 1);
  }
  // case 6: go belove if there is a 0
  if (xNow <= 8 && a[xNow + 1][yNow] === 0) {
    return computer.attackPosition(xNow + 1, yNow);
  }
  // return false when there is no move to be made
  return false;
};
export {
  placeShipRandomForComputer,
  makeComputerAttack,
};
