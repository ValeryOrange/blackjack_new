/**
* @Module SetDeck
* @description создает 1 колоду карт c заданным количеством карт нужного веса
* @author Valeriya Tokareva <tkrv.valery@gmail.com>
* @version 1.0.0
**/

const numberOfCards = new Map();
let deck = [];

//key - вес карт, value - количество
numberOfCards.set(2,4)
            .set(3,4)
            .set(4,4)
            .set(5,4)
            .set(6,4)
            .set(7,4)
            .set(8,4)
            .set(9,4)
            .set(10,16)
            .set(11,4);

for(let [key, value] of numberOfCards.entries()) {
  let i = value - 1;
  for (i;i--;) {
    deck.push(key);
  }
}

module.exports = deck;