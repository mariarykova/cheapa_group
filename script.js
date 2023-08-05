const carousel = document.querySelector(".carousel");
const prevBtn = document.querySelector(".arrow-right");
const nextBtn = document.querySelector(".arrow-left");
const prevBtnMobile = document.querySelector(".arrow-left-mobile");
const nextBtnMobile = document.querySelector(".arrow-right-mobile");

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    showCarCardsCarousel(data);
  })
  .catch((error) => {
    console.error("Error fetching carousel data:", error);
  });

const slideStep = 1;
const slideDistance = 345;
let currentPosition = 0;

function moveCarousel(direction) {
  const carouselWidth = carousel.offsetWidth;
  const maxPosition = carousel.scrollWidth - carouselWidth;
  const newPosition =
    direction === "left"
      ? currentPosition - slideStep * slideDistance
      : currentPosition + slideStep * slideDistance;

  if (newPosition <= 0 && newPosition >= -maxPosition) {
    carousel.style.transform = `translateX(${newPosition}px)`;
    currentPosition = newPosition;
  }
}

prevBtn.addEventListener("click", () => moveCarousel("right"));
nextBtn.addEventListener("click", () => moveCarousel("left"));
prevBtnMobile.addEventListener("click", () => moveCarousel("left"));
nextBtnMobile.addEventListener("click", () => moveCarousel("right"));

function showCarCardsCarousel(data) {
  let carouselNew = "";

  for (let i = 0; i < 6; i++) {
    const images = data[i].images.map((image) => {
      return `<img class="car_image_card" src=${image.img} alt="" />`;
    });
    const newImages = images.join(" ");
    carouselNew += `<div class="card_container">
    <div class="slider-container">
    <div class="slider">
         <div class="slides">${newImages}</div>
    </div>
    <button class="prev-btn">Previous</button>
    <button class="next-btn">Next</button>
</div> 
                <div class="card_car_info">
                  <div class="card_car_title">${data[i].title}</div>
                  <div class="card_car_year"><strong>Year:</strong> ${data[i].year}</div>
                  <div class="card_car_model"><strong>Model:</strong> ${data[i].model}</div>
                  <div class="card_car_make"><strong>Make:</strong> ${data[i].make}</div>
                  <div class="card_car_description"><strong>Desription:</strong> ${data[i].description}</div>
                </div>
              </div>
    `;
  }
  carousel.innerHTML = carouselNew;
}

// SLIDE FUNCTION

function createSlider(card) {
  const slider = card.querySelector(".slider");
  const prevBtn = card.querySelector(".prev-btn");
  const nextBtn = card.querySelector(".next-btn");
  const slides = card.querySelector(".slides");

  let currentIndex = 0;

  function showSlide(index) {
    const slideWidth = slider.clientWidth;
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + slides.children.length) % slides.children.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.children.length;
    showSlide(currentIndex);
  });

  showSlide(currentIndex);
}

function observeCardGallery() {
  const cardContainer = document.querySelector(".carousel");

  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains("card_container")) {
            const cards = document.querySelectorAll(".card_container");
            cards.forEach((card) => {
              createSlider(card);
            });
          }
        });
      }
    });
  });

  observer.observe(cardContainer, { childList: true });
}

observeCardGallery();

// BURGER FUNCTION

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");

  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("show");
  });
});

// TOUCH
// JS
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

carousel.addEventListener("touchstart", touchStart);
carousel.addEventListener("touchmove", touchMove);
carousel.addEventListener("touchend", touchEnd);
carousel.addEventListener("touchcancel", touchEnd);

function touchStart(event) {
  isDragging = true;
  startPosition = getPositionX(event);
  currentTranslate = currentPosition;
}

function touchMove(event) {
  if (isDragging) {
    const currentPositionX = getPositionX(event);
    currentTranslate = prevTranslate + currentPositionX - startPosition;
  }
}

function touchEnd() {
  isDragging = false;
  currentPosition = currentTranslate;

  const carouselWidth = carousel.offsetWidth;
  const maxPosition = carousel.scrollWidth - carouselWidth;

  // Snap to the nearest card
  const slideWidth = carouselWidth / slideStep;
  let currentIndex = Math.round(-currentPosition / slideWidth);
  currentIndex = Math.max(
    0,
    Math.min(currentIndex, carousel.children.length - slideStep)
  );
  currentPosition = -currentIndex * slideWidth;

  // Prevent carousel from going out of bounds
  currentPosition = Math.max(-maxPosition, Math.min(0, currentPosition));

  moveCarouselMob(currentPosition);
}

function moveCarouselMob(newPosition) {
  carousel.style.transform = `translateX(${newPosition}px)`;
}

function getPositionX(event) {
  return event.touches ? event.touches[0].clientX : event.clientX;
}

// TOUCH

let slider = document.querySelector(".slider-carousel"),
  sliderList = slider.querySelector(".slider-list-carousel"),
  sliderTrack = slider.querySelector(".slider-track-carousel"),
  slides = slider.querySelectorAll(".slides-carousel"),
  arrows = slider.querySelector(".slider-arrows"),
  prev = arrows.children[0],
  next = arrows.children[1],
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posFinal = 0,
  posThreshold = slideWidth * 0.35,
  transition = true,
  trfRegExp = /[-0-9.]+(?=px)/,
  getEvent = function () {
    return event.type.search("touch") !== -1 ? event.touches[0] : event;
  },
  slide = function () {
    if (transition) {
      sliderTrack.style.transition = "transform .5s";
    }
    sliderTrack.style.transform = `translate3d(-${
      slideIndex * slideWidth
    }px, 0px, 0px)`;

    prev.classList.toggle("disabled", slideIndex === 0);
    next.classList.toggle("disabled", slideIndex === 2);
  },
  swipeStart = function () {
    let evt = getEvent();

    posInit = posX1 = evt.clientX;

    sliderTrack.style.transition = "";

    document.addEventListener("touchmove", swipeAction);
    document.addEventListener("mousemove", swipeAction);
    document.addEventListener("touchend", swipeEnd);
    document.addEventListener("mouseup", swipeEnd);
  },
  swipeAction = function () {
    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    sliderTrack.style.transform = `translate3d(${
      transform - posX2
    }px, 0px, 0px)`;
  },
  swipeEnd = function () {
    posFinal = posInit - posX1;

    document.removeEventListener("touchmove", swipeAction);
    document.removeEventListener("mousemove", swipeAction);
    document.removeEventListener("touchend", swipeEnd);
    document.removeEventListener("mouseup", swipeEnd);

    if (Math.abs(posFinal) > posThreshold) {
      if (posInit < posX1) {
        slideIndex--;
      } else if (posInit > posX1) {
        slideIndex++;
      }
    }

    if (posInit !== posX1) {
      slide();
    }
  };

sliderTrack.style.transform = "translate3d(0px, 0px, 0px)";

slider.addEventListener("touchstart", swipeStart);
slider.addEventListener("mousedown", swipeStart);

arrows.addEventListener("click", function () {
  let target = event.target;

  if (target === next) {
    slideIndex++;
  } else if (target === prev) {
    slideIndex--;
  } else {
    return;
  }

  slide();
});
