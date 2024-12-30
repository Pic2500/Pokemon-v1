let trainerName = "";
let trainerGrad = "";
let pokemonCount = 0;
const inputs = document.querySelectorAll(".input");

function setTrainerName() {
  trainerName = document.getElementById("trainerName").value;

  const trainerNameText = document.getElementById("trainerNameText");

  if (trainerName) {
    trainerNameText.textContent = "";

    const greetingMessage = `Hello, trainer ${trainerName}`;

    let index = 0;
    const interval = setInterval(() => {
      trainerNameText.textContent += greetingMessage.charAt(index);

      index++;

      if (index === greetingMessage.length) {
        clearInterval(interval);

        document.getElementById("trainerCityInput").style.display = "block";
      }
    }, 20);

    trainerNameText.style.display = "block";
  } else {
    trainerNameText.textContent = "Please write Trainer name!";
    trainerNameText.style.display = "block";
  }
}

function setTrainerGrad() {
  trainerGrad = document.getElementById("trainerGrad").value;

  const trainerGradText = document.getElementById("trainerGradText");

  if (trainerGrad) {
    trainerGradText.textContent = "";

    const cityMessage = `Trainer ${trainerName} comes from ${trainerGrad}!`;

    let index = 0;
    const interval = setInterval(() => {
      trainerGradText.textContent += cityMessage.charAt(index);
      index++;

      if (index === cityMessage.length) {
        clearInterval(interval);

        document.getElementById("pokemonItem1").style.display = "block";
      }
    }, 20);

    trainerGradText.style.display = "block";
  } else {
    trainerGradText.textContent = "Please enter city name!";
    trainerGradText.style.display = "block";
  }
}

const moveTypeMap = {};

async function populateMoveTypeMap() {
  try {
    let moveList = [];
    let url = "https://pokeapi.co/api/v2/move/";

    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      moveList = moveList.concat(data.results);
      url = data.next;
    }

    for (const move of moveList) {
      const moveResponse = await fetch(move.url);
      const moveData = await moveResponse.json();

      const moveType = moveData.type.name;

      if (!moveTypeMap[moveType]) {
        moveTypeMap[moveType] = [];
      }
      moveTypeMap[moveType].push(move.name);
    }
  } catch (error) {
    console.error("Error Not reaching moves: ", error);
  }
}

populateMoveTypeMap();

const typeColorMap = {
  fire: "orange",
  water: "blue",
  electric: "yellow",
  grass: "green",
  bug: "lightgreen",
  psychic: "purple",
  fairy: "pink",
  normal: "lightgray",
  ghost: "purple",
  dragon: "red",
  fighting: "red",
  flying: "lightblue",
  poison: "purple",
  ice: "lightblue",
  rock: "brown",
  steel: "grey",
  dark: "darkpurple",
  ground: "brown",
};

async function fetchData(inputId, imgId, nameId, itemId, movesId) {
  const pokemonName = document
    .getElementById(inputId)
    .value.trim()
    .toLowerCase();

  if (!pokemonName) {
    alert("Please enter Pokemon name!");
    return;
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error("Pokemon not found!");
    }

    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const pokemonTypes = data.types.map((typeInfo) => typeInfo.type.name);
    const pokemonMoves = data.moves.slice(0, 5);

    pokemonCount++;

    if (pokemonCount > 6) {
      alert("You can only select up to 6 Pokémon!");
      return;
    }

    const flexItem = document.getElementById(itemId);
    const type = pokemonTypes[0];

    flexItem.style.backgroundColor = typeColorMap[type] || "white";

    const imgElement = document.getElementById(imgId);
    const nameElement = document.getElementById(nameId);
    const movesElement = document.getElementById(movesId);

    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";
    nameElement.textContent =
      pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    nameElement.style.display = "block";

    movesElement.innerHTML = "";

    for (const [index, move] of pokemonMoves.entries()) {
      const moveElement = document.createElement("div");
      moveElement.classList.add("move");

      const moveType = await getMoveType(move.move.name);
      moveElement.classList.add(moveType);

      moveElement.textContent = `Move ${index + 1}: ${move.move.name}`;
      movesElement.appendChild(moveElement);
    }

    movesElement.style.display = "flex";

    if (pokemonCount < 6) {
      const nextPokemonDiv = document.getElementById(
        `pokemonItem${pokemonCount + 1}`
      );
      if (nextPokemonDiv) {
        nextPokemonDiv.style.display = "block";
      }
    }
  } catch (error) {
    console.error(error);
    alert("Error: " + error.message);
  }
}

