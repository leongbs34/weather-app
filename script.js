const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
const btnCelsius = document.querySelector('.celsius');
const btnFahrenheit = document.querySelector('.fahrenheit');
let fahrenheit = false;
btnCelsius.addEventListener('click', convertToCelsius);
btnFahrenheit.addEventListener('click', convertToFahrenheit);

async function fetchWeatherData(city) {
	const errorMsg = document.querySelector('.error');
	const request = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c153617cf834f19994f86b76441f26ed`
	);
	if (request.ok) {
		errorMsg.classList.add('hide');
		const data = await request.json();
		result = data;
		getData();
	} else {
		errorMsg.classList.remove('hide');
	}
}

function clearSearch() {
	document.querySelector('#search-city').value = '';
}

function getData() {
	getLocation();
	getTemp();
	getWeather().then(img => {
		const image = document.querySelector('.desc img');
		image.src = img.url;
	});
	getFeelsLike();
	getHumidity();
	getWindSpeed();
}

function getLocation() {
	const location = document.querySelector('.location');
	location.textContent = `${result.name}, ${result.sys.country}`;
}

function getTemp() {
	const temperature = document.querySelector('.temperature h1');
	temperature.textContent = convertTemp(result.main.temp);
}

async function getWeather() {
	const weather = result.weather[0].description;

	const desc = document.querySelector('.weather p');
	desc.textContent = weather;

	const imgCode = result.weather[0].icon;
	const image = await fetch(
		`https://openweathermap.org/img/wn/${imgCode}@2x.png`
	);

	return image;
}

function getFeelsLike() {
	const feelsLike = document.querySelector('#feelsLike .details-value');
	feelsLike.textContent = convertTemp(result.main.feels_like);
}

function getHumidity() {
	const humidity = document.querySelector('#humidity .details-value');
	humidity.textContent = `${result.main.humidity}%`;
}

function getWindSpeed() {
	const windSpeed = document.querySelector('#wind .details-value');

	if (fahrenheit) {
		windSpeed.textContent = `${Math.round(result.wind.speed * 2.237)} Mph`;
	} else {
		windSpeed.textContent = `${Math.round(result.wind.speed * 3.6)} km/h`;
	}
}

function convertTemp(kelvin) {
	const celsius = kelvin - 273.15;
	if (!fahrenheit) {
		return `${Math.round(celsius)}`;
	}
	return `${Math.round((celsius * 9) / 5 + 32)}`;
}

function convertToFahrenheit() {
	const root = document.querySelector(':root');

	btnFahrenheit.classList.remove('deactivated');
	btnCelsius.classList.add('deactivated');

	fahrenheit = true;
	getTemp();
	getFeelsLike();
	getWindSpeed();
	root.style.setProperty('--unit', "'°F'");
}

function convertToCelsius() {
	const root = document.querySelector(':root');

	btnCelsius.classList.remove('deactivated');
	btnFahrenheit.classList.add('deactivated');

	fahrenheit = false;
	getTemp();
	getFeelsLike();
	getWindSpeed();
	root.style.setProperty('--unit', "'°C'");
}

function handleSubmit(e) {
	const city = document.querySelector('#search-city').value;
	clearSearch();
	e.preventDefault();
	fetchWeatherData(city);
}

let result;

fetchWeatherData('Kuala Lumpur');
