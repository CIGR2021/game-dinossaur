const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const TWO_MILE_SECONDS = 20;

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  const MOVE_SPEED = 20;
  isJumping = true;
  
  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= MOVE_SPEED;
          dino.style.bottom = `${position}px`;
        }
      }, TWO_MILE_SECONDS);
    } else {
      // Subindo
      position += MOVE_SPEED;
      dino.style.bottom = `${position}px`;
    }
  }, TWO_MILE_SECONDS);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = `${cactusPosition}px`;

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      const MOVE_SPEED = 10
      cactusPosition -= MOVE_SPEED;
      cactus.style.left = `${cactusPosition}px`;
    }
  }, TWO_MILE_SECONDS);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