async function getMoveType(moveName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
    const data = await response.json();
    return data.type.name;
  } catch (error) {
    console.error("Error fetching move type:", error);
    return "normal";
  }
}

async function getPokemonNames() {
  let selectedPokemon = [];
  for (let i = 0; i < 6; i++) {
    const input = document.getElementById(`pokemonName${i + 1}`);
    const pokemonName = input.value.trim().toLowerCase();
    if (pokemonName) {
      selectedPokemon.push(pokemonName);
    }
  }
  return selectedPokemon;
}

const confirmationDiv = document.getElementById("confirmation");
const finalTeamDiv = document.getElementById("finalTeam");
const confirmButton = document.getElementById("confirm-team-btn");
const flexContainer = document.querySelector(".flex-container");

const pokemonNameInputs = Array.from({ length: 6 }, (_, i) =>
  document.getElementById(`pokemonName${i + 1}`)
);

async function isValidPokemon(name) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    return response.ok;
  } catch (error) {
    console.error("Error checking Pokémon:", error);
    return false;
  }
}

async function getPokemonNames() {
  let selectedPokemon = [];
  for (let i = 0; i < pokemonNameInputs.length; i++) {
    const input = pokemonNameInputs[i];
    if (input) {
      const pokemonName = input.value.trim().toLowerCase();
      if (pokemonName && (await isValidPokemon(pokemonName))) {
        selectedPokemon.push(pokemonName);
      }
    }
  }
  return selectedPokemon;
}

async function updateConfirmation() {
  const selectedPokemon = await getPokemonNames();
  if (selectedPokemon.length === 6) {
    confirmationDiv.classList.remove("hidden");
  } else {
    confirmationDiv.classList.add("hidden");
  }
}

pokemonNameInputs.forEach((input) => {
  if (input) {
    input.addEventListener("input", updateConfirmation);
  }
});

document
  .getElementById("confirm-team-btn")
  .addEventListener("click", async () => {
    const trainerName = document.getElementById("trainerName").value;
    const trainerGrad = document.getElementById("trainerGrad").value;
    const selectedPokemon = await getPokemonNames();

    for (let i = 1; i <= 6; i++) {
      const pokemonItemDiv = document.getElementById(`pokemonItem${i}`);
      if (pokemonItemDiv) {
        pokemonItemDiv.style.display = "none";
      }
    }

    const confirmationDiv = document.getElementById("confirmation");
    confirmationDiv.classList.add("hidden");

    const coachDiv = document.querySelector(".Coach");
    if (coachDiv) {
      coachDiv.style.display = "none";
    }

    const title = document.querySelector("h1");
    if (title) {
      title.textContent = "Your Adventure Begins!";
    }

    const finalTeamDiv = document.getElementById("finalTeam");
    finalTeamDiv.classList.remove("hidden");
    finalTeamDiv.innerHTML = `
    <h2>Trainer ${trainerName}, this is your Pokémon team!</h2>
    
  `;

    for (const pokemon of selectedPokemon) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const data = await response.json();
      const spriteURL = data.sprites.other["official-artwork"].front_default;

      finalTeamDiv.innerHTML += `
      <div style="display: inline-block; text-align: center; margin: 10px;">
        <img src="${spriteURL}" alt="${pokemon}" style="width: 100px; height: 100px;">
        <p>${pokemon}</p>
      </div>
    `;
    }

    title.insertAdjacentElement("afterend", finalTeamDiv);

    const customizerDiv = document.getElementById("customizer");
    if (customizerDiv) {
      console.log("Revealing customizer.");
      customizerDiv.classList.remove("hidden");
      customizerDiv.style.display = "block";
    } else {
      console.log("Customizer div not found.");
    }
    finalTeam.insertAdjacentElement("afterend", customizer);
  });

