function refreshWeather(response) {
  let tempElement = document.querySelector(".temp-value");
  let temperature = response.data.temperature.current;
  let city = document.querySelector(".city");
  city.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "30417c04bdtca9bb49d2o565a2bfd928";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");

  searchCity(searchInput.value);
}

let searchCityForm = document.querySelector(".search-form");
searchCityForm.addEventListener("submit", handleSearchForm);

searchCity("Cape Town");
