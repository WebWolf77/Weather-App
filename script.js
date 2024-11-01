
//Api Key for accessing OpenWeatherApp
const apiKey = "fd27c379838760343226e3624146bf2b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//Dom elements for search input, button, and weather icon
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    //check if the city is not found
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();

document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

//Set weather icon based on the main weather description
if(data.weather[0].main == "Clouds"){
    weatherIcon.src = "images/clouds.png";
}
else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "images/clear.png";
}
else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "images/rain.png";
}
else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "images/drizzle.png";
}
else if (data.weather[0].main == "Mist"){
    weatherIcon.src = "images/mist.png";
}

document.querySelector(".weather").style.display = "block";
document.querySelector(".error").style.display = "none";
    }

}

//Added Click and Enter for user actions
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});


checkWeather();