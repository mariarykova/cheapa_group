const gallery = document.querySelector(".car_cards_gallery");
let fetchedArray;

fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    fetchedArray = data;
    showCarCardsGallery(data);
  })
  .catch((error) => {
    console.error("Error fetching carousel data:", error);
  });

function showCarCardsGallery(data) {
  let cardsNew = "";
  data.map((card) => {
    const images = card.images.map((image) => {
      return `<img class="car_image_card car_image_card_gallery " src=${image.img} alt="" />`;
    });
    const newImages = images.join(" ");
    cardsNew += `
        <div class="card_container" >

        <div class="slider-container card_container_gallery">
            <div class="slider slider_gallery">
                 <div class="slides">${newImages}</div>
            </div>
            <button class="prev-btn">Previous</button>
            <button class="next-btn">Next</button>
        </div>

        <div class="card_car_info" data-card-id=${card.id}>
                      <div class="card_car_title">${card.title}</div>
                      <div class="card_car_year"><strong>Year:</strong> ${card.year}</div>
                      <div class="card_car_model"><strong>Model:</strong> ${card.model}</div>
                      <div class="card_car_make"><strong>Make:</strong> ${card.make}</div>
                      <div class="card_car_description"><strong>Desription:</strong> ${card.description}</div>
                    </div>
                  </div>
        `;
  });
  gallery.innerHTML = cardsNew;
}

// SLIDE FUNCTION

// Function to create a slider for each card
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

  // Show the initial slide
  showSlide(currentIndex);
}

// Function to observe changes in the card gallery and initialize sliders for new cards
function observeCardGallery() {
  const cardContainer = document.querySelector(".car_cards_gallery");
  // Create a MutationObserver to observe changes in the card gallery
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

// POP UP SCRIPT

const openPopupButton = document.getElementById("openPopup");
const closePopupButton = document.getElementById("closePopup");
const popup = document.getElementById("popup");
const infoForm = document.getElementById("infoForm");
const content = document.querySelector(".popup-content");

openPopupButton.addEventListener("click", () => {
  popup.style.display = "block";
});

closePopupButton.addEventListener("click", () => {
  popup.style.display = "none";
});

infoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  emailjs
    .send("service_x5q51jj", "template_aars4q9", {
      name: infoForm.name.value,
      phone: infoForm.phone.value,
      email: infoForm.email.value,
    })
    .then(
      function (response) {
        console.log("Email sent successfully:", response);
        infoForm.style.display = "none";
        document.querySelector(".popup-content h2").style.display = "none";
        const message = `<div>Thank you! We will contact you soon!</div>`;
        document.getElementById("message").innerHTML = message;
      },
      function (error) {
        console.log("Email sending failed:", error);
      }
    );
});

document.addEventListener("click", (e) => {
  if (!content.contains(e.target) && e.target !== openPopupButton) {
    popup.style.display = "none";
  }
});