document.addEventListener("DOMContentLoaded", () => {
  const trainerIcon = document.getElementById("trainer-icon");
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");
  const selectTrainerButton = document.getElementById("select-trainer");
  const title = document.querySelector("h1");
  const finalTeamDiv = document.getElementById("finalTeam");
  const confirmationDiv = document.getElementById("confirmation");
  const customizerDiv = document.getElementById("customizer");
  let currentTrainer = 0;

  const trainers = [
    "Pokemonimages/assets/trainers/trainer1.png",
    "Pokemonimages/assets/trainers/trainer2.png",
    "Pokemonimages/assets/trainers/trainer3.png",
    "Pokemonimages/assets/trainers/trainer4.png",
    "Pokemonimages/assets/trainers/trainer5.png",
    "Pokemonimages/assets/trainers/trainer6.png",
    "Pokemonimages/assets/trainers/trainer7.png",
    "Pokemonimages/assets/trainers/trainer8.png",
    "Pokemonimages/assets/trainers/trainer9.png",
    "Pokemonimages/assets/trainers/trainer10.png",
    "Pokemonimages/assets/trainers/trainer11.png",
    "Pokemonimages/assets/trainers/trainer12.png",
    "Pokemonimages/assets/trainers/trainer13.png",
  ];

  trainerIcon.src = trainers[currentTrainer];

  function updateArrowState() {
    leftArrow.disabled = currentTrainer === 0;
    rightArrow.disabled = currentTrainer === trainers.length - 1;
  }

  leftArrow.addEventListener("click", () => {
    if (currentTrainer > 0) {
      currentTrainer--;
      trainerIcon.src = trainers[currentTrainer];
      updateArrowState();
    }
  });

  rightArrow.addEventListener("click", () => {
    if (currentTrainer < trainers.length - 1) {
      currentTrainer++;
      trainerIcon.src = trainers[currentTrainer];
      updateArrowState();
    }
  });

  updateArrowState();

  selectTrainerButton.addEventListener("click", () => {
    const selectedTrainerImage = trainers[currentTrainer];

    trainerIcon.src = selectedTrainerImage;

    finalTeamDiv.style.display = "none";
    confirmationDiv.classList.add("hidden");
    customizerDiv.style.display = "none";

    title.textContent = "Beginning";

    const topRightCornerContainer = document.createElement("div");
    topRightCornerContainer.style.position = "absolute";
    topRightCornerContainer.style.top = "20px";
    topRightCornerContainer.style.right = "20px";
    topRightCornerContainer.style.display = "flex";
    topRightCornerContainer.style.flexDirection = "column";
    topRightCornerContainer.style.gap = "10px";

    const trainerDiv = document.createElement("div");
    trainerDiv.style.display = "flex";
    trainerDiv.style.justifyContent = "center";
    const trainerImageElement = document.createElement("img");
    trainerImageElement.src = selectedTrainerImage;
    trainerImageElement.alt = "Selected Trainer";
    trainerImageElement.style.width = "100px";
    trainerImageElement.style.height = "100px";
    trainerDiv.appendChild(trainerImageElement);

    const pokemonDiv = document.createElement("div");
    pokemonDiv.style.display = "flex";
    pokemonDiv.style.flexDirection = "column";
    pokemonDiv.style.gap = "10px";

    const pokemonImages = Array.from(finalTeamDiv.querySelectorAll("img")).map(
      (img) => img.src
    );

    if (pokemonImages.length === 6) {
      const row1 = document.createElement("div");
      row1.style.display = "flex";
      row1.style.justifyContent = "space-between";
      const row2 = document.createElement("div");
      row2.style.display = "flex";
      row2.style.justifyContent = "space-between";

      for (let i = 0; i < 3; i++) {
        const pokemonImageElement = document.createElement("img");
        pokemonImageElement.src = pokemonImages[i];
        pokemonImageElement.alt = "Pokemon";
        pokemonImageElement.style.width = "50px";
        pokemonImageElement.style.height = "50px";
        row1.appendChild(pokemonImageElement);
      }

      for (let i = 3; i < 6; i++) {
        const pokemonImageElement = document.createElement("img");
        pokemonImageElement.src = pokemonImages[i];
        pokemonImageElement.alt = "Pokemon";
        pokemonImageElement.style.width = "50px";
        pokemonImageElement.style.height = "50px";
        row2.appendChild(pokemonImageElement);
      }

      pokemonDiv.appendChild(row1);
      pokemonDiv.appendChild(row2);
    }

    topRightCornerContainer.appendChild(trainerDiv);
    topRightCornerContainer.appendChild(pokemonDiv);

    document.body.appendChild(topRightCornerContainer);
  });
});
