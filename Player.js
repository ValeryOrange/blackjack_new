/**
* @Module Player
* @description описывает базовые свойства и методы всех игроков
* @author Valeriya Tokareva <tkrv.valery@gmail.com>
* @version 1.0.0
**/

module.exports = class Player {
  /**
  * @param {String} name имя игрока
  * @param {String} type тип игрока
  */
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.score = 0;
    this.cardNumber = 0;
  }

  addPoints(num) {
    this.score += num;
  }
}