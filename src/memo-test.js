let myCards = ["img/fig-1.jpg", "img/fig-2.jpg", "img/fig-3.jpg", "img/fig-4.jpg", "img/fig-5.jpg", "img/fig-6.jpg"];

function shuffleArray(array) {
  const shuffledArray = array.slice();

  shuffledArray.forEach((element, index) => {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledArray[index], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[index]];
  });
  return shuffledArray;
}

document.querySelector("#start-button").onclick = () => {
  startGame();
};

function startGame() {
  const duplicatedCards = myCards.concat(myCards);
  createCards(shuffleArray(duplicatedCards));
}

document.querySelector("#table").onclick = (event) => {
  handleClicks();
};

function createCards(cards) {
  const $containers = document.querySelectorAll(".cards-container");
  $containers.forEach((container, index) => {
    const $card = document.createElement("img");
    console.log(cards);
    $card.src = cards[index];
    $card.className = "img-thumbnail cards";

    container.appendChild($card);
  });
}

function handleClicks() {
  const $clickedCard = event.target;
  console.log($clickedCard);

  const $cards = document.querySelectorAll("#table .cards-container");
  $cards.forEach((card) => {
    if (card.contains($clickedCard)) {
      card.className = "col-3 gy-1 flipped";
    }
  });
}
