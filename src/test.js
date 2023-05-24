function testShuffleArray() {
  const arrayNumbers = [1, 2, 3, 4, 5];
  const shuffledArray = shuffleArray(arrayNumbers);
  const sortedArray = arrayNumbers.sort();
  const sortedShuffledArray = shuffledArray.sort();

  console.assert(JSON.stringify(shuffleArray([])) === JSON.stringify([]), "shuffleArray is not handling empty arrays correctly");
  console.assert(JSON.stringify(shuffleArray([1])) === JSON.stringify([1]), "shuffleArray is not handling single values correctly");
  console.assert(JSON.stringify(sortedArray) === JSON.stringify(sortedShuffledArray), "shuffleArray is not working as inteded");
}

function testGetSetOfCards() {
  const arrayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const setOfNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

  console.assert(JSON.stringify(getSetOfCards([])) === JSON.stringify([]), "getSetOfCards is not handling empty arrays correctly");
  console.assert(JSON.stringify(getSetOfCards([1, 1])) === JSON.stringify([1, 1]), "getSetOfCards is not handling single matches correctly");
  console.assert(JSON.stringify(getSetOfCards(arrayNumbers)) === JSON.stringify(setOfNumbers), "getSetOfCards is not working as intended");
}

testShuffleArray();
testGetSetOfCards();
