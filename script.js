let searchbar = document.querySelector(".searchbar-input")

async function fetchData(type){
    const res = await fetch("https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=Vbv06QeVWbLeP50Ow3KMC8ca2NdrWtSX")
    const data = await res.json();
    console.log(data)

    let url = ""
    switch(type) {
        case "daily":
            url= "https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature,windSpeed,precipitationProbability&timesteps=1d&units=metric&apikey=Vbv06QeVWbLeP50Ow3KMC8ca2NdrWtSX"
            break;
        
        case "hourly":
            url="https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature,windSpeed,precipitationProbability&timesteps=1h&units=metric&apikey=Vbv06QeVWbLeP50Ow3KMC8ca2NdrWtSX"
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


function displayWeather(data){
    let test = data.data.timelines[0].intervals[0].values.temperature;
    console.log(test)
}

searchbar.addEventListener("keypress", (e) => {
    if ((e.key === "Enter") & (searchbar.value != "")) {
      fetchData("daily");
    }
  });