const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=13fe38d29dd8cc085ef827d782d636c5";
const API_UNITS = "&units=metric";

const getWeather = () => {
	const city = input.value || "Mrągowo";
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;

			const status = Object.assign({}, ...res.data.weather);

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + "°C";
			humidity.textContent = hum + "%";
			weather.textContent = status.main;

			warning.textContent = "";
			input.value = "";

			if (status.id >= 200 && status.id < 300) {
				photo.setAttribute("src", "./img/thunderstorm.png");
			} else if (status.id >= 300 && status.id < 500) {
				photo.setAttribute("src", "./img/drizzle.png");
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute("src", "./img/rain.png");
			} else if (status.id >= 600 && status.id < 701) {
				photo.setAttribute("src", "./img/ice.png");
			} else if (status.id >= 701 && status.id < 799) {
				photo.setAttribute("src", "./img/fog.png");
			} else if (status.id === 800) {
				photo.setAttribute("src", "./img/sun.png");
			} else if (status.id > 800 && status.id < 900) {
				photo.setAttribute("src", "./img/cloud.png");
			} else {
				photo.setAttribute("src", "./img/unknown.png");
			}
		})
		.catch(() => (warning.textContent = "Wpisz poprawną nazwę miasta!"));
};

const enterSearch = (e) => {
	if (e.key === "Enter") {
		getWeather();
	}
};

input.addEventListener("keyup", enterSearch);
button.addEventListener("click", getWeather);
