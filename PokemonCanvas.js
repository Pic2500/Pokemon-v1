const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
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

const image = new Image();
image.src = "./Pokemonimages/assets/Maping/PokemonStyleMap.png";

const foregroundImage = new Image();
foregroundImage.src = "./Pokemonimages/assets/Maping/foregroundObjects.png";

const playerImage = new Image();
playerImage.src = "./Pokemonimages/assets/Maping/playerDown.png";

image.onload = () => {
  c.drawImage(image, -450, -300);
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4 / 2,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  );
};

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerImage,
  frames: {
    max: 4,
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

const movables = [background, ...boundaries, foreground];

function rectangularCollison({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}
function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((Boundary) => {
    Boundary.draw();
  });

  player.draw();
  foreground.draw();

  let moving = true;
  if (keys.w.pressed && lastKey === "w") {
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
animate();

let lastKey = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
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
