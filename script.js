let searchbar = document.querySelector(".searchbar-input")
let gridWeather = document.querySelector(".grid-weather")
async function fetchData(type){

    let APIkey = '73ca880f94b5f59ea0326ae3995abf02';
    let city = searchbar.value;
    let url = "";
    switch(type) {
        case "current":
            url= "https://api.openweathermap.org/data/2.5/weather?id=" + city + "&units=metric&appid=" + APIkey;
            break;
        
        case "hourly":
            url="https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + APIkey;
            break
                default:
            return;

    }

    try{
        const res= await fetch(url)
        const data= await res.json()
        displayWeather(data)
    } catch(error) {
        console.error("Error occurred while fetching weather:", error);
      }
}


function displayWeather(data) {
    let city = searchbar.value;
    gridWeather.innerHTML = "";
  
    const weatherByDate = {};
  
    // Group weather data by date
    data.list.forEach((interval) => {
      const date = new Date(interval.dt_txt);
      const day = date.toLocaleDateString('en-US', { day: 'numeric' });
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      const dateString = `${day} ${month} ${year}`;
  
      if (!weatherByDate[dateString]) {
        weatherByDate[dateString] = {
          temperatures: [interval.main.temp],
          description: interval.weather[0].description,
          icon: interval.weather[0].icon,
        };
      } else {
        weatherByDate[dateString].temperatures.push(interval.main.temp);
      }
    });
  
    // Generate HTML content
    for (const [dateString, weatherData] of Object.entries(weatherByDate)) {
      const date = new Date(dateString);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const maxTemp = Math.max(...weatherData.temperatures);
      const minTemp = Math.min(...weatherData.temperatures);

      gridWeather.innerHTML += `
        <div class="next-days">
          <span class="next-day">${day}</span>
          <img src="https://openweathermap.org/img/wn/${weatherData.icon}.png" class="next-icon-temp"></img>
          <div class="next-description">
            <span class="next-temp">${Math.round(maxTemp)}°C</span>
            <small>${Math.round(minTemp)}°C</small>
            <span class="next-desc">${weatherData.description}</span>
          </div>
        </div>
      `;
    }
  }



searchbar.addEventListener("keypress", (e) => {
    if ((e.key === "Enter") & (searchbar.value != "")) {
      fetchData("hourly");
    }
  });