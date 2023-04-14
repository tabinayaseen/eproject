const cardButtons = document.querySelectorAll('.card-button');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

function handleButtonClick(event) {
  const button = event.currentTarget;
  const card = button.closest('.card');
  modalOuter.classList.add('visible');
}

cardButtons.forEach(button =>
  button.addEventListener('click', handleButtonClick)
);

function closeModal() {
  modalOuter.classList.remove('visible');
}

modalOuter.addEventListener('click', function(event) {
  const isOutside = !event.target.closest('.modal-inner');
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener('keydown', event => {
  console.log(event);
  if (event.key === 'Escape') {
    closeModal();
  }
});