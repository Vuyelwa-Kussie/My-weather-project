function refreshWeather(response) {
  let tempElement = document.querySelector(".temp-value");
  let city = document.querySelector(".city");
  let description = document.querySelector(".conditions");
  let humidity = document.querySelector(".humidity");
  let windSpeed = document.querySelector(".wind-speed");
  let dateTime = document.querySelector(".date-time");
  let icon = document.querySelector(".temp-icon");

  let date = new Date(response.data.time * 1000);
  let temperature = response.data.temperature.current;

  tempElement.innerHTML = Math.round(temperature);
  city.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  dateTime.innerHTML = formatDate(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let currentDate = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let month = months[date.getMonth()];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${month} ${currentDate} <br / > ${hours}:${minutes}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "30417c04bdtca9bb49d2o565a2bfd928";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector(".weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchCityForm = document.querySelector(".search-form");
searchCityForm.addEventListener("submit", handleSearchForm);

searchCity("Cape Town");
