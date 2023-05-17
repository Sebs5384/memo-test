document.querySelector("#start-button").onclick = () => {
  startGame();
};

document.querySelector("#table").onclick = (event) => {
  const $img = Array.from(document.querySelectorAll("#table img"));
  const $clickedCard = event.target;

  if ($img.includes($clickedCard)) {
    handleClicks($clickedCard);
  }
};

function startGame() {
  const cards = shuffledSetOfCards(cardValues);
  hideStartButton();
  displayStars();
  createCards(cards);
  setTableClickable(true);
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
  let actualClick = click;
  actualClick.classList.add("col-3", "gy-1", "cards", "flipped");

  if (previousClick === "") {
    previousClick = actualClick;
  } else {
    const previousClickCard = previousClick.getAttribute("src");
    const actualClickCard = actualClick.getAttribute("src");

    const success = previousClickCard === actualClickCard;
    if (success) {
      matchCards(click);
      glowStars(success);
      matchedCards.push(...[actualClick, previousClick]);

      if (matchedCards.length === 12) {
        userWins();
      }
    } else {
      setTableClickable(false);
      setTimeout(() => {
        removeFlippedCards(click);
        setTableClickable(true);
      }, 1500);
    }
    previousClick = "";
  }
}

function glowStars(success) {
  let $star = document.querySelectorAll(".star");
  let currentOpacity = parseFloat(window.getComputedStyle($star[index]).getPropertyValue("opacity"));

  if (success) {
    currentOpacity += 0.5;
    $star[index].style.opacity = currentOpacity;

    if (currentOpacity === 1) {
      index += 1;
    }
  }
}

function hideStartButton() {
  document.querySelector("#start-button").className = "hidden";
}

function displayStars() {
  const $star = document.querySelectorAll(".star");
  $star.forEach((star) => {
    star.className = "star";
  });
}

function setTableClickable(isClickeable) {
  const pointerEventsValue = isClickeable ? "auto" : "none";
  document.querySelector("#table").style.pointerEvents = pointerEventsValue;
}

function matchCards(card) {
  card.classList.replace("flipped", "matched");
  document.querySelector(".flipped").classList.replace("flipped", "matched");
}

function removeFlippedCards(card) {
  card.classList.remove("flipped");
  document.querySelector(".flipped").classList.remove("flipped");
}

function userWins() {
  const $body = document.querySelector("body");
  let opacity = 1;

  $body.style.backgroundImage = "url(img/final.png)";
  let timer = setInterval(() => {
    if (opacity <= 0) {
      clearInterval(timer);
    } else {
      opacity -= 0.1;
      $body.style.opacity = opacity;
    }
  }, 1000);
}
