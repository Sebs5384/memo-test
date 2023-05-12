document.querySelector("#start-button").onclick = () => {
  startGame();
};

document.querySelector("#table").onclick = (event) => {
  const $clickedCard = event.target;
  handleClicks($clickedCard);
};

function startGame() {
  const cards = shuffledSetOfCards(cardValues);
  createCards(cards);
  setPointerEvents("#table", "auto");
}

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

function handleClicks(click) {}

function setPointerEvents(selector, value) {
  document.querySelector(selector).style.pointerEvents = value;
}
