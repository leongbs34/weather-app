const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
const btnConvert = document.querySelector('button');
let fahrenheit = false;
/* btnConvert.addEventListener('click', convertUnit); */

async function fetchWeatherData(city){


        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c153617cf834f19994f86b76441f26ed`);
        if(request.ok){
            const data = await request.json();
            result = data;
            getLocation();
            getWeather().then((img) => {
                const image = document.querySelector('.desc img');
                image.src = img.url;
            });
        } else {
            console.log('error');
        }
}

function clearSearch(){
    document.querySelector('#search-city').value = '';
}

async function getWeather(){
    const weatherList = {
        'clear sky' : '01d',
        'few clouds' : '02d',
        'scattered clouds' : '03d',
        'broken clouds' : '04d',
        'shower rain' : '09d',
        'rain' : '10d',
        'thunderstorm' : '11d',
        'snow' : '13d',
        'mist' : '50d'
    }
    const weather = result.weather[0].description;

    const desc = document.querySelector('.desc h2');
    desc.textContent = weather;
    const imgCode = weatherList[weather];
    const image = await fetch(`http://openweathermap.org/img/wn/${imgCode}@2x.png`);

    return image;
}

function getLocation(){
    const location = document.querySelector('.location');
    location.textContent = `${result.name}, ${result.sys.country}`;
}

function getTemp(){
    return convertTemp(result.main.temp);
}

function getFeelsLike(){
    return convertTemp(result.main.feels_like);
}

function getHumidity(){
    return `${result.main.humidity}%`;
}

function convertTemp(kelvin){
    const celsius = (kelvin - 273.15);
    if(!fahrenheit){ 
        return `${Math.round(celsius)} °C`;
    }
    return `${Math.round(celsius * 9/5 + 32)} °F`;
}

function convertUnit(){
    fahrenheit = !fahrenheit;
}

function handleSubmit(e){
    const city = document.querySelector('#search-city').value;
    clearSearch();
    e.preventDefault();
    fetchWeatherData(city);
}

let result;

fetchWeatherData('Kuala Lumpur');