document.querySelector("#start-button").onclick = () => {
  startGame();
};

function startGame() {
  const cards = shuffledSetOfCards(cardValues);
  console.log(cards);
  createCards(cards);
}

document.querySelector("#table").onclick = (event) => {
  const $clickedCard = event.target;
  handleClicks($clickedCard);
};

function createCards(cards) {
  const $containers = document.querySelectorAll(".cards-container");
  $containers.forEach((container, index) => {
    const cardValue = cards[index];
    const $card = document.createElement("img");
    $card.src = `img/fig-${cardValue}.jpg`;
    $card.className = "img-thumbnail cards";

    container.appendChild($card);
  });
}

function handleClicks(click) {
  const $cards = document.querySelectorAll("#table .cards-container");
  $cards.forEach((card) => {
    if (card.contains(click)) {
      card.className = "col-3 gy-1 flipped";
    }
  });
}
