const locInput = document.getElementById("loc-input");

function getWeatherIcon(icon) {
	const map = {
		snow: "❄️",
		rain: "🌧️",
		fog: "🌫️",
		wind: "💨",
		cloudy: "☁️",
		"partly-cloudy-day": "⛅",
		"partly-cloudy-night": "🌙☁️",
		"clear-day": "☀️",
		"clear-night": "🌙",
	};

	return map[icon] || "🌍"; // fallback
}

async function getWeather(loc) {
	const output = {
		cityName: document.querySelector("#today-weather #city-name"),
        todayIcon: document.querySelector("#today-weather #today-weather-icon"),
		temp: document.querySelector("#today-weather #temp"),
		weatherDesc: document.querySelector("#today-weather #weather-desc"),
		feelsLike: document.querySelector("#today-weather #feels-like"),
		wind: document.querySelector("#today-weather #wind"),
		humidity: document.querySelector("#today-weather #humid"),
		visibility: document.querySelector("#today-weather #visibility"),
		uvIndex: document.querySelector("#today-weather #uv-index"),
		sunrise: document.querySelector("#today-weather #sunrise"),
		sunset: document.querySelector("#today-weather #sunset"),
		forecasts: document.getElementById("forecasts"),
	};

	try {
		const response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?key=43YBCV8UVGMALTYWFPWJXTH9F&unitGroup=metric`
		);

		if (!response.ok) {
			throw new Error();
		}
		const weatherData = await response.json();
		const currentWeather = weatherData.currentConditions;

		output.cityName.innerText = weatherData.address.toUpperCase();
        output.todayIcon.innerText = getWeatherIcon(currentWeather.icon);
		output.temp.innerText = `${currentWeather.temp} °C`;
		output.weatherDesc.innerText = currentWeather.conditions;
		output.feelsLike.innerText = `feels like ${currentWeather.feelslike} °C`;
		output.wind.innerText = `${currentWeather.windspeed} km/h`;
		output.humidity.innerText = `${currentWeather.humidity}%`;
		output.visibility.innerText = `${currentWeather.visibility}km`;
		output.uvIndex.innerText = `${currentWeather.uvindex}`;
		output.sunrise.innerText = `${currentWeather.sunrise}`;
		output.sunset.innerText = `${currentWeather.sunset}`;

		output.forecasts.innerHTML = "";
		for (let i = 1; i <= 7; i++) {
			const newCard = document.createElement("div");
			newCard.classList.add("forecast-card");

			const date = new Date(weatherData.days[i].datetimeEpoch * 1000);

			newCard.innerHTML = `<p class="forecast-label">${date.getDate()}</p>
            <p class="forecast-icon">${getWeatherIcon(weatherData.days[i].icon)}</p>
            <p class="forecast-data">${weatherData.days[i].temp} °C</p>`;

			output.forecasts.append(newCard);
		}
	} catch (err) {
		console.error(err);
	}
}

function displayWeather() {
	const loc = locInput.value.toLowerCase();
	getWeather(loc);
	locInput.value = "";
}

locInput.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();

		displayWeather();
	}
});
