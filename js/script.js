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

// Liste des voitures associées aux bonus
const carImages = [
  { image: "assets/niv1-golf.webp", requiredMultiplier: 1 },
  { image: "assets/niv2-fiesta.webp", requiredMultiplier: 2 },
  { image: "assets/niv3-205gti.webp", requiredMultiplier: 4 },
  { image: "assets/niv4-e46.webp", requiredMultiplier: 8 },
  { image: "assets/niv5-w204.webp", requiredMultiplier: 16 },
  { image: "assets/niv6-e60.webp", requiredMultiplier: 32 },
  { image: "assets/niv7-golf7.webp", requiredMultiplier: 64 },
  { image: "assets/niv8-cla.webp", requiredMultiplier: 128 },
  { image: "assets/niv9-mustang.webp", requiredMultiplier: 256 },
  { image: "assets/niv10-f90.webp", requiredMultiplier: 512 },
  { image: "assets/niv11-a7.webp", requiredMultiplier: 1024 },
  { image: "assets/niv12-m4.webp", requiredMultiplier: 2048 },
  { image: "assets/niv13-ftype.webp", requiredMultiplier: 4096 },
  { image: "assets/niv14-rs6.webp", requiredMultiplier: 8192 },
  { image: "assets/niv15-amggt.webp", requiredMultiplier: 16384 },
  { image: "assets/niv16-r8.webp", requiredMultiplier: 32768 }
];

// Fonction pour mettre à jour l'image de la voiture après l'achat d'un multiplicateur
function updateCarImage() {
  // Trouve la voiture correspondant exactement au multiplicateur actuel
  const car = carImages.find(car => car.requiredMultiplier === multiplier);

  // Si une voiture correspond, met à jour l'image
  if (car) {
    carImage.src = car.image;
  } else {
    console.error("Aucune voiture trouvée pour le multiplicateur :", multiplier);
  }
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

  // Ajoutez une variable pour suivre le nombre de clics rapides
  let clickSpeedTimeout;
  let clickCountInInterval = 0;

  // Initialisation
  if (clickCounter && carImage) {
    clickCounter.textContent = clickCount;
    updateCarImage();
    updateProgressBar();

    // Ajoute un événement de clic sur l'image de la voiture
    carImage.addEventListener('click', () => {
      clickCount += multiplier; // Ajoute les clics en fonction du multiplicateur
      localStorage.setItem("clickCount", clickCount); // Stocke le nombre de clics dans le localStorage
      clickCountElement.textContent = clickCount;

      // Ajoute l'animation à la voiture
      carImage.classList.add('car-moving');

      // Retire l'animation après 0.5s (durée de l'animation)
      setTimeout(() => {
        carImage.classList.remove('car-moving');
      }, 500);

      // Gestion de l'effet de vitesse
      clickCountInInterval++;
      if (clickSpeedTimeout) clearTimeout(clickSpeedTimeout);

      if (clickCountInInterval >= 10) { // Si l'utilisateur clique rapidement 10 fois ou plus
        const speedEffect = document.getElementById('speedEffect');
        speedEffect.style.display = 'block'; // Affiche le GIF
        setTimeout(() => {
          speedEffect.style.display = 'none'; // Cache le GIF après 1 seconde
        }, 1000);
      }

      // Réinitialise le compteur après 1 seconde d'inactivité
      clickSpeedTimeout = setTimeout(() => {
        clickCountInInterval = 0;
      }, 1000);

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

