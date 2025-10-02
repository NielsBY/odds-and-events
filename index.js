const odds = [];
const evens = [];
const bank = [];

function addToBank(number) {
  bank.push(number);
  console.log(`Added ${number} to the bank.`);
  render();
}

function sortNumbers() {
  const number = bank.shift();
  if (number % 2 === 0) {
    evens.push(number);
  } else {
    odds.push(number);
  }
}

function sortOneNumber() {
  sortNumbers();
  render();
}

function sortAllNumbers() {
  while (bank.length) {
    sortNumbers();
  }
  render();
}

function NumberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
        Enter a number to the bank:
        <input name="number" type="number"/>
    </label>
    <button type="submit" data-action="add">Add to Bank</button>
    <button type="submit" data-action="sortOneNumber">Sort One Number</button>
    <button type="submit" data-action="sortAllNumbers">Sort All Numbers</button>
  `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const action = event.submitter.dataset.action;
    if (action === "add") {
      const data = new FormData($form);
      const number = data.get("number");

      if (number === "" || number === null) return;

      addToBank(+number);
    } else if (action === "sortOneNumber") {
      sortOneNumber();
    } else if (action === "sortAllNumbers") {
      sortAllNumbers();
    }
  });

  return $form;
}

function NumberInBank(n) {
  const $span = document.createElement("span");
  $span.textContent = n;
  return $span;
}

function NumberBank(label, numbers) {
  const $bank = document.createElement("div");
  $bank.classList.add("number-bank");
  $bank.innerHTML = `
      <h2>${label}</h2>
      <output></output>
    `;

  const $numbers = numbers.map(NumberInBank);
  $bank.querySelector("output").replaceChildren(...$numbers);

  return $bank;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `  
    <h1>Odds and Evens</h1>
    <NumberForm></NumberForm>
    <NumberBank id ="bank"></NumberBank>
    <NumberBank id="evens"></NumberBank>
    <NumberBank id="odds"></NumberBank>
  `;
  $app.querySelector("NumberForm").replaceWith(NumberForm());
  $app.querySelector("NumberBank#bank").replaceWith(NumberBank("Bank", bank));
  $app
    .querySelector("NumberBank#evens")
    .replaceWith(NumberBank("Evens", evens));
  $app.querySelector("NumberBank#odds").replaceWith(NumberBank("Odds", odds));
}

render();
