class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
  }) {
    this.position = position;
    this.image = new Image();
    this.frames = { ...frames, val: 0, elapsed: 0 };

    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * scale;
      this.height = this.image.height * scale;
    };
    this.image.src = image.src;

    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1;
    this.rotation = rotation;
    this.scale = scale;
  }

  draw() {
    c.save();
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    c.globalAlpha = this.opacity;

    const crop = {
      position: {
        x: this.frames.val * (this.width / this.scale),
        y: 0,
      },
      width: this.image.width / this.frames.max,
      height: this.image.height,
    };

    const image = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: this.image.width / this.frames.max,
      heigth: this.image.height,
    };
    c.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      image.position.x,
      image.position.y,
      image.width * this.scale,
      image.heigth * this.scale
    );
    c.restore();

    if (!this.animate) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
  }
}

class Monster extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks,
    level = 5,
    maxHealth,
    backImage,
    frontImage,
    experience,
  }) {
    super({
      position,
      velocity,
      image: backImage,
      frames,
      sprites,
      animate,
      rotation,
      experience,
    });

    this.name = name;
    this.isEnemy = isEnemy;
    this.health = 100;
    this.attacks = attacks;
    this.level = level;
    this.experience = 0;
    this.experienceToNextLevel = this.calculateExperienceToNextLevel();

    this.maxHealth = maxHealth || 100;
    this.health = this.maxHealth;
    this.backImage = backImage;
    this.frontImage = frontImage;

    if (this.isEnemy) {
      if (frontImage) {
        this.image.src = frontImage;
      } else {
        console.error("Error: Enemy front image path is undefined");
      }
    } else {
      if (backImage) {
        this.image.src = backImage;
      } else {
        console.error("Error: Player back image path is undefined");
      }
    }

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
  }

  // Function to calculate XP required for the next level based on current level
  calculateExperienceToNextLevel() {
    return Math.floor(4.2 * Math.pow(this.level, 1.2)); // Adjust formula as needed
  }

  // Funkcija za dodavanje XP
  gainExperience(amount) {
    console.log(`${this.name} gains ${amount} XP!`);
    this.experience += amount; // Add the gained XP

    // Save XP to localStorage whenever it changes
    localStorage.setItem("playerXP", this.experience);
    let levelUpMessage = "";
    while (this.experience >= this.experienceToNextLevel) {
      levelUpMessage = `${this.name} leveled up to level ${this.level + 1}!`;
      this.levelUp();
    }

    // Display the level-up message if the Pokémon leveled up
    if (levelUpMessage) {
      document.querySelector("#dialogueBox").innerHTML = levelUpMessage;
    } else {
      // Update dialogue with XP gained if no level-up
      document.querySelector(
        "#dialogueBox"
      ).innerHTML = `${this.name} gained ${amount} XP!`;
    }
  }

  loadPlayerXP() {
    const savedXP = localStorage.getItem("playerXP");
    if (savedXP) {
      this.experience = parseInt(savedXP);
      // Proveri da li je nivo igrača potrebno ažurirati
      while (this.experience >= this.experienceToNextLevel) {
        this.levelUp();
      }
    }
  }

  // Funkcija za levelovanje
  levelUp() {
    this.experience -= this.experienceToNextLevel; // Preostali XP se prenosi
    this.level++; // Povećava nivo
    this.experienceToNextLevel = this.calculateExperienceToNextLevel(); // Ažurira XP potreban za sledeći nivo
    this.maxHealth = this.calculateMaxHealth(); // Ažurira maksimalno zdravlje na osnovu nivoa
    this.health = this.maxHealth; // Vraća zdravlje na maksimalnu vrednost

    console.log(`${this.name} je dostigao nivo ${this.level}!`);
  }

  // Funkcija za izračunavanje novog maksimalnog zdravlja sa nivoom
  calculateMaxHealth() {
    return Math.floor(20 + this.level ** 2 / 2);
  }

  faint() {
    // Check if it's the enemy Pokémon fainting
    if (this.isEnemy) {
      // Display the fainted message
      document.querySelector("#dialogueBox").innerHTML =
        this.name + " fainted!";

      // Gain experience for the player Pokémon after the enemy faints
      const experienceGained =
        Math.floor(Math.random() * 20) + 10 + (this.level - 5); // Example XP formula, adjust as needed
      playerPokemon.gainExperience(experienceGained); // Assuming playerPokemon is your player Pokémon object

      // Update dialogue box to show experience gained
      document.querySelector(
        "#dialogueBox"
      ).innerHTML += `<br>${playerPokemon.name} gained ${experienceGained} XP!`;

      gsap.to(this.position, {
        y: this.position.y + 20,
      });
      gsap.to(this, {
        opacity: 0,
      });

      audio.battle.stop();
      audio.victory.play();
    } else {
      document.querySelector("#dialogueBox").innerHTML =
        this.name + " fainted!";

      this.health = this.maxHealth;

      gsap.to(this.position, {
        y: this.position.y + 20,
      });
      gsap.to(this, {
        opacity: 0,
      });
      audio.battle.stop();
      audio.victory.play();
    }
  }

  attack({ attack, recipient, renderedSprites }) {
    document.querySelector("#dialogueBox").style.display = "block";
    document.querySelector("#dialogueBox").innerHTML =
      this.name + " used " + attack.name;
    let healthBar = "#enemyHealthBar";
    if (this.isEnemy) healthBar = "#playerHealthBar";

    let rotation = 1;
    if (this.isEnemy) rotation = -2.2;

    recipient.health -= attack.damage;

    const tl = gsap.timeline();
    let movementDistance = 20;

    switch (attack.name) {
      case "Fireball":
        audio.initFireball.play();
        const fireballImage = new Image();
        fireballImage.src =
          "./Pokemonimages/assets/Maping/Battles/fireball.png";
        const fireball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y,
          },
          image: fireballImage,
          frames: {
            max: 4,
            hold: 10,
          },
          animate: true,
          rotation,
        });

        renderedSprites.splice(1, 0, fireball);

        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            //Damage done
            audio.fireballHit.play();

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
            });

            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08,
            });
            renderedSprites.splice(1, 1);
          },
        });
        break;

      case "Tackle":
        if (this.isEnemy) movementDistance = -20;

        tl.to(this.position, {
          x: this.position.x - movementDistance,
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              //Damage done
              audio.tackleHit.play();

              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08,
              });

              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
          });
        break;

      case "WaterGun":
        if (this.isEnemy) movementDistance = -20;

        tl.to(this.position, {
          x: this.position.x - movementDistance,
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              //Damage done
              audio.tackleHit.play();

              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08,
              });

              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
          });
        break;

      case "Vinewhip":
        if (this.isEnemy) movementDistance = -20;

        tl.to(this.position, {
          x: this.position.x - movementDistance,
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              //Damage done
              audio.tackleHit.play();

              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08,
              });

              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
          });
    }
  }
}

class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    c.fillStyle = "rgba(255,0 ,0 ,0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
