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
  const $img = document.querySelectorAll(".cards-container img");

  $img.forEach((img, index) => {
    const cardValue = cards[index];
    img.src = `img/unflipped-card-${cardValue}.jpg`;
  });

  $containers.forEach((container, index) => {
    const cardValue = cards[index];
    const $card = document.createElement("img");
    $card.src = `img/fig-${cardValue}.jpg`;
    $card.className = "img-thumbnail cards";
    container.appendChild($card);
  });
}

function handleClicks(click) {
  click.classList.add("col-3", "gy-1", "cards", "flipped");
  if (flipped === "") {
    flipped = click;
  } else {
    const success = flipped.getAttribute("src") === click.getAttribute("src");
    if (success) {
      matchCards(click);
    } else {
      setTimeout(() => {
        removeFlipped(click);
      }, 1500);
    }
    flipped = "";
  }
}

function setPointerEvents(selector, value) {
  document.querySelector(selector).style.pointerEvents = value;
}

function matchCards(card) {
  card.classList.replace("flipped", "matched");
  document.querySelector(".flipped").classList.replace("flipped", "matched");
}

function removeFlipped(card) {
  card.classList.remove("flipped");
  document.querySelector(".flipped").classList.remove("flipped");
}
