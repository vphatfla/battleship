import {Gameboard} from "../src/gameboard";
import {createShipList} from "../src/gameboard";
import Ship from "../src/ship";

const a = new Array(10);
for (let i=0; i<10; i++) {
    a[i] = new Array(10);
    for (let j = 0; j<10; j++){
        a[i][j] = 0;
    }
}
const shipList = createShipList();
const s = [Ship(1,4),Ship(2,3),Ship(3,3),Ship(4,2),
    Ship(5,2), Ship(6,2), Ship(7,1), Ship(8,1), Ship(9,1), Ship(10,1)];
test('original all 0 array', () => {
    const gb1 = Gameboard();
    expect(gb1.arrayGB).toEqual(a);
});

// test ship List
test('ship list', () =>{
    expect(JSON.stringify(shipList)).toEqual(JSON.stringify(s));
});

test('place ship at 0,0 length 4 horizontally', () => {
    const gb1 = Gameboard();
    gb1.placeShip(0,0, 'horizontal', s[0]);
    for (let i = 0; i<4; i++){
        a[0][i] = shipList[0].name;
    }
    a[0][4] = -10;
    for (let i=0; i<4; i++){
        a[1][i] = -10;
    }
    expect(gb1.arrayGB).toEqual(a);
})

test('place ship at 3,4 vertically length 3' , () => {
    for (let i=0; i<10; i++) {
        a[i] = new Array(10);
        for (let j = 0; j<10; j++){
            a[i][j] = 0;
        }
    }

    for (let i=0; i<3; i++){
        a[3+i][4] = 3;
        a[3+i][3] = -10;
        a[3+i][5] = -10;
    }
    a[2][4] = -10;
    a[6][4] = -10;
    const gb1 = Gameboard();
    gb1.placeShip(3,4, 'vertical', shipList[2]);
    expect(gb1.arrayGB).toEqual(a);    
})

// test place ship at bottem, right, top ...
test('place ship at bottom 9,6 length 4', () => {
    for (let i=0; i<10; i++) {
        a[i] = new Array(10);
        for (let j = 0; j<10; j++){
            a[i][j] = 0;
        }
    }

    for (let i = 0; i<4; i++) {
        a[9][6+i] = 1;
        a[8][6+i] = -10;
    }
    a[9][5] = -10;

    const gb1 = Gameboard();
    gb1.placeShip(9,6, 'horizontal', shipList[0]);
    expect(gb1.arrayGB).toEqual(a);
})

test('place ship at bottom left vertically 8,9 length 2', () => {
    for (let i=0; i<10; i++) {
        a[i] = new Array(10);
        for (let j = 0; j<10; j++){
            a[i][j] = 0;
        }
    }

    for(let i=0; i<2; i++){
        a[8+i][9] = shipList[4].name;
        a[8+i][8] = -10;
    }
    a[7][9] = -10;

    const gb1 = Gameboard();
    gb1.placeShip(8,9,'vertical', shipList[4]);
    expect(gb1.arrayGB).toEqual(a);
});

test('test place 2 ships, the second one cant because -10', () => {
    for (let i=0; i<10; i++) {
        a[i] = new Array(10);
        for (let j = 0; j<10; j++){
            a[i][j] = 0;
        }
    }

    // 1st ship at 5,4 length 3 ship[2] horizontally
    for (let i = 0; i<3; i++){
        a[5][4+i] = shipList[2].name;
        a[4][4+i] = -10;
        a[6][4+i] = -10;
    }
    a[5][3] = -10;
    a[5][7] = -10;
    const gb1 = Gameboard();
    gb1.placeShip(4,7, 'vertical', shipList[0])
    
    // 2nd ship at 5,5 length 4 ship[1] vertically
    expect(gb1.placeShip(4,7, 'vertical', shipList[0])).toBe(false);
})

// next: recieve attacks

test('receive attack basic, placeship at 0,0 length 4 vertically, hit at 3,0', () => {
    for (let i=0; i<10; i++) {
        a[i] = new Array(10);
        for (let j = 0; j<10; j++){
            a[i][j] = 0;
        }
    }
    const testShip = [];
    testShip[0] = Ship(1,4);
    for (let i = 0; i<testShip[0].length; i++){
        a[0+i][0] = testShip[0].name;
        a[0+i][1] = -10;
    }
    a[4][0] = -10;
    // 
    const gb1 = Gameboard();
    gb1.placeShip(0,0, 'vertical', testShip[0]);
    gb1.receiveAttack(3,0);
    // 
    a[3][0] = -1;
    testShip[1] = Ship(2,3);
    testShip[1].hit();
    testShip[1].hit();
    testShip[1].hit();
    console.log(testShip[1].isSunk());
    console.table(a);
    expect(gb1.arrayGB).toEqual(a);

})

// test sunk of one ship 
test('test sunk of one ship', () => {
    const testShip = Ship(1,3);
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
});
