const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
const btnConvert = document.querySelector('button');
/* btnConvert.addEventListener('click', convertUnit); */

async function fetchWeatherData(city){

    try {
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c153617cf834f19994f86b76441f26ed`);
        const forecast = await request.json();

        return forecast;
    } catch(err) {
        console.log(err);
    }
    
}

function processData(){
    let city = document.querySelector('#location').value;
    document.querySelector('#location').value = '';
    fetchWeatherData(city).then((res) => {
        result = res;
    })
}

function getWeather(){
    return result.weather[0].description;
}

function getLocation(){
    return `${result.name}, ${result.sys.country}`
}

let fahrenheit = false;

function getTemp(){
    return convertTemp(result.main.temp);
}

function getFeelsLike(){
    return convertTemp(result.main.feels_like);
}

function convertTemp(kelvin){
    const celsius = (kelvin - 273.15);
    if(!fahrenheit){ 
        return `${Math.round(celsius)} °C`;
    }
    return `${Math.round(celsius * 9/5 + 32)} °F`;
}

function getHumidity(){
    return `${result.main.humidity}%`;
}

function convertUnit(){
    fahrenheit = !fahrenheit;
}

function handleSubmit(e){
    e.preventDefault();
    processData()
}

let result;

