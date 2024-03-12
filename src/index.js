function refreshWeather(response) {
  let tempElement = document.querySelector(".temp-value");
  let city = document.querySelector(".city");
  let description = document.querySelector(".conditions");
  let humidity = document.querySelector(".humidity");
  let windSpeed = document.querySelector(".wind-speed");

  let date = new Date(response.data.time * 1000);
  let temperature = response.data.temperature.current;

  tempElement.innerHTML = Math.round(temperature);
  city.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
}

function formatDate(date) {}

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
