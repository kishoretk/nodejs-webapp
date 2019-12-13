//console.log('client side js file loaded')

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const error = document.querySelector("#error");
const result = document.querySelector("#message");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  result.textContent = 'loading..';
  error.textContent='';

  const location = search.value;

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        error.textContent  = data.error;
        result.textContent = '';
      } else {
        result.textContent = data.location + '\n' + data.forecast;
      }
    });
  });
});
