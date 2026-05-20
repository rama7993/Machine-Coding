const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const output = document.getElementById("output");
const clearBtn = document.getElementById("clear");

clearBtn.addEventListener("click", () => {
  output.textContent = "";
  document.getElementById("name").value = "";
});

const debounceFn = (e) => {
  console.log("Debounced Input Event Fired", e.target.value);
  output.textContent = e.target.value;
};

document
  .getElementById("name")
  .addEventListener("input", debounce(debounceFn, 3000));
