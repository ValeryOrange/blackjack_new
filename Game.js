/**
* @Module Game
* @describe Логика игры
* @author Valeriya Tokareva <tkrv.valery@gmail.com>
* @requires chalk
* @version 1.0.0
**/

// внешние модули
const chalk = require('chalk');

// внутренние модули
const readline = require('readline');
const blockBreak = require('./BlockBreak');


// число карт каждому игроку во время первой раздачи
const FIRST_NUMBER = 2;
const BLACKJACK = 21;
const STOP_SCORE = 17;

module.exports = class Game {
  /**
  * @param {Array} deck колода карт
  */
  constructor(deck) {
    this.winner = '';
    this.deck = deck;
  }

  /**
  * @description приветствует пользователя и спрашивает его имя
  * @return {String} имя пользователя
  */
  setUserName() {
    return new Promise((resolve, reject) => {
      let name = '';
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      console.log("Hello! Welcome to our blackjack casino! Let's see how deep the rabbit-hole goes.");
      blockBreak();

      rl.question('What is your name?\n', (answer) => {
        if (answer && answer !== ' ') {
          name = answer;
          resolve(name);
        } else {
          resolve('Mr. Anderson');
        }
        rl.close();
      });
    });
  }

  /**
  * @return {Number} вес возвращенной карты
  * private
  */
  getCard() {
    const randomIndex = Math.floor(Math.random()*this.deck.length);
    const dealtCard = this.deck.splice(randomIndex, 1)[0];
    return dealtCard;
  }

  /**
  * @param {Array} массив игроков
  * @description выдает игроку одну карту
                 если счет больше 21 и выпал туз, то его вес 11 очков
  */
  dealCard(player) {
    let card = this.getCard();
    player.addPoints(card);
    if (card === 11 && player.score >= BLACKJACK) {
      player.addPoints(-10);
    }
    player.cardNumber++;
  }

  /**
  * @param {Array} массив игроков
  * @description при первой раздаче раздает каждому игру несколько карт
  */
  firstDealing(players, len) {
    console.log('There is the first dealing!\n');
    let i = len;
    
    // важен порядок обработки элементов массива, поэтому for с обратным отсчетом
    for (i;i >= 0;i--) {
      for (let k = FIRST_NUMBER;k--;) {
        this.dealCard(players[i]);
      }
      console.log(`${players[i].name} has ${players[i].score} points`);
    }
  }

  checkBlackjack(players) {
    players.map((item) => {
      if (item.score === BLACKJACK) {
        this.winner = !this.winner ? item.name : 'standoff';
      }
    });
  }

  checkIfUserLose(user, dealer) {
    if (user.score > BLACKJACK) {
      this.winner = dealer.name;
      console.log('It busts. Sorry!\n');
      return true;
    }
  }

  checkFinalScore(user, dealer) {
    if (user.type === 'user') {
      if (user.score > 21 && dealer.score > 21) {
        this.winner = 'standoff';
      } else if ((user.score > dealer.score && user.score <= 21) ||
                 (dealer.score > 21 && user.score < dealer.score)) {
        this.winner = user.name;
      } else this.winner = dealer.name;
    } else return;
  }
};
