var cityInputEl = document.querySelector("#city-name");
var searchInputEl = document.querySelector("#search");
var currentCityEl = document.querySelector("#current-city");
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentWeatherImg = document.querySelector("#current-weather-img");
var fiveDayEl = document.querySelector("#five-day");
const pastCity = document.querySelector("#past-city");
var cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];



const getCurrentWeather = async() => {

    
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputEl.value.trim()}&units=imperial&appid=beff4d2d3a48b96528fcd84d9d9be94a`;
    const res = await fetch(apiUrl);
    let data = await res.json();
    let milli = data.dt * 1000;
    let date = new Date(milli);
    let dateFormat = date.toLocaleString("en-US", {month: "short", day: "numeric", year: "numeric"});
    currentCityEl.textContent = data.name + "" + dateFormat;
    currentTempEl.textContent = "Temp: " + data.main.temp + "°F";
    currentWindEl.textContent = "Wind: " + data.wind.speed + "mph";
    currentHumidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    currentWeatherImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    var inputVal = document.getElementById("city-name").value;
    searchInputEl.textContent = inputVal;

    if (cityArray.indexOf(inputVal) === 0) {
    cityArray.push(inputVal);
}

    localStorage.setItem("cityArray", JSON.stringify(cityArray));

    var loadCity = localStorage.getItem("cityArray");
    pastCity.innerHTML = loadCity;
    };

    var getWeatherData = function (lat, lon) {
        var apiUrl =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=minutely,hourly&units=imperial&appid=" +
          apiKey +
          " ";
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            showData(data);
            console.log(data);
          });
      };
      
     
    


var getWeather = async (event) => {
    event.preventDefault();
    getCurrentWeather();
    
};

searchInputEl.addEventListener('submit', getWeather);