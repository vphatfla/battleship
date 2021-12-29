const Ship = (name, length) => {
  const shipHit = []; // array that display how the ship is hit
  // example: shiplength = 2 -> [0,0]
  // 0: display not hit yet
  // 1: was hit

  // set up the array
  for (let i = 0; i < length; i += 1) { shipHit[i] = 0; }

  // take a hit, mark 1 position is hit, example: ship1 hit 1 -> -1 0 0 0 0, hit twice: -1 -1 0 0 0
  const hit = () => {
    for (let i = 0; i < shipHit.length; i += 1) {
      if (shipHit[i] !== -1) {
        shipHit[i] = -1;
        return;
      }
    }
  };

  // ship is sunk when all array = 1, so if there is still = 0, issunk() = false
  const isSunk = () => {
    for (let i = 0; i < shipHit.length; i += 1) {
      if (shipHit[i] !== -1) return false;
    }
    return true;
  };
  return {
    name, length, shipHit, hit, isSunk,
  };
};
// ship passed all tests
export default Ship;
