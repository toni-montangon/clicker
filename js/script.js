let clickCount = parseInt(localStorage.getItem("clickCount")) || 0; // Récupère le nombre de clics depuis le localStorage ou initialise à 0
let multiplier = parseInt(localStorage.getItem("multiplier")) || 1; // Récupère le multiplicateur depuis le localStorage ou initialise à 1
const clickCountElement = document.getElementById('clickCount');
const progressBar = document.getElementById('progressBar');
const carImage = document.getElementById('carImage');

// Liste des bonus (doit correspondre à celle de shop.js)
const bonuses = [
  { clicks: 50, name: "x2", multiplier: 2 },
  { clicks: 200, name: "x4", multiplier: 4 },
  { clicks: 500, name: "x8", multiplier: 8 },
  { clicks: 1500, name: "x16", multiplier: 16 },
  { clicks: 5000, name: "x32", multiplier: 32 },
  { clicks: 10000, name: "x64", multiplier: 64 },
  { clicks: 20000, name: "x128", multiplier: 128 },
  { clicks: 50000, name: "x256", multiplier: 256 },
  { clicks: 100000, name: "x512", multiplier: 512 },
  { clicks: 200000, name: "x1024", multiplier: 1024 },
  { clicks: 500000, name: "x2048", multiplier: 2048 },
  { clicks: 1000000, name: "x4096", multiplier: 4096 },
  { clicks: 2000000, name: "x8192", multiplier: 8192 },
  { clicks: 5000000, name: "x16384", multiplier: 16384 },
  { clicks: 10000000, name: "x32768", multiplier: 32768 },
  { clicks: 20000000, name: "x65536", multiplier: 65536 }
];

// Liste des images des voitures (directement depuis le dossier assets)
const carImages = [
  "assets/niv1-golf.webp",
  "assets/niv2-fiesta.webp",
  "assets/niv3-205gti.webp",
  "assets/niv4-e46.webp",
  "assets/niv5-w204.webp",
  "assets/niv6-e60.webp",
  "assets/niv7-golf7.webp",
  "assets/niv8-cla.webp",
  "assets/niv9-mustang.webp",
  "assets/niv10-f90.webp",
  "assets/niv11-a7.webp",
  "assets/niv12-m4.webp",
  "assets/niv13-ftype.webp",
  "assets/niv14-rs6.webp",
  "assets/niv15-amggt.webp",
  "assets/niv16-r8.webp"
];

// Fonction pour mettre à jour l'image de la voiture après l'achat d'un multiplicateur
function updateCarImage() {
  const carIndex = Math.min(multiplier - 1, carImages.length - 1); // L'index dépend du multiplicateur
  carImage.src = carImages[carIndex];
}

// Fonction pour calculer le prochain objectif de clics
function getNextBonusClicks() {
  const nextBonus = bonuses.find(bonus => bonus.multiplier > multiplier);
  return nextBonus ? nextBonus.clicks : null; // Retourne le nombre de clics requis pour le prochain multiplicateur
}

// Fonction pour mettre à jour la barre de progression
function updateProgressBar() {
  const nextBonusClicks = getNextBonusClicks();
  const previousBonusClicks = bonuses.find(bonus => bonus.multiplier === multiplier)?.clicks || 0;

  if (nextBonusClicks) {
    const progress = ((clickCount - previousBonusClicks) / (nextBonusClicks - previousBonusClicks)) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    progressBar.setAttribute('aria-valuenow', Math.min(progress, 100));
  } else {
    // Si aucun prochain bonus, la barre reste pleine
    progressBar.style.width = '100%';
    progressBar.setAttribute('aria-valuenow', 100);
  }
}

// Fonction pour acheter un multiplicateur
function buyMultiplier() {
  const nextBonus = bonuses.find(bonus => bonus.multiplier > multiplier);
  if (nextBonus && clickCount >= nextBonus.clicks) {
    clickCount -= nextBonus.clicks; // Déduit les clics nécessaires pour acheter le multiplicateur
    multiplier = nextBonus.multiplier; // Met à jour le multiplicateur
    localStorage.setItem("clickCount", clickCount); // Met à jour le nombre de clics dans le localStorage
    localStorage.setItem("multiplier", multiplier); // Met à jour le multiplicateur dans le localStorage
    clickCountElement.textContent = clickCount; // Met à jour l'affichage des clics
    updateCarImage(); // Met à jour l'image de la voiture
    updateProgressBar(); // Met à jour la barre de progression
    alert(`Félicitations ! Vous avez acheté le multiplicateur ${nextBonus.name}.`);
  } else {
    alert("Vous n'avez pas assez de clics pour acheter le prochain multiplicateur.");
  }
}

// Fonction pour réinitialiser le jeu
function resetGame() {
  if (confirm("Voulez-vous vraiment tout réinitialiser ?")) {
    // Réinitialise les variables
    clickCount = 0;
    multiplier = 1;

    // Met à jour le localStorage
    localStorage.setItem("clickCount", clickCount);
    localStorage.setItem("multiplier", multiplier);

    // Met à jour l'affichage
    clickCountElement.textContent = clickCount;
    updateCarImage();

    // Réinitialise la barre de progression
    progressBar.style.width = '0%';
    progressBar.setAttribute('aria-valuenow', 0);

    // Affiche un message de confirmation
    alert("Le jeu a été réinitialisé !");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const clickCounter = document.getElementById("clickCount");
  const resetButton = document.getElementById("resetButton");
  const buyButton = document.getElementById("buyMultiplier"); // Bouton pour acheter un multiplicateur

  // Initialisation
  if (clickCounter && carImage) {
    clickCounter.textContent = clickCount;
    updateCarImage();
    updateProgressBar();

    // Ajoute un événement de clics sur l'image
    carImage.addEventListener('click', () => {
      clickCount += multiplier; // Ajoute les clics en fonction du multiplicateur
      localStorage.setItem("clickCount", clickCount); // Stocke le nombre de clics dans le localStorage
      clickCountElement.textContent = clickCount;

      // Met à jour la barre de progression
      updateProgressBar();
    });

    // Ajoute un événement pour acheter un multiplicateur
    buyButton.addEventListener("click", buyMultiplier);

    // Ajoute un événement pour réinitialiser le jeu
    resetButton.addEventListener("click", resetGame);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.getElementById("resetButton");

  // Ajoute un événement pour réinitialiser le jeu
  if (resetButton) {
    resetButton.addEventListener("click", resetGame);
  } else {
    console.error("Le bouton Réinitialiser (resetButton) est introuvable dans le DOM.");
  }
});

