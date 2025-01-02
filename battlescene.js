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

const draggle = new Monster(monster.Draggle);

const emby = new Monster(monster.Emby);

const renderedSprites = [draggle, emby];

emby.attacks.forEach((attack) => {
  const button = document.createElement("button");
  button.innerHTML = attack.name;
  document.querySelector("#attacksBox").append(button);
});

function animateBattle() {
  window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}
//animate();
animateBattle();

const queue = [];
//event listeners za napade
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML];
    emby.attack({
      attack: selectedAttack,
      recipient: draggle,
      renderedSprites,
    });
    const radnomAttack =
      draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)];

    queue.push(() => {
      draggle.attack({
        attack: radnomAttack,
        recipient: emby,
        renderedSprites,
      });
    });
  });
});

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});