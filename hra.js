let currentPlayer = 'circle';
const imagePlayer = document.querySelector('.image-player');
const repeatButton = document.querySelector('#restart-button');

const odehrani = (event) => {
  if (currentPlayer === 'circle') {
    event.target.classList.toggle('board__field--circle');
    currentPlayer = 'cross';
    imagePlayer.src = 'images/circle.svg';
    event.target.disabled = true;
  } else {
    event.target.classList.toggle('board__field--cross');
    currentPlayer = 'circle';
    imagePlayer.src = 'images/cross.svg';
    event.target.disabled = true;
  }
};

const pole1 = document
  .querySelector('.playground__button:nth-child(1)')
  .addEventListener('click', odehrani);

const pole2 = document
  .querySelector('.playground__button:nth-child(2)')
  .addEventListener('click', odehrani);

const pole3 = document
  .querySelector('.playground__button:nth-child(3)')
  .addEventListener('click', odehrani);

const pole4 = document
  .querySelector('.playground__button:nth-child(4)')
  .addEventListener('click', odehrani);

const pole5 = document
  .querySelector('.playground__button:nth-child(5)')
  .addEventListener('click', odehrani);

const pole6 = document
  .querySelector('.playground__button:nth-child(6)')
  .addEventListener('click', odehrani);

const pole7 = document
  .querySelector('.playground__button:nth-child(7)')
  .addEventListener('click', odehrani);

const pole8 = document
  .querySelector('.playground__button:nth-child(8)')
  .addEventListener('click', odehrani);

const pole9 = document
  .querySelector('.playground__button:nth-child(9)')
  .addEventListener('click', odehrani);

const pole10 = document
  .querySelector('.playground__button:nth-child(10)')
  .addEventListener('click', odehrani);

// bonus 1
const varovani = (event) => {
  const confirmation = window.confirm('Opravdu chceš začít znovu?');
  if (confirmation) {
    window.location.reload();
  } else {
    event.preventDefault();
  }
};

repeatButton.addEventListener('click', varovani);
