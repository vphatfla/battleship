import { Gameboard } from './gameboard';

function Players(name, isTurn) {
  // check if it is this player turn
  // eslint-disable-next-line prefer-const
  this.name = name;
  this.isHisTurn = isTurn;
  this.setTurn = (turn) => {
    this.isHisTurn = turn;
  };
  this.playerGB = Gameboard(); // set gameboard for each player
  // enemy of player: enemy of person is computer and vice versa
  this.enemy = '';
  this.setEnemy = (enemyPlayer) => {
    this.enemy = enemyPlayer;
  };

  // function player attack the enmy at x,y -> enemy receive an attack at x,y
  this.attackPosition = (x, y) => this.enemy.receiveAttackPosition(x, y);

  // function player receive the attack and push it on his gameboard
  this.receiveAttackPosition = (x, y) => this.playerGB.receiveAttack(x, y);

  // visual array (the enemy array that the opponent see)
  this.visualArray = () => this.enemy.playerGB.displayArray;

  // check if the player win yet === enemy ship is all sunk
  this.winYet = () => this.enemy.playerGB.isAllShipSunk();
}

export default Players;
