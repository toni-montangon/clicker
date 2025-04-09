document.addEventListener("DOMContentLoaded", () => {
  const shopContainer = document.getElementById("shopItems");

  // Affichage de la boutique si sur shop.html
  if (shopContainer) {
    updateShop(shopContainer);
  }
});

function updateShop(container) {
  let bonuses = [
    { clicks: 50, name: "x2", multiplier: 2 },
    { clicks: 200, name: "x4", multiplier: 4 },
    { clicks: 500, name: "x8", multiplier: 8 },
    { clicks: 1500, name: "x16", multiplier: 16 },
    { clicks: 5000, name: "x32", multiplier: 32 }
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