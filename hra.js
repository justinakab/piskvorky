import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const imagePlayer = document.querySelector('.image-player');
const repeatButton = document.querySelector('#restart-button');

const odehrani = (event) => {
  if (currentPlayer === 'circle') {
    event.target.classList.toggle('board__field--circle');
    currentPlayer = 'cross';
    imagePlayer.src = 'images/cross.svg';
    event.target.disabled = true;
  } else {
    event.target.classList.toggle('board__field--cross');
    currentPlayer = 'circle';
    imagePlayer.src = 'images/circle.svg';
    event.target.disabled = true;
  }
  evaluation();
};

// alerts na reload
const varovani = (event) => {
  const confirmation = window.confirm('Opravdu chceš začít znovu?');
  if (confirmation) {
    window.location.reload();
  } else {
    event.preventDefault();
  }
};

repeatButton.addEventListener('click', varovani);

// část 3

const buttons = document.querySelectorAll('.playground__button');

buttons.forEach((button) => {
  button.addEventListener('click', odehrani);
});

// evaluace herního postupu
const evaluation = () => {
  let field = [];
  buttons.forEach((button) => {
    if (button.classList.contains('board__field--circle')) {
      field.push('o');
    } else if (button.classList.contains('board__field--cross')) {
      field.push('x');
    } else {
      field.push('_');
    }
  });

  // spuštění funkce
  const winner = findWinner(field);

  // časovače odpovědí
  if (winner === 'o' || winner === 'x') {
    // alert
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner}.`);
    }, 500);
    // reload hry
    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  if (winner === 'tie') {
    setTimeout(() => {
      alert(`Hra skončila remízou.`);
    }, 500);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
};
