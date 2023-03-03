// API URL https://api.openweathermap.org/data/2.5/weather?q=Oradea&units=metric&appid=73ca880f94b5f59ea0326ae3995abf02 //
// API KEY 73ca880f94b5f59ea0326ae3995abf02 //


let city = document.querySelector('.cityname')
let description = document.querySelector('.description')
let temperature = document.querySelector('.degrees')
let wind = document.querySelector('.wind')
let humidity = document.querySelector('.humidity')
let apiKey =  '73ca880f94b5f59ea0326ae3995abf02'
let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city.textContent + "&units=metric&appid=" + apiKey;
let button = document.getElementById('button')

async function myFunction(weatherUrl){
    const response = await fetch(weatherUrl);
    const data = await response.json();
        const temp = data.main;
        const showTemp = temp.temp;
        console.log(showTemp)
        temperature.append(showTemp)
        console.log(temperature)
}

