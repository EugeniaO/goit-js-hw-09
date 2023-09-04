import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector(".form");

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const result = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay});
      } else {
        reject({ position, delay});
      }
    }, delay);
  });

  return result;
}

formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delay = +formEl.elements.delay.value;
  const step = +formEl.elements.step.value;
  const amount = +formEl.elements.amount.value;
  let timeout = delay + step;

  if (delay < 0 || step < 0 || amount <= 0) {
    Notify.warning(`Please enter valid values!`);
    return
  }

  for (let i = 0; i < amount; i++) { 
    const position = i + 1;
    timeout = i ? timeout : delay;

    createPromise(position, timeout)
      .then(({ position, delay }) => Notify.success(`Fullfiled promise ${position} in ${delay}`))
      .catch(({ position, delay }) => Notify.failure(`Rejected promise ${position} in ${delay}`));
    
    timeout += step;
  }

  formEl.reset();
}
