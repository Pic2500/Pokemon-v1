const battleBackgroundImage = new Image();
battleBackgroundImage.src =
  "./Pokemonimages/assets/Maping/Battles/battleBackground.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

function getRandomEnemy() {
  const enemyKeys = Object.keys(monsterEnemy);
  const randomKey = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
  return monsterEnemy[randomKey];
}

let playerPokemon;
let enemyPokemon;
let renderedSprites;
let battleanimationId;
let queue = [];

function initBattle() {
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#enemyHealthBar").style.width = "100%";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();

  playerPokemon = new Monster(monster.Charmander);
  document.querySelector("#playerName").textContent = playerPokemon.name;

  const enemyData = getRandomEnemy();
  enemyPokemon = new Monster(enemyData);
  document.querySelector("#enemyName").textContent = enemyPokemon.name;

  renderedSprites = [playerPokemon, enemyPokemon];
  queue = [];

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

      if (enemyPokemon.health <= 0) {
        queue.push(() => {
          enemyPokemon.faint();
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
  battleBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

animate();
// initBattle();
// animateBattle();

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
