const detailsContainer = document.querySelector(".country-details-container");
const params = new URLSearchParams(location.search);
const country = params.get("name");
const backButton = document.querySelector(".back-div");

backButton.addEventListener("click", () => {
  history.back();
});

async function loadNewCountry(coutryCode) {
  const url = `https://restcountries.com/v3.1/alpha/${coutryCode}`;
  const country = await fetch(url);
  const result = await country.json().then((data) => {
    return data;
  });
  const name = result[0].name.common;
  window.location.href = `./country.html?name=${name}`;
}

function fetchBorderCountries(borders) {
  const borderCountries = document.querySelector("#border-countries-container");
  if (borders) borderCountries.innerHTML = "";
  try {
    for (let i = 0; i < borders.length; i++) {
      const borderElement = document.createElement("p");
      borderElement.innerText = borders[i];
      borderElement.addEventListener("click", () => {
        loadNewCountry(borders[i]);
      });
      borderCountries.appendChild(borderElement);
    }
  } catch (err) {}
}

function createElements(data) {
  let currenciesText = "None";
  if (data[0].currencies) {
    currenciesText = Object.values(data[0].currencies)
      .map((curr) => `${curr.name}`)
      .join(",");
  }

  let language = "None";
  if (data[0].languages) {
    language = Object.values(data[0].languages).join(",");
  }

  const card = document.createElement("div");
  card.className = "outer-div";

  card.innerHTML = `
        <div class="flag-img">
            <img src=${data[0].flags.svg} alt="" />
          </div>
          <div class="centre-div">
            <div class="details">
              <div class="heading-div">
                <h1>${data[0].name.common}</h1>
              </div>
              <div class="country-details">
                <div class="primary-details">
                  <p>Native name: ${data[0].name.official}</p>
                  <p>Population: ${data[0].population}</p>
                  <p>Region: ${data[0].region}</p>
                  <p>Sub Region: ${data[0].subregion}</p>
                  <p>Capital: ${data[0].capital}</</p>
                </div>
                <div class="secondary-details">
                  <p>Top Level Domain: ${data[0].tld}</p>
                  <p>Currencies: ${currenciesText}</</p>
                  <p>Languages: ${language}</p>
                </div>
              </div>
              <div class="neighbour-details">
                <span>Border Countries:</span>
          <div id="border-countries-container">
            ${
              country.borders && country.borders.length > 0
                ? ""
                : "<p>No bordering countries</p>"
            }
          </div>
              </div>
            </div>
          </div>
        `;
  detailsContainer.appendChild(card);
  fetchBorderCountries(data[0].borders);

  // if (country.borders && country.borders.length > 0) {
  // }
}

async function fetchCountryDetails() {
  const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
  const result = await fetch(url);
  const data = await result.json().then((res) => {
    return res;
  });
  createElements(data);
}

fetchCountryDetails();
