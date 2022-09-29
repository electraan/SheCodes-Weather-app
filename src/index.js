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

function showForecast() {
  let forecastElement = document.querySelector("#weatherForecast");
  let forecastHTML = "";
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  weekDays.forEach(function (day, index) {
    if (index < 4) {
      forecastHTML += `<span class="forecast-day" id="forecast-day">
        ${day}</span> <span class="forecast-tempHigh">C&#176</span><br>
        <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="" width="25"/>
        <span class="forecast-tempLow"> C&#176</span><hr>`;
    } else {
      forecastHTML += `<span class="forecast-day" id="forecast-day">
        ${day}</span> <span class="forecast-tempHigh">C&#176</span><br>
        <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="" width="25"/>
        <span class="forecast-tempLow"> C&#176</span>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}
showForecast();
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name");
  let formValue = document.querySelector("#form-value");
  city.innerHTML = formValue.value;
}
formCity = document.querySelector("#form-name");
formCity.addEventListener("submit", searchCity);

let firstCelcius = null;

function getMetric(response) {
  let city = response.data.name;
  let tempElement = document.querySelector("#city-name");
  tempElement.innerHTML = `${city}`;
  firstCelcius = response.data.main.temp;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(firstCelcius);
  let highTemp = document.querySelector("#highTemp");
  highTemp.innerHTML = `Highest temp ${Math.round(
    response.data.main.temp_max
  )} C&#176`;
  let lowTemp = document.querySelector("#lowTemp");
  lowTemp.innerHTML = `Lowest temp ${Math.round(
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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
myLocation();

function getCityTemp(response) {
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;
  let tempElement = document.querySelector("#temperature");
  firstCelcius = response.data.main.temp;
  tempElement.innerHTML = Math.round(firstCelcius);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let highTemp = document.querySelector("#highTemp");
  highTemp.innerHTML = `Highest temp ${Math.round(
    response.data.main.temp_max
  )} C&#176`;
  let lowTemp = document.querySelector("#lowTemp");
  lowTemp.innerHTML = `Lowest temp ${Math.round(
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

function searchingCity(event) {
  event.preventDefault();
  let key = "454b3c15e44c7f345644cf4c8c057675";
  let city = document.querySelector("#form-value").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=eng`;

  axios.get(`${apiUrl}&appid=${key}`).then(getCityTemp);
}

formCity = document.querySelector("#form-name");
formCity.addEventListener("submit", searchingCity);

function convertTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((firstCelcius * 9) / 5 + 32);
}

let fahrengheit = document.querySelector("#fahrengheit");
fahrengheit.addEventListener("click", convertTemperature);

function convertTempBack(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(firstCelcius);
}

let celcium = document.querySelector("#celcium");
celcium.addEventListener("click", convertTempBack);
