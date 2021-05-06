const article = document.querySelector("article");
const buttondiv = document.querySelector(".buttondiv");
var stranica = 1;

function createButtons() {
  let index;
  if (stranica < 3) index = 1;
  else if (stranica > 31) index = 30;
  else index = stranica - 2;
  buttondiv.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const button = document.createElement("button");
    if (i === 0) {
      button.textContent = "<<";
      button.addEventListener("click", () => {
        if (stranica > 1) {
          stranica--;
          fetchData(createContent);
          createButtons();
        }
      });
      button.classList.add("backforth");
    } else if (i === 6) {
      button.textContent = ">>";
      button.addEventListener("click", () => {
        if (stranica < 34) {
          stranica++;
          fetchData(createContent);
          createButtons();
        }
      });
      button.classList.add("backforth");
    } else {
      button.textContent = index++;
      button.addEventListener("click", () => {
        stranica = button.textContent;
        fetchData(createContent);
        createButtons();
      });
      button.classList.add("page");
    }
    buttondiv.appendChild(button);
  }
  const buttonsclass = buttondiv.querySelectorAll("button");
  buttonsclass.forEach((e) => {
    if (e.textContent == stranica) e.classList.add("buttonon");
  });
}

function createContent(data) {
  article.innerHTML = "";
  data.results.forEach((e) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("p");
    const like = document.createElement("button");
    img.setAttribute("src", e.image);
    img.addEventListener("click", () => {
      fetchCharacter(e.id, createCharacter);
    });
    name.textContent = e.name;
    like.innerHTML = '<i class="far fa-thumbs-up"></i> LIKE';
    like.onclick = () => {
      like.classList.toggle("liked");
    };
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(like);
    article.appendChild(div);
  });
}

function createCharacter(data) {
  article.innerHTML = "";
  buttondiv.innerHTML = "";
  const div = document.createElement("div");
  const img = document.createElement("img");
  const name = document.createElement("p");
  const race = document.createElement("p");
  const status = document.createElement("p");
  const location = document.createElement("p");
  const origin = document.createElement("p");
  const button = document.createElement("button");
  const buttongo = document.createElement("button");
  const buttonback = document.createElement("button");
  img.setAttribute("src", data.image);
  name.textContent = "Name: " + data.name;
  race.textContent = "Race: " + data.species;
  status.textContent = "Status: " + data.status;
  location.textContent = "Location: " + data.location.name;
  origin.textContent = "Origin: " + data.origin.name;
  button.textContent = "Main page";
  button.classList.add("backforth");
  button.onclick = () => {
    fetchData(createContent);
    createButtons();
  };
  buttongo.textContent = ">>";
  buttongo.classList.add("backforth");
  buttonback.textContent = "<<";
  buttonback.classList.add("backforth");
  buttongo.onclick = () => {
    if (data.id + 1 < 672) fetchCharacter(data.id + 1, createCharacter);
  };
  buttonback.onclick = () => {
    if (data.id - 1 > 0) fetchCharacter(data.id - 1, createCharacter);
  };
  div.classList.add("chardiv");

  div.appendChild(img);
  div.appendChild(name);
  div.appendChild(race);
  div.appendChild(status);
  div.appendChild(location);
  div.appendChild(origin);
  buttondiv.appendChild(buttonback);
  buttondiv.appendChild(button);
  buttondiv.appendChild(buttongo);
  article.appendChild(div);
}

function fetchCharacter(id, fn) {
  const api = "https://rickandmortyapi.com/api/character/" + id;
  const req = new XMLHttpRequest();
  req.open("GET", api);
  req.send();
  req.onload = () => {
    fn(JSON.parse(req.responseText));
  };
}

function fetchData(fn) {
  const api = "https://rickandmortyapi.com/api/character/?page=" + stranica;
  const req = new XMLHttpRequest();
  req.open("GET", api);
  req.send();
  req.onload = () => {
    fn(JSON.parse(req.responseText));
  };
}
fetchData(createContent);
createButtons();
