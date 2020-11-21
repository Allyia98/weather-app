//calculate the date
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
  return `${day}, ${formatHours(timestamp)}`;
}

//receives timestamp and return hours for the corcast
function formatHours(timestamp){
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${hours}:${minutes}`;

}

//calls the API
function search(city){
  let apiKey = "5dfec6742de51df1fd7da24d6310c8b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);

  //API url for 3hr forecast
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl). then(displayForecast);
}

//Search Engine
 function displayCity(event) {
   event.preventDefault();

   let cityInputElement = document.querySelector("#city-input");
   search(cityInputElement.value);
 }

let form = document.querySelector("#search-form");
form.addEventListener("submit", displayCity);

//displays temperature in city and description
function currentTemp(response) {
  //initialization
  celsiusTemperature = response.data.main.temp;
  let temp = Math.round(celsiusTemperature);
  let currTemp = document.querySelector("#curr-temp");
  let descriptionElement = document.querySelector("#temp-description");
  let feelsElement = Math.round(response.data.main.feels_like);
  let tempFeels = document.querySelector("#feels-like");
  let high = Math.round(response.data.main.temp_max);
  let highTemp = document.querySelector("#high-temp");
  let low = Math.round(response.data.main.temp_min);
  let lowTemp = document.querySelector("#low-temp");
  let currCity = document.querySelector("#current-city");
  let humidity = document.querySelector("#humidity");
  let speed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  

  //changing HTML
  currTemp.innerHTML = `${temp}°C`;
  descriptionElement.innerHTML = response.data.weather[0].main;
  tempFeels.innerHTML = `Feels like ${feelsElement}°C`;
  highTemp.innerHTML = `High: ${high}°`;
  lowTemp.innerHTML = `Low: ${low}°`;
  currCity.innerHTML = response.data.name;
  humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  wind.innerHTML = `Wind: ${speed}km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//forecast 
function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for(let index=0; index< 5; index++){  
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col">
        ${formatHours(forecast.dt * 1000)} <br/>
        <img 
        src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
        class = "rounded-circle">
        <div class="weather-forecast">
        </i>
        ${Math.round(forecast.main.temp)}° 
        <br />
        <small> 
        Feels ${Math.round(forecast.main.feels_like)}°
        </small>
        </div>
      </div>`;
    }

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

 let button = document.querySelector("#curr-location");
 button.addEventListener("click", getCurrentPosition);

// change from celcius to farhenheit using links
 function changeTemp(event) {
    event.preventDefault();
    
    let fahrenheitTemperature = Math.round(celsiusTemperature * (9 / 5) + 32);
    let temp = document.querySelector("#curr-temp"); 
    temp.innerHTML = `${fahrenheitTemperature}°F`;
  }

  
  function changeTempBack(event) {
    event.preventDefault();

    let celciusTemp = document.querySelector("#curr-temp");
    celciusTemp.innerHTML = Math.round(celsiusTemperature)+"°C";
  }

  let celsiusTemperature = null;

  let fahLink = document.querySelector("#fahrenheit-link");
  fahLink.addEventListener("click", changeTemp);

  let celLink = document.querySelector("#celcius-link");
  celLink.addEventListener("click", changeTempBack);

//default
search("Toronto");