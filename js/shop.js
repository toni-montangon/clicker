document.addEventListener("DOMContentLoaded", () => {
  const multiplicatorList = document.getElementById("multiplicatorList");

  // Liste complète des multiplicateurs pour les 15 niveaux (exclut le premier par défaut)
  let bonuses = [
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
    { clicks: 10000000, name: "x32768", multiplier: 32768 }
  ];

  // Liste des voitures associées aux multiplicateurs (exclut la première voiture par défaut)
  let carImages = [
    { image: "assets/niv2-fiesta.webp", multiplier: 2 },
    { image: "assets/niv3-205gti.webp", multiplier: 4 },
    { image: "assets/niv4-e46.webp", multiplier: 8 },
    { image: "assets/niv5-w204.webp", multiplier: 16 },
    { image: "assets/niv6-e60.webp", multiplier: 32 },
    { image: "assets/niv7-golf7.webp", multiplier: 64 },
    { image: "assets/niv8-cla.webp", multiplier: 128 },
    { image: "assets/niv9-mustang.webp", multiplier: 256 },
    { image: "assets/niv10-f90.webp", multiplier: 512 },
    { image: "assets/niv11-a7.webp", multiplier: 1024 },
    { image: "assets/niv12-m4.webp", multiplier: 2048 },
    { image: "assets/niv13-ftype.webp", multiplier: 4096 },
    { image: "assets/niv14-rs6.webp", multiplier: 8192 },
    { image: "assets/niv15-amggt.webp", multiplier: 16384 },
    { image: "assets/niv16-r8.webp", multiplier: 32768 }
  ];

  let currentMultiplier = parseInt(localStorage.getItem("multiplier")) || 1;
  let currentClicks = parseInt(localStorage.getItem("clickCount")) || 0;

  // Affiche les multiplicateurs sous forme de cartes
  bonuses.forEach(bonus => {
    let card = document.createElement("div");
    card.className = "card m-2";
    card.style.width = "150px";

    let cardBody = document.createElement("div");
    cardBody.className = "card-body text-center";

    // Trouve l'image de la voiture correspondant au multiplicateur
    let car = carImages.find(car => car.multiplier === bonus.multiplier);

    let icon = document.createElement("img");
    icon.src = car ? car.image : "assets/default-car.png"; // Utilise une image par défaut si aucune voiture n'est trouvée
    icon.alt = bonus.name;
    icon.className = "mb-2";

    let title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = bonus.name;

    let description = document.createElement("p");
    description.className = "card-text";
    description.textContent = `Débloqué à ${bonus.clicks} clics`;

    let button = document.createElement("button");
    button.className = "btn btn-primary btn-sm";
    button.textContent = "Acheter";
    button.disabled = currentClicks < bonus.clicks || currentMultiplier >= bonus.multiplier;

    button.addEventListener("click", () => {
      if (currentClicks >= bonus.clicks) {
        localStorage.setItem("multiplier", bonus.multiplier);
        alert(`Multiplicateur ${bonus.name} activé !`);
        location.reload(); // Recharge la page pour appliquer le bonus
      } else {
        alert("Vous n'avez pas assez de clics pour acheter ce multiplicateur.");
      }
    });

    cardBody.appendChild(icon);
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(button);
    card.appendChild(cardBody);
    multiplicatorList.appendChild(card);
  });
});