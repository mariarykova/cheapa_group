// SLIDE FUNCTION

const cards = document.querySelectorAll(".card_container");

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

cards.forEach((card) => {
  createSlider(card);
});

// BURGER FUNCTION

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");

  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("show");
  });
});

// CAROUSEL AND TOUCH FUNCTION

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
    next.classList.toggle("disabled", slideIndex === slides.length);
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
