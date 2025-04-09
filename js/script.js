let clickCount = parseInt(localStorage.getItem("clickCount")) || 0; // Récupère le nombre de clics depuis le localStorage ou initialise à 0
let multiplier = parseInt(localStorage.getItem("multiplier")) || 1; // Récupère le multiplicateur depuis le localStorage ou initialise à 1
let maxClicks = 50; // Valeur initiale correspondant au premier bonus
const clickCountElement = document.getElementById('clickCount');
const progressBar = document.getElementById('progressBar');
const carImage = document.getElementById('carImage');

// Liste des bonus (doit correspondre à celle de shop.js)
const bonuses = [
  { clicks: 50, name: "x2", multiplier: 2 },
  { clicks: 200, name: "x4", multiplier: 4 },
  { clicks: 500, name: "x8", multiplier: 8 },
  { clicks: 1500, name: "x16", multiplier: 16 },
  { clicks: 5000, name: "x32", multiplier: 32 }
];

// Fonction pour mettre à jour le prochain objectif
function updateMaxClicks() {
  const nextBonus = bonuses.find(bonus => bonus.multiplier > multiplier);
  maxClicks = nextBonus ? nextBonus.clicks : maxClicks; // Si aucun bonus restant, garder le max actuel
}

// Initialisation du maximum de clics
updateMaxClicks();

document.addEventListener("DOMContentLoaded", () => {
  const clickCounter = document.getElementById("clickCount");
  const resetButton = document.getElementById("resetButton");

  // MAJ du compteur si sur index.html
  if (clickCounter && carImage) {
    clickCounter.textContent = clickCount;
    loadCarImage();

    // Ajoute un événement de clics sur l'image
    carImage.addEventListener('click', () => {
      clickCount += multiplier; // Ajoute les clics en fonction du multiplicateur
      localStorage.setItem("clickCount", clickCount); // Stocke le nombre de clics dans le localStorage
      clickCountElement.textContent = clickCount;

      // Met à jour la barre de progression
      const progress = Math.min((clickCount / maxClicks) * 100, 100);
      progressBar.style.width = `${progress}%`;
      progressBar.setAttribute('aria-valuenow', progress);
    });

    // Réinitialisation des données
    resetButton.addEventListener("click", () => {
      if (confirm("Voulez-vous vraiment tout réinitialiser ?")) {
        clickCount = 0;
        multiplier = 1;
        localStorage.setItem("clickCount", clickCount); // Réinitialise le nombre de clics dans le localStorage
        localStorage.setItem("multiplier", multiplier); // Réinitialise le multiplicateur dans le localStorage
        clickCounter.textContent = clickCount;
        loadCarImage();

        // Réinitialise la barre de progression
        progressBar.style.width = '0%';
        progressBar.setAttribute('aria-valuenow', 0);

        // Réinitialise le maximum de clics
        updateMaxClicks();
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

