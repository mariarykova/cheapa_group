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

// CAROUSEL AND TOUCH FUNCTION

let swiper = new Swiper(".slider-list-carousel", {
  slidesPerView: 3,
  grabCursor: "true",
  spaceBetween: 20,
  navigation: {
    nextEl: ".arrow-left",
    prevEl: ".arrow-right",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});
