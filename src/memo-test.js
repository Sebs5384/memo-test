document.querySelector("#start-button").onclick = () => {
  resetGame();
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
  setStartButton("hidden");
  setStarsVisibility("star");
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
  const $gol = document.querySelector("#gol");
  const $whistle = document.querySelector("#whistle");
  const $lastGoal = document.querySelector("#last-goal");
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

      if (matchedCards.length === 10) {
        $lastGoal.play();
      } else {
        $gol.play();
      }

      if (matchedCards.length === 12) {
        userWins();
      }
    } else {
      $whistle.play();
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

function setStartButton(value) {
  document.querySelector("#start-button").className = value;
}

function setStarsVisibility(value) {
  const $star = document.querySelectorAll(".star");
  $star.forEach((star) => {
    star.className = value;
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
  const $winnerChant = document.querySelector("#argentina-chant");
  $body.style.backgroundImage = "url(img/final.png)";
  $winnerChant.play();
  decreaseBodyOpacity();
  increaseBodyOpacity();
  changeCards();
  changeHeader();
}

function decreaseBodyOpacity() {
  const $body = document.querySelector("body");
  let opacity = 1;
  let decreaseOpacityTimer = setInterval(() => {
    if (opacity <= 0) {
      clearInterval(decreaseOpacityTimer);
    } else {
      opacity -= 0.1;
      $body.style.opacity = opacity;
    }
  }, 1500);
}

function increaseBodyOpacity() {
  const $body = document.querySelector("body");
  let opacity = 0;
  setTimeout(() => {
    let increaseOpacityTimer = setInterval(() => {
      if (opacity >= 1) {
        clearInterval(increaseOpacityTimer);
      } else {
        opacity += 0.1;
        $body.style.opacity = opacity;
      }
    }, 1500);
  }, 15000);
}

function changeCards() {
  const $cards = document.querySelectorAll("#table img+img");

  setTimeout(() => {
    $cards.forEach((card, index) => {
      index += 1;
      card.src = `img/fig-${index}.jpg`;
    });
  }, 15000);
}

function changeHeader() {
  const $headLetter = document.querySelector("#head-container strong");
  $headLetter.innerText = "You win !!!";

  setStarsVisibility("star hidden");
  setStartButton("btn btn-success");
}
