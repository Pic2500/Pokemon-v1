let playerPokemon;

function loadPlayerPokemon() {
  const storedPlayerPokemon = localStorage.getItem("playerPokemon");
  const storedXP = localStorage.getItem("playerXP");

  if (storedPlayerPokemon) {
    const parsedData = JSON.parse(storedPlayerPokemon);
    playerPokemon = new Monster(parsedData);

    // Check if there's stored XP and apply it to the playerPokemon
    if (storedXP) {
      playerPokemon.experience = parseInt(storedXP); // Set the stored XP
    }
    return true;
  }

  return false;
}

function initGame() {
  if (loadPlayerPokemon()) {
    askToContinue();
  } else {
    createStarterSelection();
  }
}

function askToContinue() {
  if (document.getElementById("confirmationDiv")) {
    console.log("It already exists.");
    return;
  }

  const confirmationDiv = document.createElement("div");
  confirmationDiv.id = "confirmationDiv";
  confirmationDiv.style.position = "absolute";
  confirmationDiv.style.top = "50%";
  confirmationDiv.style.left = "50%";
  confirmationDiv.style.transform = "translate(-50%, -50%)";
  confirmationDiv.style.backgroundColor = "#fff";
  confirmationDiv.style.padding = "20px";
  confirmationDiv.style.border = "2px solid #000";
  confirmationDiv.style.display = "flex";
  confirmationDiv.style.flexDirection = "column";
  confirmationDiv.style.alignItems = "center";
  confirmationDiv.style.zIndex = "1000";

  const message = document.createElement("p");
  message.innerText =
    "A Pokémon was previously selected. Do you want to continue with it or start a new game?";
  message.style.marginBottom = "20px";
  confirmationDiv.appendChild(message);

  const continueButton = document.createElement("button");
  continueButton.innerText = "Continue with Previous Pokémon";
  continueButton.style.marginBottom = "10px";
  continueButton.addEventListener("click", () => {
    const parsedData = JSON.parse(localStorage.getItem("playerPokemon"));
    playerPokemon = new Monster(parsedData);
    console.log("Continuing with:", playerPokemon.name);
    confirmationDiv.remove();
    animate();
  });

  const newGameButton = document.createElement("button");
  newGameButton.innerText = "Start a New Game";
  newGameButton.addEventListener("click", () => {
    console.log("New Game Button Clicked");
    localStorage.removeItem("playerPokemon");

    playerPokemon = null;

    confirmationDiv.remove();
    createStarterSelection(); // Allow the user to choose a new starter Pokémon
  });

  confirmationDiv.appendChild(continueButton);
  confirmationDiv.appendChild(newGameButton);
  document.body.appendChild(confirmationDiv);
}

// Create a selection screen for the player to choose a starter Pokémon
function createStarterSelection() {
  if (playerPokemon) {
    console.log("Game was played before, continue or start new game.");
    return;
  }

  const starterDiv = document.createElement("div");
  starterDiv.id = "starterSelection";
  starterDiv.style.position = "absolute";
  starterDiv.style.top = "50%";
  starterDiv.style.left = "50%";
  starterDiv.style.transform = "translate(-50%, -50%)";
  starterDiv.style.backgroundColor = "#fff";
  starterDiv.style.padding = "15px";
  starterDiv.style.border = "2px solid #000";
  starterDiv.style.display = "flex";
  starterDiv.style.flexDirection = "column";
  starterDiv.style.alignItems = "center";
  starterDiv.style.zIndex = "10"; // Ensure it's above other content (like the canvas)

  // Title
  const title = document.createElement("h2");
  title.innerText = "Select your starter Pokémon";
  title.style.marginBottom = "20px";
  starterDiv.appendChild(title);

  // Container for the Pokémon options
  const startersContainer = document.createElement("div");
  startersContainer.style.display = "flex";
  startersContainer.style.flexWrap = "wrap";
  startersContainer.style.gap = "15px";
  startersContainer.style.justifyContent = "center";
  startersContainer.style.alignItems = "center";
  starterDiv.appendChild(startersContainer);

  // Loop through each Pokémon and create a div for selection
  Object.keys(playermonster).forEach((key) => {
    const pokemon = playermonster[key];

    // Container for each Pokémon
    const pokemonContainer = document.createElement("div");
    pokemonContainer.style.display = "flex";
    pokemonContainer.style.flexDirection = "column";
    pokemonContainer.style.alignItems = "center";
    pokemonContainer.style.cursor = "pointer";
    pokemonContainer.style.padding = "10px";
    pokemonContainer.style.border = "1px solid #000";
    pokemonContainer.style.borderRadius = "5px";
    pokemonContainer.style.transition = "transform 0.2s";
    pokemonContainer.style.width = "120px"; // Set a fixed width for each Pokémon container
    pokemonContainer.style.height = "150px"; // Set a fixed height for each Pokémon container
    pokemonContainer.style.justifyContent = "center"; // Center Pokémon name and image
    pokemonContainer.style.textAlign = "center"; // Center text inside the container

    pokemonContainer.onmouseover = () => {
      pokemonContainer.style.transform = "scale(1.1)";
    };
    pokemonContainer.onmouseout = () => {
      pokemonContainer.style.transform = "scale(1)";
    };

    // Image for Pokémon
    const image = document.createElement("img");
    if (pokemon.frontImage) {
      image.src = pokemon.frontImage;
    } else {
      console.error(`Front image not defined for ${pokemon.name}`);
    }

    image.alt = pokemon.name;
    image.style.width = "80px"; // Set a fixed width for the Pokémon image
    image.style.height = "80px"; // Set a fixed height for the Pokémon image
    image.style.objectFit = "contain"; // Ensure the image scales properly inside the div
    pokemonContainer.appendChild(image);

    // Pokémon name
    const name = document.createElement("p");
    name.innerText = pokemon.name;
    name.style.marginTop = "10px";
    name.style.fontWeight = "bold";
    name.style.fontSize = "14px"; // Optionally set a font size for the name
    pokemonContainer.appendChild(name);

    pokemonContainer.addEventListener("click", () => {
      selectStarter(pokemon);
    });

    startersContainer.appendChild(pokemonContainer);
  });

  document.body.appendChild(starterDiv);
}

