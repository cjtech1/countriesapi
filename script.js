const cardContainer = document.querySelector(".cards-container");
const filterValue = document.querySelector("#counrty-selector");
const searchInput = document.querySelector("#searchText");
const darkModeBtn = document.querySelector(".right-container");
const body = document.querySelector("#body");
const selector = document.querySelector("#counrty-selector");
const searchDiv = document.querySelector(".search-div");
const navBar = document.querySelector(".top-bar");

//using js to add card element based on data
function createCardElements(data) {
  cardContainer.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const card = document.createElement("div");
    card.className = "cards";

    card.innerHTML = `
    <a href="./country.html?name=${data[i]["name"].common}">
        <div class="card-img">
          <img src="${data[i]["flags"].png}" alt="" />
        </div>
        <div class="card-content">
          <div class="title">
            <h3>${data[i]["name"].common}</h3>
          </div>
          <div class="content">
            <p>Population: ${data[i]["population"]}</p>
            <p>Region: ${data[0]["region"]}</p>
            <p>Capital: ${data[0]["capital"][0]} </p>
          </div>
        </div>
        </a>
      `;
    cardContainer.appendChild(card);
  }
}

//function to fetch countries and related data
async function fetchCountries() {
  const url = `https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital`;
  const result = await fetch(url);
  const data = await result.json().then((res) => {
    return res;
  });
  createCardElements(data);
}

fetchCountries();

filterValue.addEventListener("click", async () => {
  if (filterValue.value) {
    const region = filterValue.value.toLowerCase();
    const url = `https://restcountries.com/v3.1/region/${region}`;
    const result = await fetch(url);
    const data = await result.json().then((res) => {
      return res;
    });

    createCardElements(data);
  } else {
    fetchCountries();
  }
});

async function searchCountry(country) {
  if (country) {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    const result = await fetch(url);
    const data = await result.json().then((res) => {
      return res;
    });

    createCardElements(data);
  } else {
    fetchCountries();
  }
}

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const searchValue = searchInput.value.trim().toLowerCase();
    searchCountry(searchValue);
  }
});

darkModeBtn.addEventListener("click", () => {
  const cards = document.querySelectorAll(".cards");
  body.classList.toggle("body-dark");
  selector.classList.toggle("dark-mode");
  searchInput.classList.toggle("dark-mode");
  searchDiv.classList.toggle("dark-mode");
  navBar.classList.toggle("dark-mode");

  cards.forEach((card) => {
    card.classList.toggle("dark-mode");
  });
});
