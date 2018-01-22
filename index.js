/**
* @Module Blackjack
* @describe Эмулирует игру с дилером по упрощенным правилам блэкджека
* @author Valeriya Tokareva <tkrv.valery@gmail.com>
* @requires chalk
* @version 1.0.0
**/

// внешние модули
const chalk = require('chalk');

// внутренние модули
const Game = require('./Game');
const Deck = require('./SetDeck');
const Player = require('./Player');
const blockBreak = require('./BlockBreak');

// создается новая игра
const newGame = new Game(Deck);

/**
* @description асинхронная функция, описывающая логику игры
*/
const gameLogic = async () => {
  try {
    const userName = await newGame.setUserName();
    blockBreak();
    console.log(`Hello, ${userName}!`);
    const dealer = new Player('Agent Smith', 'dealer');
    const user = new Player(userName, 'user');
    console.log('Agent Smith is dealer.');
    blockBreak();
    const players = [dealer,user];
    let i = players.length - 1;
    let isUserLose = false;

    newGame.firstDealing(players, i);
    newGame.checkBlackjack(players);

    // основной игровой цикл
    while (!newGame.winner) {
      for (i;i >= 0; i--) {
        if (dealer.score < 17) {
          newGame.dealCard(players[i]);
          console.log(`${players[i].name} has ${players[i].score} points`);

          // проверка, не вышло ли у игрока больше 21
          if (players[i].type === 'user') {
            isUserLose = newGame.checkIfUserLose(players[i], dealer);
            if (isUserLose) break;
          }
        } else {
          newGame.checkFinalScore(players[i], dealer);
        }
      }
      blockBreak();
    }

    console.log(`The winner is: ${newGame.winner}`);
  } catch (e) {
    console.error(e.message);
  }
}

gameLogic();




