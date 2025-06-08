const cardContainer = document.querySelector(".cards-container");
const cards = document.querySelector(".cards");

//using js to add card element based on data
function createCardElements(data) {
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
  // const result = await fetch(
  //   "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital"
  // );
  const data = await result.json().then((res) => {
    return res;
  });
  createCardElements(data);
}

fetchCountries();
