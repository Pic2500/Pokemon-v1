const playermonster = {
  Charmander: {
    position: {
      x: 280,
      y: 350,
    },
    image: {
      src: "./Pokemonimages/Monsters/CharmanderBack.png",
      src: "./Pokemonimages/Monsters/CharmanderFront.png",
    },
    animate: true,
    name: "Charmander",
    level: 5,
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Bulbasaur: {
    position: {
      x: 280,
      y: 360,
    },
    image: {
      src: "./Pokemonimages/Monsters/bulbasaurBack.png",
      src: "./Pokemonimages/Monsters/bulbasaurFront.png",
    },
    animate: true,
    name: "Bulbasaur",
    level: 5,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Squirtle: {
    position: {
      x: 280,
      y: 352,
    },
    image: {
      src: "./Pokemonimages/Monsters/SquirtleBack.png",
      src: "./Pokemonimages/Monsters/SquirtleFront.png",
    },
    animate: true,
    name: "Squirtle",
    level: 5,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },

  Chikorita: {
    position: {
      x: 280,
      y: 352,
    },
    image: {
      src: "./Pokemonimages/Monsters/chikoritaBack.png",
      src: "./Pokemonimages/Monsters/chikoritaFront.png",
    },
    animate: true,
    name: "Chikorita",
    level: 5,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Cyndaquil: {
    position: {
      x: 280,
      y: 352,
    },
    image: {
      src: "./Pokemonimages/Monsters/cyndaquilBack.png",
      src: "./Pokemonimages/Monsters/cyndaquilFront.png",
    },
    animate: true,
    name: "Cyndaquil",
    level: 5,
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Totodile: {
    position: {
      x: 280,
      y: 352,
    },
    image: {
      src: "./Pokemonimages/Monsters/totodileBack.png",
      src: "./Pokemonimages/Monsters/totodileFront.png",
    },
    animate: true,
    name: "Totodile",
    level: 5,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },

  Treecko: {
    position: {
      x: 280,
      y: 352,
    },
    image: {
      src: "./Pokemonimages/Monsters/treeckoBack.png",
      src: "./Pokemonimages/Monsters/treeckoFront.png",
    },
    animate: true,
    name: "Treecko",
    level: 5,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Torchic: {
    position: {
      x: 280,
      y: 352,
    },
    image: {
      src: "./Pokemonimages/Monsters/torchicBack.png",
      src: "./Pokemonimages/Monsters/torchicFront.png",
    },
    animate: true,
    name: "Torchic",
    level: 5,
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Mudkip: {
    position: {
      x: 280,
      y: 352,
    },
    image: {
      src: "./Pokemonimages/Monsters/mudkipBack.png",
      src: "./Pokemonimages/Monsters/mudkipFront.png",
    },
    animate: true,
    name: "Mudkip",
    level: 5,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },

  Turtwig: {
    position: {
      x: 280,
      y: 352,
    },
    image: {
      src: "./Pokemonimages/Monsters/turtwigBack.png",
      src: "./Pokemonimages/Monsters/turtwigFront.png",
    },
    animate: true,
    name: "Turtwig",
    level: 5,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Chimchar: {
    position: {
      x: 250,
      y: 352,
    },
    image: {
      src: "./Pokemonimages/Monsters/chimcharBack.png",
      src: "./Pokemonimages/Monsters/chimcharFront.png",
    },
    animate: true,
    name: "Chimchar",
    level: 5,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Piplup: {
    position: {
      x: 250,
      y: 352,
    },
    image: {
      src: "./Pokemonimages/Monsters/piplupBack.png",
      src: "./Pokemonimages/Monsters/piplupFront.png",
    },
    animate: true,
    name: "Piplup",
    level: 5,
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

  Chikorita: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/chikoritaFront.png",
    },
    animate: true,
    isEnemy: true,
    name: "Chikorita",
    level: 8,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Cyndaquil: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/cyndaquilFront.png",
    },
    animate: true,
    isEnemy: true,
    name: "Cyndaquil",
    level: 8,
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Totodile: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/totodileFront.png",
    },
    animate: true,
    isEnemy: true,
    name: "Totodile",
    level: 8,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },

  Treecko: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/treeckoFront.png",
    },
    animate: true,
    isEnemy: true,
    name: "Treecko",
    level: 8,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Torchic: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/torchicFront.png",
    },
    animate: true,
    isEnemy: true,
    name: "Torchic",
    level: 8,
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Mudkip: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/mudkipFront.png",
    },
    animate: true,
    isEnemy: true,
    name: "Mudkip",
    level: 8,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },

  Turtwig: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/turtwigFront.png",
    },
    animate: true,
    isEnemy: true,
    name: "Turtwig",
    level: 8,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Chimchar: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/chimcharFront.png",
    },
    animate: true,
    isEnemy: true,
    name: "Chimchar",
    level: 8,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Piplup: {
    position: {
      x: 740,
      y: 80,
    },
    image: {
      src: "./Pokemonimages/Monsters/piplupFront.png",
    },
    animate: true,
    isEnemy: true,
    name: "Piplup",
    level: 8,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },
};
