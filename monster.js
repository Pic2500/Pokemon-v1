const monster = {
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
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Bulbasaur: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/bulbasaurBack.png",
    },
    animate: true,
    name: "Bulbasaur",
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Squirtle: {
    name: "Squirtle",
    image: "./Pokemonimages/Monsters/SquirtleBack.png",
    animate: true,
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
    animate: true,
    isEnemy: true,
    name: "Bulbasaur",
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
    animate: true,
    isEnemy: true,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },
};
