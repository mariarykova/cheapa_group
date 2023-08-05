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
