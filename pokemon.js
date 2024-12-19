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

    // Hide all Pokémon input items
    for (let i = 1; i <= 6; i++) {
      const pokemonItemDiv = document.getElementById(`pokemonItem${i}`);
      if (pokemonItemDiv) {
        pokemonItemDiv.style.display = "none";
      }
    }

    // Hide confirmation div and coach section
    const confirmationDiv = document.getElementById("confirmation");
    confirmationDiv.classList.add("hidden");

    const coachDiv = document.querySelector(".Coach");
    if (coachDiv) {
      coachDiv.style.display = "none"; // Hide the Coach section
    }

    // Update title
    const title = document.querySelector("h1");
    if (title) {
      title.textContent = "Your Adventure Begins!";
    }

    // Clear and update final team div
    const finalTeamDiv = document.getElementById("finalTeam");
    finalTeamDiv.classList.remove("hidden");
    finalTeamDiv.innerHTML = `
    <h2>Trainer ${trainerName}, this is your Pokémon team!</h2>
    <p>Your starting point is ${trainerGrad}!</p>
  `;

    // Append Pokémon images and names
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

    // Insert final team div immediately after the title
    title.insertAdjacentElement("afterend", finalTeamDiv);

    // Show the customizer below the final team div
    const customizerDiv = document.getElementById("customizer");
    if (customizerDiv) {
      console.log("Revealing customizer.");
      customizerDiv.classList.remove("hidden"); // Ensure the customizer is shown
      customizerDiv.style.display = "block"; // Ensure it's visible in the layout
    } else {
      console.log("Customizer div not found.");
    }
  });

// Initialize the trainer selection logic
let currentTrainer = 0;
const trainers = [
  "trainer1.png",
  "trainer2.png",
  "trainer3.png", // Add more trainers as needed
];

const trainerIcon = document.getElementById("trainer-icon");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

// Set initial trainer
trainerIcon.src = trainers[currentTrainer];

// Disable/Enable arrows based on position
function updateArrowState() {
  leftArrow.disabled = currentTrainer === 0;
  rightArrow.disabled = currentTrainer === trainers.length - 1;
}

// Handle left arrow click
leftArrow.addEventListener("click", () => {
  if (currentTrainer > 0) {
    currentTrainer--;
    trainerIcon.src = trainers[currentTrainer];
    updateArrowState();
  }
});

// Handle right arrow click
rightArrow.addEventListener("click", () => {
  if (currentTrainer < trainers.length - 1) {
    currentTrainer++;
    trainerIcon.src = trainers[currentTrainer];
    updateArrowState();
  }
});

// Initialize arrows
updateArrowState();
