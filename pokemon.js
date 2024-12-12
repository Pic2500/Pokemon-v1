let trainerName = "";
let trainerGrad = "";
let pokemonCount = 0;
const inputs = document.querySelectorAll(".input");

function setTrainerName() {
  trainerName = document.getElementById("trainerName").value;

  const trainerNameText = document.getElementById("trainerNameText");

  if (trainerName) {
    trainerNameText.textContent = "";

    const greetingMessage = `Pozdrav, treneru ${trainerName}`;

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
    trainerNameText.textContent = "Molimo unesite ime Trenera!";
    trainerNameText.style.display = "block";
  }
}

function setTrainerGrad() {
  trainerGrad = document.getElementById("trainerGrad").value;

  const trainerGradText = document.getElementById("trainerGradText");

  if (trainerGrad) {
    trainerGradText.textContent = "";

    const cityMessage = `Trener ${trainerName} dolazi iz grada ${trainerGrad}!`;

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
    trainerGradText.textContent = "Molimo unesite ime Grada!";
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
    console.error("Error Dohvacanjem podataka poteza: ", error);
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
    alert("Molimo unesite ime Pokemona!");
    return;
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error("Pokemon nije pronađen!");
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
    alert("Došlo je do greške: " + error.message);
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

const coachDiv = document.querySelector(".Coach");

// Define your trainer images
const trainers = [
  "trainer1.png", // 1. lik
  "trainer2.png", // 2. lik
  "trainer3.png", // 3. lik
  "trainer4.png", // 4. lik
];

let currentTrainerIndex = 0;

function changeTrainer(direction) {
  // Adjust trainer index
  currentTrainerIndex += direction;

  // Ensure index is within range
  if (currentTrainerIndex < 0) {
    currentTrainerIndex = trainers.length - 1;
  } else if (currentTrainerIndex >= trainers.length) {
    currentTrainerIndex = 0;
  }

  // Change trainer icon
  const trainerIcon = document.getElementById("trainer-icon");
  trainerIcon.src = `assets/trainers/${trainers[currentTrainerIndex]}`;
}

// Your existing functions like setTrainerName(), setTrainerGrad(), etc.

document
  .getElementById("confirm-team-btn")
  .addEventListener("click", async () => {
    const trainerName = document.getElementById("trainerName").value;
    const trainerGrad = document.getElementById("trainerGrad").value;
    const selectedPokemon = await getPokemonNames();

    // Hide the Pokémon input section
    for (let i = 1; i <= 6; i++) {
      const pokemonItemDiv = document.getElementById(`pokemonItem${i}`);
      if (pokemonItemDiv) {
        pokemonItemDiv.style.display = "none";
      }
    }

    // Hide the confirmation div
    const confirmationDiv = document.getElementById("confirmation");
    confirmationDiv.classList.add("hidden");

    // Update the page title
    const title = document.querySelector("h1");
    if (title) {
      title.textContent = "Odabir Avanture";
    }

    // Show the final team section
    const finalTeamDiv = document.getElementById("finalTeam");
    finalTeamDiv.classList.remove("hidden");
    finalTeamDiv.innerHTML = `  
    <h2>Trainer ${trainerName}, this is your Pokémon team! Are you ready for ADVENTURE?</h2>
    <p>Your starting point is ${trainerGrad}!</p>
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

    // After final team is displayed, show the trainer selector and append below the final team
    const trainerCustomizer = document.getElementById("trainer-customizer");
    trainerCustomizer.classList.remove("hidden");

    // Show the trainer image after final team is shown
    const trainerIcon = document.getElementById("trainer-icon");
    trainerIcon.style.display = "block"; // Show the trainer image

    // Append trainer customizer below the final team
    finalTeamDiv.insertAdjacentElement("afterend", trainerCustomizer);
  });
