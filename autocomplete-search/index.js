const inputFind = document.getElementById("input-find");
const outputResult = document.getElementById("find-result");

//wait for call fucntion
function debounce(callback, time = 400) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, time);
  };
}

//search country and filter
const findSearchText = async (evt) => {
  const response = await fetch("./data.json");
  const results = await response.json();

  const searchText = evt.target.value;

  const filtredResult = results.filter((country) => {
    const regex = new RegExp(`^${searchText}`, "gi");

    return country.name.match(regex) || country.code.match(regex);
  });

  //show/hide ul if text empty
  if (!searchText) {
    outputResult.classList.remove("active");
  } else {
    outputResult.classList.add("active");
    rednerUi(filtredResult);
  }
};

//render result to ui
function rednerUi(countries) {
  const fragment = document.createDocumentFragment();

  countries.forEach((country) => {
    const li = document.createElement("li");
    li.classList.add("list-item");
    li.innerHTML = `<small>${country.code}</small><h4 class="country">${country.name}</h4>`;
    fragment.appendChild(li);
  });

  outputResult.innerHTML = countries.length ? "" : "no matched record found";
  outputResult.appendChild(fragment);
}

//input search text
inputFind.addEventListener("keyup", debounce(findSearchText));

//on item click
outputResult.addEventListener("click", function (evt) {
  evt.stopPropagation();
  const element = evt.target;
  const onListClick = element.classList.contains("list-item");
  if (!onListClick) return;

  inputFind.value = element.querySelector(".country").textContent;
  this.innerHTML = "";
  this.classList.remove("active");
});
