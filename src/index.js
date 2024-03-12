function handleSearchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let city = document.querySelector(".city");
  city.innerHTML = searchInput.value;
}

let searchCity = document.querySelector(".search-form");
searchCity.addEventListener("submit", handleSearchForm);