function selectStarter(selectedPokemon) {
  alert(`You selected ${selectedPokemon.name} as your starter!`);
  const starterDiv = document.getElementById("starterSelection");
  if (starterDiv) starterDiv.remove();

  playerPokemon = new Monster(selectedPokemon);

  console.log("Selected Pokémon:", selectedPokemon.name);

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("detailsDiv");

  detailsDiv.id = "pokemonDetails";
  detailsDiv.style.position = "absolute";
  detailsDiv.style.top = "15%";
  detailsDiv.style.left = "calc(85% )"; // Positioning to the right of the canvas
  detailsDiv.style.transform = "translateY(-50%)";
  detailsDiv.style.width = "150px";
  detailsDiv.style.padding = "10px";
  detailsDiv.style.border = "2px solid #000";
  detailsDiv.style.backgroundColor = "#fff";
  detailsDiv.style.display = "flex";
  detailsDiv.style.flexDirection = "column";
  detailsDiv.style.alignItems = "center";
  document.body.appendChild(detailsDiv);

  // Pokémon image
  const image = document.createElement("img");
  image.src = selectedPokemon.frontImage; // Assuming the Pokemon has frontImage property
  image.alt = selectedPokemon.name;
  image.style.width = "100px";
  image.style.height = "100px";
  detailsDiv.appendChild(image);

  // Pokémon name
  const pokemonStats = document.createElement("div");
  pokemonStats.classList.add("pokemon-stats");

  const nameElement = document.createElement("div");
  nameElement.classList.add("pokemon-name");
  nameElement.innerText = selectedPokemon.name;
  pokemonStats.appendChild(nameElement);

  const statsElement = document.createElement("div");
  statsElement.classList.add("pokemon-stats-details");
  statsElement.innerText =
    "LVL: " +
    selectedPokemon.level +
    " HP: " +
    selectedPokemon.health +
    "/" +
    selectedPokemon.maxHealth;
  pokemonStats.appendChild(statsElement);

  detailsDiv.appendChild(pokemonStats);

  function updatePokemonStats() {
    pokemonStats.innerText = `Level: ${selectedPokemon.level}`;
    pokemonStats.innerText = `HP: ${selectedPokemon.hp}/${selectedPokemon.maxHp}`;
  }

  // Example: Update when Pokémon levels up or HP changes
  selectedPokemon.onLevelUp = () => {
    updatePokemonStats();
  };

  selectedPokemon.onHPChange = () => {
    updatePokemonStats();
  };

  animate();
}

window.onload = initGame;

const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

const charactersMap = [];
for (let i = 0; i < charactersMapData.length; i += 70) {
  charactersMap.push(charactersMapData.slice(i, 70 + i));
}

const boundaries = [];
const offset = {
  x: -450,
  y: -320,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const battleZones = [];

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const characters = [];
const villagerImg = new Image();
const oldManImg = new Image();
villagerImg.src = "./Pokemonimages/assets/Maping/Characters/Villager/Idle.png";
oldManImg.src = "/Pokemonimages/assets/Maping/Characters/OldMan/oldMan.png";

charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    // 1029 = villager
    if (symbol === 1029) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: villagerImg,
          frames: {
            max: 4,
            hold: 60,
          },
          scale: 3,
          animate: true,
          dialogue: ["...", "You can use boat to get to new island"],
        })
      );
    }
    // 1034 = OldMan
    else if (symbol === 1034) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: oldManImg,
          frames: {
            max: 4,
            hold: 60,
          },
          scale: 3,
          dialogue: ["...", "Hey , there are pokemons in tall grass!"],
        })
      );
    }
    if (symbol !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});

