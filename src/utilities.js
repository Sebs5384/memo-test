let cardValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let previousClick = null;
const matchedCards = [];

function shuffleArray(array) {
  const shuffledArray = array.slice();

  shuffledArray.forEach((element, index) => {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledArray[index], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[index]];
  });
  return shuffledArray;
}

function getSetOfCards(number) {
  let repeatedCards = [];

  for (let i = 0; i < number.length; i++) {
    for (let j = 0; j < number.length; j++) {
      if (repeatedCards.includes(number[i])) {
        continue;
      } else if (number[i] === number[j]) {
        repeatedCards.push(number[i], number[j]);
      }
    }
    if (repeatedCards.length === 12) {
      break;
    }
  }
  return repeatedCards;
}

function shuffledSetOfCards(cards) {
  const duplicatedSet = cards.concat(cards);
  const setOfCards = getSetOfCards(shuffleArray(duplicatedSet));
  const shuffledSetOfCards = shuffleArray(setOfCards);

  return shuffledSetOfCards;
}
