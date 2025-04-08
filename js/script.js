let clickCount = localStorage.getItem("clickCount") ? parseInt(localStorage.getItem("clickCount")) : 0;
let multiplier = localStorage.getItem("multiplier") ? parseInt(localStorage.getItem("multiplier")) : 1;

document.addEventListener("DOMContentLoaded", () => {
  const clickCounter = document.getElementById("clickCount");
  const carImage = document.getElementById("carImage");
  const resetButton = document.getElementById("resetButton");

  // MAJ du compteur si sur index.html
  if (clickCounter && carImage) {
    clickCounter.textContent = clickCount;
    loadCarImage();

    carImage.addEventListener("click", () => {
      clickCount += multiplier;
      localStorage.setItem("clickCount", clickCount);
      clickCounter.textContent = clickCount;
    }
    );
    // Réinitialisation des données
    resetButton.addEventListener("click", () => {
      if (confirm("Voulez-vous vraiment tout réinitialiser ?")) {
        clickCount = 0;
        multiplier = 1;
        localStorage.setItem("clickCount", clickCount);
        localStorage.setItem("multiplier", multiplier);
        clickCounter.textContent = clickCount;
        loadCarImage();
      }
    });
  }
});

function loadCarImage() {
  fetch('cars.json')
    .then(response => response.json())
    .then(cars => {
      let selectedCar = cars[0];
      for (let car of cars) {
        if (clickCount >= car.clicksRequired) {
          selectedCar = car;
        }
      }
      document.getElementById("carImage").src = selectedCar.image;
    });
}

