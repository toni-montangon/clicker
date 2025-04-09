document.addEventListener("DOMContentLoaded", () => {
  const shopContainer = document.getElementById("shopItems");

  // Affichage de la boutique si sur shop.html
  if (shopContainer) {
    updateShop(shopContainer);
  }
});

function updateShop(container) {
  // Liste complète des multiplicateurs pour les 16 niveaux
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
    { clicks: 10000000, name: "x32768", multiplier: 32768 },
    { clicks: 20000000, name: "x65536", multiplier: 65536 }
  ];

  let currentMultiplier = parseInt(localStorage.getItem("multiplier")) || 1;
  let currentClicks = parseInt(localStorage.getItem("clickCount")) || 0;

  bonuses.forEach(bonus => {
    let unlocked = currentClicks >= bonus.clicks;
    let alreadyBought = currentMultiplier >= bonus.multiplier;

    let div = document.createElement("div");
    div.className = "alert " + (unlocked ? "alert-success" : "alert-secondary");

    div.textContent = `${bonus.name} - Débloqué à ${bonus.clicks} clics`;

    if (alreadyBought) {
      div.textContent += " ✅ (déjà activé)";
    } else if (unlocked) {
      let button = document.createElement("button");
      button.textContent = "Activer";
      button.className = "btn btn-primary btn-sm ms-2";

      button.addEventListener("click", () => {
        localStorage.setItem("multiplier", bonus.multiplier);
        alert(`Bonus ${bonus.name} activé ! Multiplicateur x${bonus.multiplier}`);
        location.reload(); // Recharge la page pour appliquer le bonus
      });

      div.appendChild(button);
    }

    container.appendChild(div);
  });
}