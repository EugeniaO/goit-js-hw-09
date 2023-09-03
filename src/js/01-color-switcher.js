const startButtonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');





let timerId = null;


const changeBackgroundColor = () => {
        startButtonEl.setAttribute('disabled', true);

    timerId = setInterval(() => {
  function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
        };
        const color = getRandomHexColor();
        console.log(color);


        document.body.style.backgroundColor = color;
    }, 1000);
};

startButtonEl.addEventListener('click', changeBackgroundColor);


stopButtonEl.addEventListener('click', () => {
            startButtonEl.removeAttribute('disabled', false);

    clearInterval(timerId);
});


