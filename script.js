const locInput = document.getElementById("loc-input");

async function getWeather(loc) {
    const output = {
        cityName: document.querySelector("#today-weather #city-name"),
        temp: document.querySelector("#today-weather #temp"),
        weatherDesc: document.querySelector("#today-weather #weather-desc"),
    }
    
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?key=43YBCV8UVGMALTYWFPWJXTH9F&unitGroup=metric`);

        if (!response.ok) {
            throw new Error();
        }
        const weatherData = await response.json();
        const currentWeather = weatherData.currentConditions;

        output.cityName.innerText = weatherData.address.toUpperCase();
        output.temp.innerText = `${currentWeather.temp} °C`;
        output.weatherDesc.innerText = currentWeather.conditions;

        console.log(weatherData);
        console.log(currentWeather);
    } catch (err) {
        console.error(err);
    }
}

function displayWeather() {
    const loc = locInput.value.toLowerCase();
    getWeather(loc);
    locInput.value = "";
}

locInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();

    displayWeather();
  }
});