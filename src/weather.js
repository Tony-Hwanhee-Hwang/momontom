const API_KEY = "0d398670a4e1f9407665c5395d38dae7";
const GEOLOCATION = "geolocation";
const weather = document.querySelector(".weather-area");

function handleGeoSuccess(position) {
	//console.log(position);
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	const geoObj = {
		lat,
		lon,
	};
	saveGeolocation(geoObj);
	getWeather(lat, lon);
}

function getWeather(lat, lon) {
	//console.log(lat, lon);
	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`)
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			//console.log(json);
			paintWeather(json);
		});
}

function paintWeather(weatherInfo) {
	const currentWeather = weatherInfo.current;
	const wraper = document.createElement("div");
	const location = document.createElement("span");
	const temp = document.createElement("span");
	const feels_like = document.createElement("span");
	const weather_desc = document.createElement("span");
	const weather_icon = document.createElement("img");

	location.innerText = weatherInfo.timezone;
	temp.innerText = `Current : ${currentWeather.temp}`;
	feels_like.innerText = `Feels like : ${currentWeather.feels_like}`;
	weather_desc.innerText = currentWeather.weather[0].description;
	weather_icon.src = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;

	wraper.appendChild(location);
	wraper.appendChild(temp);
	wraper.appendChild(feels_like);
	wraper.appendChild(weather_desc);
	weather.appendChild(wraper);
	weather.appendChild(weather_icon);
}

function saveGeolocation(geoObj) {
	localStorage.setItem(GEOLOCATION, JSON.stringify(geoObj));
}

function loadGeolocation() {
	return localStorage.getItem(GEOLOCATION);
}

function handleGeoError() {
	console.log("Cannot get a geolocation information!");
}

function getGeoLocation() {
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function init() {
	const geoInfo = loadGeolocation();
	if (geoInfo === null) {
		getGeoLocation();
	} else {
		const parsedGeoInfo = JSON.parse(geoInfo);
		getWeather(parsedGeoInfo.lat, parsedGeoInfo.lon);
	}
}

init();
