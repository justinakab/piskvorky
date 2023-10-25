import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

// definování proměnných
let currentPlayer = 'circle';
const buttons = document.querySelectorAll('.playground__button');
const imagePlayer = document.querySelector('.image-player');
const repeatButton = document.querySelector('#restart-button');

const odehrani = (event) => {
  if (currentPlayer === 'circle') {
    event.target.classList.toggle('board__field--circle');
    currentPlayer = 'cross';
    imagePlayer.src = 'images/cross.svg';
  } else {
    event.target.classList.toggle('board__field--cross');
    currentPlayer = 'circle';
    imagePlayer.src = 'images/circle.svg';
  }

  event.target.disabled = true;
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

buttons.forEach((button) => {
  button.addEventListener('click', odehrani);
});

// evaluace herního postupu
const evaluation = async () => {
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
  } else if (winner === 'tie') {
    setTimeout(() => {
      alert(`Hra skončila remízou.`);
    }, 500);
    setTimeout(() => {
      location.reload();
    }, 1000);
    // 5 část
    // podmínka
  } else if (winner === null && currentPlayer === 'cross') {
    // znemožnění odehrání
    buttons.forEach((button) => {
      button.disabled = true;
    });
    // volání odpovědi API
    const response = await fetch(
      'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: field,
          player: 'cross',
        }),
      },
    );
    // převedení dat
    const data = await response.json();
    const { x, y } = data.position;
    const gamefield = buttons[x + y * 10];

    // obnovení tlačítek
    buttons.forEach((button) => {
      const shouldEnable = !(
        button.classList.contains('board__field--circle') ||
        button.classList.contains('board__field--cross')
      );

      if (shouldEnable) {
        button.disabled = false;
      }
    });

    gamefield.click();
  }
};