const image = new Image();
image.src = "./Pokemonimages/assets/Maping/PokemonStyleMap.png";

const foregroundImage = new Image();
foregroundImage.src = "./Pokemonimages/assets/Maping/foregroundObjects.png";

const playerDownImage = new Image();
playerDownImage.src = "./Pokemonimages/assets/Maping/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./Pokemonimages/assets/Maping/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./Pokemonimages/assets/Maping/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./Pokemonimages/assets/Maping/playerRight.png";

image.onload = () => {
  c.drawImage(image, -450, -300);
  c.drawImage(
    playerDownImage,
    0,
    0,
    playerDownImage.width / 4,
    playerDownImage.height,
    canvas.width / 2 - playerDownImage.width / 4 / 2,
    canvas.height / 2 - playerDownImage.height / 2,
    playerDownImage.width / 4,
    playerDownImage.height
  );
};

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10,
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const movables = [
  background,
  ...boundaries,
  foreground,
  ...battleZones,
  ...characters,
];
const renderables = [
  background,
  ...boundaries,
  ...battleZones,
  ...characters,
  player,
  foreground,
];

const battle = {
  initiated: false,
};

function animate() {
  const animationId = window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  renderables.forEach((renderable) => {
    renderable.draw();
  });

  let moving = true;
  player.animate = false;

  if (battle.initiated) return;
  // activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));
      if (
        rectangularCollison({
          rectangle1: player,
          rectangle2: battleZone,
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01
      ) {
        // deactivate current animation loop

        window.cancelAnimationFrame(animationId);

        audio.Map.stop();
        audio.initBattle.play();
        audio.battle.play();

        battle.initiated = true;
        gsap.to("#overlappingDiv", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // activate a new animation loop
                initBattle();
                animateBattle();
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                  duration: 0.4,
                });
              },
            });
          },
        });
        break;
      }
    }
  }

  if (keys.w.pressed && lastKey === "w") {
    player.animate = true;
    player.image = player.sprites.up;

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: 3 },
    });

    for (let i = 0; i < boundaries.length; i++) {
      const Boundary = boundaries[i];
      if (
        rectangularCollison({
          rectangle1: player,
          rectangle2: {
            ...Boundary,
            position: {
              x: Boundary.position.x,
              y: Boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.a.pressed && lastKey === "a") {
    player.animate = true;
    player.image = player.sprites.left;

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 3, y: 0 },
    });

    for (let i = 0; i < boundaries.length; i++) {
      const Boundary = boundaries[i];
      if (
        rectangularCollison({
          rectangle1: player,
          rectangle2: {
            ...Boundary,
            position: {
              x: Boundary.position.x + 3,
              y: Boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.s.pressed && lastKey === "s") {
    player.animate = true;
    player.image = player.sprites.down;

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -3 },
    });

    for (let i = 0; i < boundaries.length; i++) {
      const Boundary = boundaries[i];
      if (
        rectangularCollison({
          rectangle1: player,
          rectangle2: {
            ...Boundary,
            position: {
              x: Boundary.position.x,
              y: Boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  } else if (keys.d.pressed && lastKey === "d") {
    player.animate = true;
    player.image = player.sprites.right;

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -3, y: 0 },
    });

    for (let i = 0; i < boundaries.length; i++) {
      const Boundary = boundaries[i];
      if (
        rectangularCollison({
          rectangle1: player,
          rectangle2: {
            ...Boundary,
            position: {
              x: Boundary.position.x - 3,
              y: Boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}
//animate();

let lastKey = "";
window.addEventListener("keydown", (e) => {
  if (player.isinteracting) {
    switch (e.key) {
      case " ":
        player.interactionAsset.dialogueIndex++;

        const { dialogueIndex, dialogue } = player.interactionAsset;
        if (dialogueIndex <= dialogue.length - 1) {
          document.querySelector("#characterDialougueBox").innerHTML =
            player.interactionAsset.dialogue[dialogueIndex];
          return;
        }

        //finish conversation
        player.isinteracting = false;
        player.interactionAsset.dialogueIndex = 0;
        document.querySelector("#characterDialougueBox").style.display = "none";
        break;
    }

    return;
  }
  switch (e.key) {
    case " ":
      if (!player.interactionAsset) return;

      //begining the conversation
      const firstMessage = player.interactionAsset.dialogue[0];

      document.querySelector("#characterDialougueBox").innerHTML = firstMessage;
      document.querySelector("#characterDialougueBox").style.display = "flex";
      player.isinteracting = true;
      break;

    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
let clicked = false;
function playAudio() {
  if (!clicked) {
    audio.Map.play();
    clicked = true;
  }
}

addEventListener("click", playAudio);

addEventListener("keydown", (e) => {
  if (["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
    playAudio();
  }
});
