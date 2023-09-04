import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateEl = document.querySelector('input[type="text"]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const buttonEl = document.querySelector('button[data-start]');

let timerId = null;
let chosenDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      chosenDate = selectedDates[0].getTime();
      const currentDate = new Date().getTime();
      const isSetledTimeInPast = (chosenDate - currentDate) <= 0;

      if (isSetledTimeInPast) {
          buttonEl.setAttribute('disabled', true);
          Notify.warning('You must set time in the future.');
      } else { 
          buttonEl.removeAttribute('disabled', false);
          resetTime();
          if(timerId) clearInterval(timerId);
      }
  },
}; 

flatpickr(dateEl, options);

function updateTime({ days, hours, minutes, seconds }) { 
    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function resetTime() { 
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
}

function handleButtonClick() { 
    buttonEl.setAttribute('disabled', true);
    if(timerId) clearInterval(timerId);

    timerId = setInterval(() => {
        const currentDate = new Date().getTime();

        if (chosenDate - currentDate <= 0) {
            resetTime();
            clearInterval(timerId);
        } else { 
            const timerTime = convertMs(chosenDate - currentDate);
            updateTime(timerTime);
        }
    }, 1000);
}

buttonEl.addEventListener('click', handleButtonClick);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
