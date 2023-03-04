// API URL https://api.openweathermap.org/data/2.5/weather?q=Oradea&units=metric&appid=73ca880f94b5f59ea0326ae3995abf02 //
// API KEY 73ca880f94b5f59ea0326ae3995abf02 //
document.cookie = "witcher=Geralt; SameSite=None; Secure"


let weather = {
    apiKey: '73ca880f94b5f59ea0326ae3995abf02',
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            +"&units=metric&appid=" 
            + this.apiKey   
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    }, 

    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, humidity,temp,speed)
        document.querySelector('.cityname').innerText = 'Weather in ' + name;
        document.querySelector('.icon').src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.degrees').innerText = Math.round(temp) + ' C°'
        document.querySelector('.wind').innerText = 'wind speed: ' + Math.round(speed) + ' km/h';
        document.querySelector('.humidity').innerText = 'humidity: ' + humidity + '%';
    },
    search: function () {
        this.fetchWeather(document.querySelector("#searchinput").value);
        document.querySelector("#searchinput").value = ''
        document.cookie = "witcher=Geralt; SameSite=None; Secure"      
      },
                                                               
}

document.querySelector("#button").addEventListener("click", function () {
    weather.search();
  });

document.querySelector("#searchinput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      weather.search();
    }
  });

