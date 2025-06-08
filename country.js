const detailsContainer = document.querySelector(".country-details-container");
const params = new URLSearchParams(location.search);
const country = params.get("name");

function createElements(data) {
  const card = document.createElement("div");
  card.className = "outer-div";

  card.innerHTML = `
        <div class="flag-img">
            <img src="https://flagcdn.com/af.svg" alt="" />
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
                  <p>Currencies: ${data[0].currencies}</</p>
                  <p>Languages: ${data[0].languages}</p>
                </div>
              </div>
              <div class="neighbour-details">
                <span>Border Countries:</span>
                <p>Country one</p>
                <p>Country one</p>
                <p>Country one</p>
              </div>
            </div>
          </div>
        `;
  detailsContainer.appendChild(card);
}

async function fetchCountryDetails() {
  const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
  const result = await fetch(url);
  const data = await result.json().then((res) => {
    return res;
  });
  console.log(data);
  createElements(data);
}

fetchCountryDetails();
