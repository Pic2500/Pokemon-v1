function rectangularCollison({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}
//monitor for charachter colision
function checkForCharacterCollision({
  characters,
  player,
  characterOffset = { x: 0, y: 0 },
}) {
  player.interactionAsset = null;
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];

    if (
      rectangularCollison({
        rectangle1: player,
        rectangle2: {
          ...character,
          position: {
            x: character.position.x + characterOffset.x,
            y: character.position.y + characterOffset.y,
          },
        },
      })
    ) {
      player.interactionAsset = character;
      break;
    }
  }
}
