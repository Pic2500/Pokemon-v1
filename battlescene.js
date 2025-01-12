const battleBackgroundImage = new Image();
battleBackgroundImage.src =
  "./Pokemonimages/assets/Maping/Battles/battleBackground.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
  animte: false,
});

battleBackgroundImage.onload = () => {
  console.log("Battle background image loaded.");
  //animateBattle(); // Start the battle animation after the background image is loaded
};

const storedPlayerPokemon = JSON.parse(localStorage.getItem("playerPokemon"));

if (storedPlayerPokemon) {
  playerPokemon = new Monster(storedPlayerPokemon);
  playerPokemon.health = playerPokemon.maxHealth || playerPokemon.maxHealth;
} else {
  console.error(
    "No player Pokémon found in localStorage. Please select a starter Pokémon first."
  );
}

function resetPlayerPosition() {
  gsap.killTweensOf(playerPokemon.position);
  playerPokemon.position.x = 280;
  playerPokemon.position.y = 350;
}

function getRandomEnemy() {
  const enemyKeys = Object.keys(monsterEnemy);
  const randomKey = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
  const enemyData = monsterEnemy[randomKey];
  const enemy = new Monster(enemyData);
  enemy.health = enemy.maxHealth;
  return enemy;
}

function updateHealthBar(pokemon, healthBarSelector) {
  const healthPercentage = (pokemon.health / pokemon.maxHealth) * 100;
  const clampedPercentage = Math.max(0, Math.min(100, healthPercentage));

  const healthBar = document.querySelector(healthBarSelector);

  if (healthBar) {
    healthBar.style.width = `${clampedPercentage}%`;
  }

  const healthDisplay = document.querySelector(
    healthBarSelector === "#playerHealthBar"
      ? "#playerHealthDisplay"
      : "#enemyHealthDisplay"
  );

  if (healthDisplay) {
    healthDisplay.textContent = `HP: ${pokemon.health}/${pokemon.maxHealth}`;
  }
  console.log(
    `${pokemon.name} Health: ${pokemon.health}/${
      pokemon.maxHealth
    } (${clampedPercentage.toFixed(2)}%)`
  );
}

let enemyPokemon;
let renderedSprites;
let battleanimationId;
let queue = [];

function initBattle() {
  resetPlayerPosition();

  document.querySelector("#playerName").textContent = playerPokemon.name;
  document.querySelector(
    "#playerLevel"
  ).textContent = `LVL: ${playerPokemon.level}`;

  const enemyData = getRandomEnemy();
  enemyPokemon = new Monster(enemyData);
  document.querySelector("#enemyName").textContent = enemyPokemon.name;
  document.querySelector(
    "#enemyLevel"
  ).textContent = `LVL: ${enemyPokemon.level}`;
  enemyPokemon.health = enemyPokemon.maxHealth;

  renderedSprites = [playerPokemon, enemyPokemon];
  queue = [];

  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#enemyHealthBar").style.width = "100%";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();
  document.querySelector(
    "#playerHealthDisplay"
  ).textContent = `HP: ${playerPokemon.health}/${playerPokemon.maxHealth}`;
  document.querySelector(
    "#enemyHealthDisplay"
  ).textContent = `HP: ${enemyPokemon.health}/${enemyPokemon.maxHealth}`;

  updateHealthBar(playerPokemon, "#playerHealthBar");
  updateHealthBar(enemyPokemon, "#enemyHealthBar");

  playerPokemon.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector("#attacksBox").append(button);
  });
  //event listeners za napade
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      playerPokemon.attack({
        attack: selectedAttack,
        recipient: enemyPokemon,
        renderedSprites,
      });

      updateHealthBar(playerPokemon, "#playerHealthBar");
      updateHealthBar(enemyPokemon, "#enemyHealthBar");

      document.querySelector(
        "#playerHealthDisplay"
      ).textContent = `HP: ${playerPokemon.health}/${playerPokemon.maxHealth}`;
      document.querySelector(
        "#enemyHealthDisplay"
      ).textContent = `HP: ${enemyPokemon.health}/${enemyPokemon.maxHealth}`;

      if (enemyPokemon.health <= 0) {
        queue.push(() => {
          enemyPokemon.faint();
        });
        queue.push(() => {
          //fade back to black
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              const playerData = JSON.parse(
                localStorage.getItem("playerPokemon")
              );
              if (playerData) {
                playerData.health = playerPokemon.health;
                localStorage.setItem(
                  "playerPokemon",
                  JSON.stringify(playerData)
                );
              }
              cancelAnimationFrame(battleanimationId);
              animate();
              document.querySelector("#userInterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });
              battle.initiated = false;

              audio.Map.play();
            },
          });
        });
      }

      const radnomAttack =
        enemyPokemon.attacks[
          Math.floor(Math.random() * enemyPokemon.attacks.length)
        ];

      queue.push(() => {
        enemyPokemon.attack({
          attack: radnomAttack,
          recipient: playerPokemon,
          renderedSprites,
        });

        updateHealthBar(playerPokemon, "#playerHealthBar");
        updateHealthBar(enemyPokemon, "#enemyHealthBar");

        document.querySelector(
          "#playerHealthDisplay"
        ).textContent = `HP: ${playerPokemon.health}/${playerPokemon.maxHealth}`;
        document.querySelector(
          "#enemyHealthDisplay"
        ).textContent = `HP: ${enemyPokemon.health}/${enemyPokemon.maxHealth}`;

        if (playerPokemon.health <= 0) {
          queue.push(() => {
            playerPokemon.faint();
          });
          queue.push(() => {
            //fade back to black
            gsap.to("#overlappingDiv", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleanimationId);
                animate();
                document.querySelector("#userInterface").style.display = "none";

                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });
                battle.initiated = false;

                audio.Map.play();
              },
            });
          });
        }
      });
    });

    button.addEventListener("mouseenter", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = selectedAttack.type;
      document.querySelector("#attackType").style.color = selectedAttack.color;
    });
  });
}

function animateBattle() {
  battleanimationId = window.requestAnimationFrame(animateBattle);

  c.clearRect(0, 0, canvas.width, canvas.height);

  battleBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}
console.log(playerPokemon);

// initBattle();
// animateBattle();

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
