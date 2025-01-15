const playermonster = {
  Charmander: {
    position: {
      x: 280,
      y: 350,
    },

    backImage: "./Pokemonimages/Monsters/CharmanderBack.png",
    frontImage: "./Pokemonimages/Monsters/CharmanderFront.png",

    animate: true,
    name: "Charmander",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Bulbasaur: {
    position: {
      x: 280,
      y: 360,
    },

    backImage: "./Pokemonimages/Monsters/bulbasaurBack.png",
    frontImage: "./Pokemonimages/Monsters/bulbasaurFront.png",

    animate: true,
    name: "Bulbasaur",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Squirtle: {
    position: {
      x: 280,
      y: 352,
    },

    backImage: "./Pokemonimages/Monsters/SquirtleBack.png",
    frontImage: "./Pokemonimages/Monsters/SquirtleFront.png",

    animate: true,
    name: "Squirtle",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },

  Chikorita: {
    position: {
      x: 280,
      y: 352,
    },

    backImage: "./Pokemonimages/Monsters/chikoritaBack.png",
    frontImage: "./Pokemonimages/Monsters/chikoritaFront.png",

    animate: true,
    name: "Chikorita",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Cyndaquil: {
    position: {
      x: 280,
      y: 352,
    },

    backImage: "./Pokemonimages/Monsters/cyndaquilBack.png",
    frontImage: "./Pokemonimages/Monsters/cyndaquilFront.png",

    animate: true,
    name: "Cyndaquil",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Totodile: {
    position: {
      x: 280,
      y: 352,
    },

    backImage: "./Pokemonimages/Monsters/totodileBack.png",
    frontImage: "./Pokemonimages/Monsters/totodileFront.png",

    animate: true,
    name: "Totodile",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },

  Treecko: {
    position: {
      x: 280,
      y: 352,
    },

    backImage: "./Pokemonimages/Monsters/treeckoBack.png",
    frontImage: "./Pokemonimages/Monsters/treeckoFront.png",

    animate: true,
    name: "Treecko",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Torchic: {
    position: {
      x: 280,
      y: 352,
    },

    backImage: "./Pokemonimages/Monsters/torchicBack.png",
    frontImage: "./Pokemonimages/Monsters/torchicFront.png",

    animate: true,
    name: "Torchic",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Mudkip: {
    position: {
      x: 280,
      y: 352,
    },

    backImage: "./Pokemonimages/Monsters/mudkipBack.png",
    frontImage: "./Pokemonimages/Monsters/mudkipFront.png",

    animate: true,
    name: "Mudkip",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },

  Turtwig: {
    position: {
      x: 280,
      y: 352,
    },

    backImage: "./Pokemonimages/Monsters/turtwigBack.png",
    frontImage: "./Pokemonimages/Monsters/turtwigFront.png",

    animate: true,
    name: "Turtwig",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Chimchar: {
    position: {
      x: 250,
      y: 352,
    },

    backImage: "./Pokemonimages/Monsters/chimcharBack.png",
    frontImage: "./Pokemonimages/Monsters/chimcharFront.png",

    animate: true,
    name: "Chimchar",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Piplup: {
    position: {
      x: 250,
      y: 352,
    },

    backImage: "./Pokemonimages/Monsters/piplupBack.png",
    frontImage: "./Pokemonimages/Monsters/piplupFront.png",

    animate: true,
    name: "Piplup",
    level: 5,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },
};

const monsterEnemy = {
  Charmander: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/CharmanderFront.png",

    animate: true,
    isEnemy: true,
    name: "Charmander",
    level: 4,
    health: 20,
    maxHealth: 20,
    attacks: [attacks.Tackle, attacks.Fireball],
  },
  Bulbasaur: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/bulbasaurFront.png",

    name: "Bulbasaur",
    level: 3,
    health: 19,
    maxHealth: 19,
    animate: true,
    isEnemy: true,

    attacks: [attacks.Tackle, attacks.Vinewhip],
  },
  Squirtle: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/SquirtleFront.png",

    name: "Squirtle",
    level: 6,
    health: 28,
    maxHealth: 28,
    animate: true,
    isEnemy: true,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },

  Chikorita: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/chikoritaFront.png",

    animate: true,
    isEnemy: true,
    name: "Chikorita",
    level: 8,
    health: 34,
    maxHealth: 34,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Cyndaquil: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/cyndaquilFront.png",

    animate: true,
    isEnemy: true,
    name: "Cyndaquil",
    level: 8,
    health: 34,
    maxHealth: 34,
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Totodile: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/totodileFront.png",

    animate: true,
    isEnemy: true,
    name: "Totodile",
    level: 8,
    health: 26,
    maxHealth: 26,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },

  Treecko: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/treeckoFront.png",

    animate: true,
    isEnemy: true,
    name: "Treecko",
    level: 8,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Torchic: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/torchicFront.png",

    animate: true,
    isEnemy: true,
    name: "Torchic",
    level: 8,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Fireball],
  },

  Mudkip: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/mudkipFront.png",

    animate: true,
    isEnemy: true,
    name: "Mudkip",
    level: 8,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },

  Turtwig: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/turtwigFront.png",

    animate: true,
    isEnemy: true,
    name: "Turtwig",
    level: 8,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Chimchar: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/chimcharFront.png",

    animate: true,
    isEnemy: true,
    name: "Chimchar",
    level: 8,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.Vinewhip],
  },

  Piplup: {
    position: {
      x: 740,
      y: 80,
    },

    frontImage: "./Pokemonimages/Monsters/piplupFront.png",

    animate: true,
    isEnemy: true,
    name: "Piplup",
    level: 8,
    health: 24,
    maxHealth: 24,
    attacks: [attacks.Tackle, attacks.WaterGun],
  },
};
