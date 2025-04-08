document.addEventListener("DOMContentLoaded", () => {
  const shopContainer = document.getElementById("shopItems");

  // Affichage de la boutique si sur shop.html
  if (shopContainer) {
    updateShop(shopContainer);
  }
});

function updateShop(container) {
  let bonuses = [
    { clicks: 50, name: "x2 Multiclique", multiplier: 2 },
    { clicks: 200, name: "x4 Turbo Clic", multiplier: 4 },
    { clicks: 500, name: "x8 Hyperdrive", multiplier: 8 }
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
      button.disabled = alreadyBought;

      button.addEventListener("click", () => {
        localStorage.setItem("multiplier", bonus.multiplier);
        button.disabled = true;
        div.textContent = `${bonus.name} - Débloqué à ${bonus.clicks} clics ✅ (activé)`;
      });

      div.appendChild(button);
    }

    container.appendChild(div);
  });
}