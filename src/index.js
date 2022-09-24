let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let nowTime = new Date();
let day1 = week[nowTime.getDay()];
dayNow = document.querySelector("#day");
dayNow.innerHTML = `${day1}`;

let hours = nowTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minut = nowTime.getMinutes();
if (minut < 10) {
  minut = `0${minut}`;
}
timeNow = document.querySelector("#time");
timeNow.innerHTML = `${hours}:${minut}`;

let fulldate = nowTime.getDate();
let month1 = nowTime.getMonth() + 1;
let year = nowTime.getFullYear();
date = document.querySelector("#date");
date.innerHTML = `${fulldate}/${month1}/${year}`;

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name");
  let formValue = document.querySelector("#form-value");
  city.innerHTML = formValue.value;
}

formCity = document.querySelector("#form-name");
formCity.addEventListener("submit", searchCity);

function convertTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrengheit = document.querySelector("#fahrengheit");
fahrengheit.addEventListener("click", convertTemperature);

function convertTempBack(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature - 32) / 1, 8);
}

let celcium = document.querySelector("#celcium");
celcium.addEventListener("click", convertTempBack);

function getMetric(response) {
  let city = response.data.name;
  let tempElement = document.querySelector("#city-name");
  tempElement.innerHTML = `${city}`;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let highTemp = document.querySelector("#highTemp");
  highTemp.innerHTML = `Highest temperature ${Math.round(
    response.data.main.temp_max
  )} C&#176`;
  let lowTemp = document.querySelector("#lowTemp");
  lowTemp.innerHTML = `Lowest temperature ${Math.round(
    response.data.main.temp_min
  )} C&#176`;
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )} C&#176`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let description = document.querySelector("#description");
  description.innerHTML = `It's ${response.data.weather[0].description} today`;
}

function handlePosition(position) {
  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;
  let key = "454b3c15e44c7f345644cf4c8c057675";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&appid=${key}&units=metric&lang=eng`;
  axios.get(apiUrl).then(getMetric);
}
function myLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", myLocation);

function searchingCity(event) {
  event.preventDefault();
  let key = "454b3c15e44c7f345644cf4c8c057675";
  let city = document.querySelector("#form-value").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=eng`;

  axios.get(`${apiUrl}&appid=${key}`).then(getCityTemp);
}

formCity = document.querySelector("#form-name");
formCity.addEventListener("submit", searchingCity);

function getCityTemp(response) {
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}`;
  let highTemp = document.querySelector("#highTemp");
  highTemp.innerHTML = `Highest temperature ${Math.round(
    response.data.main.temp_max
  )} C&#176`;
  let lowTemp = document.querySelector("#lowTemp");
  lowTemp.innerHTML = `Lowest temperature ${Math.round(
    response.data.main.temp_min
  )} C&#176`;
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )} C&#176`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let description = document.querySelector("#description");
  description.innerHTML = `It's ${response.data.weather[0].description} today`;
}
