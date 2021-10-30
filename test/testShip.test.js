import Ship from '../src/ship';

test('name and length out put', () => {
  const ship = Ship('Carrier', 12);
  expect(ship.name).toBe('Carrier');
});

test('get hit three times', () => {
    const ship = Ship('Carrier', 5);
    ship.hit();
    ship.hit();
    expect(ship.shipHit).toEqual([-1,-1,0,0,0]);
});

test('sunk', () => {
    const ship = Ship('sub',1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})