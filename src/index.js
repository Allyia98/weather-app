//displaying current date and time
let now = new Date();

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currDay = day[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currMonth = months[now.getMonth()];

let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let formattedDate = `${currDay}, ${currMonth} ${date} <br /> ${hour}:${minutes}`;

let todayDate = document.querySelector("#date");
todayDate.innerHTML = formattedDate;

//Search Engine
function displayCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");

  let city = document.querySelector("#current-city");
  city.innerHTML = `${cityInput.value}`;

  let apiKey = "5dfec6742de51df1fd7da24d6310c8b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", displayCity);

//displays temperature in city and description
function currentTemp(response) {
  //initialization
  let temp = Math.round(response.data.main.temp);
  let currTemp = document.querySelector("#curr-temp");
  let descriptionElement = document.querySelector("#temp-description");
  let feelsElement = Math.round(response.data.main.feels_like);
  let tempFeels = document.querySelector("#feels-like");
  let high = Math.round(response.data.main.temp_max);
  let highTemp = document.querySelector("#high-temp");
  let low = Math.round(response.data.main.temp_min);
  let lowTemp = document.querySelector("#low-temp");
  let currCity = document.querySelector("#current-city");

  //changing HTML
  currTemp.innerHTML = `${temp}°C`;
  descriptionElement.innerHTML = response.data.weather[0].main;
  tempFeels.innerHTML = `Feels like ${feelsElement}°C`;
  highTemp.innerHTML = `High: ${high}°`;
  lowTemp.innerHTML = `Low: ${low}°`;
  currCity.innerHTML = response.data.name;
}

//current location button
function retrievePosition(position) {
  let key = "5dfec6742de51df1fd7da24d6310c8b4";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  axios.get(url).then(currentTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

// //change from celcius to farhenheit using links
// function changeTemp(event) {
//   event.preventDefault();

//   let temp = document.querySelector("#curr-temp");
//   let temperature = Math.round(12 * (9 / 5) + 32);
//   temp.innerHTML = `${temperature}°F`;
// }

// function changeTempBack(event) {
//   event.preventDefault();

//   let celciusTemp = document.querySelector("#curr-temp");
//   let temperature = 12;
//   celciusTemp.innerHTML = `${temperature}°C`;
// }

// let fahLink = document.querySelector("#fahrenheit-link");
// fahLink.addEventListener("click", changeTemp);

// let celLink = document.querySelector("#celcius-link");
// celLink.addEventListener("click", changeTempBack);
