const ce = (tag) => document.createElement(tag);
const qs = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", (e) => {
  fetchChars();
  clickHandler();
  submitHandler();
});

const baseUrl = "http://localhost:3000/characters/";
//fetch the info
const fetchChars = () => {
  fetch(baseUrl)
    .then((res) => res.json())
    .then((chars) => renderCs(chars));
  //array of obj
};

const renderCs = (chars) => {
  for (const char of chars) {
    renderChar(char);
  }
};

const renderChar = (char) => {
  const cBar = qs("#character-bar");
  const cSpan = ce("span");
  cSpan.innerText = char.name;
  cSpan.setAttribute("data-id", char.id);
  cBar.append(cSpan);

  const charInfoDiv = qs("div.characterInfo");
  const detailedInfo = qs("div#detailed-info");
  detailedInfo.setAttribute("data-id", char.id);

  const div = document.createElement("div");

  div.innerHTML = `<p class="name">${char.name}</p>
  <img class="image" src=${char.image}>
  <h4>Total Calories: <span class="calories">${char.calories}</span>
  </h4><form class="calories-form" data-id="${char.id}"><input type="hidden" class="id" value="${char.id}"/>
  <input type="text" placeholder="Enter Calories" class="calories"/><input type="submit" value="Add Calories""/></form><button id="reset-btn">Reset Calories</button>
`;
  detailedInfo.append(div);
  //   charInfoDiv.append(detailedInfo);
};

const clickHandler = () => {
  const form = qs("form");
  document.addEventListener("click", function (e) {
    if (e.target.matches("submit")) {
      // const dataId = e.target.getAttribute["data-id"]
      // const resetButton =
      form.calories.value = calories;
      form.submit.id = charId;
    }
  });
};
const submitHandler = () => {
  const form1 = qs(".calories-form");
  form1.addEventListener(`submit`, (e) => {
    e.preventDefault();
    const form = e.target;
    const dataId = qs(e.target.getAttribute("data-id"));
    const calories = form.calories.value;

    const formObj = {
      calories: calories,
    };
    console.log(e.target.getAttribute("data-id"));
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(formObj),
    };

    fetch(baseUrl + dataId).then((res) => res.json);

    // calories = form.valories.value;
    // charId = form.submit.id;
  });
};
