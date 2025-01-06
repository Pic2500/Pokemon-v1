const playermonster = {
  Charmander: {
    position: {
      x: 250,
      y: 280,
    },
    image: {
      src: "./Pokemonimages/Monsters/CharmanderBack.png",
    },
    animate: true,
    name: "Charmander",
    level: 5,
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Bulbasaur: {
    position: {
      x: 250,
      y: 280,
    },
    image: {
      src: "./Pokemonimages/Monsters/bulbasaurBack.png",
    },
    animate: true,
    name: "Bulbasaur",
    level: 7,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Squirtle: {
    position: {
      x: 250,
      y: 280,
    },
    image: {
      src: "./Pokemonimages/Monsters/SquirtleBack.png",
    },
    animate: true,
    name: "Squirtle",
    level: 8,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },
};

const monsterEnemy = {
  Charmander: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/CharmanderFront.png",
    },

    animate: true,
    isEnemy: true,
    name: "Charmander",
    level: 4,
    attacks: [attacks.Tackle, attacks.Fireball],
  },
  Bulbasaur: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/bulbasaurFront.png",
    },
    name: "Bulbasaur",
    level: 3,
    animate: true,
    isEnemy: true,

    attacks: [attacks.Tackle, attacks.Vinewhip],
  },
  Squirtle: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/SquirtleFront.png",
    },
    name: "Squirtle",
    level: 6,
    animate: true,
    isEnemy: true,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },
};
